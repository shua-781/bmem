#!/usr/bin/env node
// bmem CLI —— 没有宿主适配器时，靠这个也能用起来
//
//   node cli.mjs remember "用户说他讨厌香菜" [--about 用户]
//   node cli.mjs search "香菜" [--json]
//   node cli.mjs stats
//   node cli.mjs rebuild
//   node cli.mjs export-md [路径]        生成 MEMORY.md（给纯文件方案）
//   node cli.mjs init                    建目录 + 灌词表 + 空库自检
//
// 数据目录：环境变量 MEMORY_DIR，默认 ~/.bmem

import { mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

process.env.MEMORY_DIR = process.env.MEMORY_DIR || join(homedir(), '.bmem')

const store = await import('./store.js')
const write = await import('./write.js')
const read = await import('./read.js')

const argv = process.argv.slice(2)
const cmd = argv[0] || 'help'
const rest = argv.slice(1)
const flag = (name) => {
  const i = rest.indexOf('--' + name)
  return i >= 0 ? rest[i + 1] : undefined
}
const positional = rest.filter((x, i) => !x.startsWith('--') && rest[i - 1] !== '--about')

function help() {
  console.log(`bmem —— 给 AI 用的长期记忆（块库）

  remember <文本> [--about 名字]   记一件事（建块）
  search <查询> [--json]           检索：看它会捞到什么、出口是哪种
  stats                            块数 / 词表 / 索引 / 事件数
  rebuild                          重建 8 张索引（库坏了先跑这个）
  export-md [路径]                 导出 MEMORY.md（纯文件方案用）
  init                             建目录 + 初始化词表
  help                             这一页

  数据目录：${process.env.MEMORY_DIR}
`)
}

function stats() {
  const db = store.loadBlocks()
  const blocks = Object.values(db.blocks || {})
  const meta = store.loadMeta()
  const gates = {}
  let verSum = 0
  for (const b of blocks) {
    gates[b.gate_main || '?'] = (gates[b.gate_main || '?'] || 0) + 1
    verSum += b.ver || 1
  }
  return {
    块数: blocks.length,
    平均版本: blocks.length ? +(verSum / blocks.length).toFixed(2) : 0,
    分类分布: gates,
    词表: (meta.vocab || []).length,
    事件: store.readEvents().length,
    数据目录: process.env.MEMORY_DIR,
  }
}

if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
  help()
  process.exit(0)
}

if (cmd === 'init') {
  mkdirSync(process.env.MEMORY_DIR, { recursive: true })
  store.rebuildIndexes(store.loadBlocks())
  console.log('✓ 数据目录就绪：' + process.env.MEMORY_DIR)
  console.log(JSON.stringify(stats(), null, 2))
  process.exit(0)
}

if (cmd === 'remember') {
  const text = positional.join(' ').trim()
  if (!text) { console.error('用法：remember <文本> [--about 名字]'); process.exit(2) }
  const r = write.addBlock({
    content: text,
    aboutName: flag('about') || '',
    source: 'cli',
    topic: flag('topic') || '',
  })
  console.log(r.ok ? `✓ ${r.coord}  ${r.kind}` : `· 跳过：${r.why}`)
  process.exit(r.ok ? 0 : 0)
}

if (cmd === 'search') {
  const q = positional.join(' ').trim()
  if (!q) { console.error('用法：search <查询>'); process.exit(2) }
  const r = read.retrieve(q, { budget: 2600, kmax: 16 })
  if (rest.includes('--json')) {
    console.log(JSON.stringify({ state: r.state, debug: r.debug, hits: r.picked.slice(0, 8) }, null, 2))
    process.exit(0)
  }
  console.log(`查询：${q}`)
  console.log(`出口：${r.state}   特征：${JSON.stringify((r.debug || {}).qFeats || [])}`)
  console.log(`候选 ${(r.debug || {}).cand || 0} / 可用 ${(r.debug || {}).usable || 0}   缺槽：${(r.missing || []).join('、') || '无'}`)
  if (!r.picked.length) { console.log('（没有捞到任何块）'); process.exit(0) }
  for (const p of r.picked.slice(0, 8)) {
    console.log(`  ${p.coord} s=${p.s.toFixed(3)} f2=${p.f2.toFixed(2)} [${read.agoText(p.origin_at || p.created_at)}] ${String(p.content).slice(0, 70)}`)
  }
  const c = read.contextFor(q, { topN: 6 })
  if (c.text) console.log('\n注入预览：\n' + c.text)
  process.exit(0)
}

if (cmd === 'stats') {
  console.log(JSON.stringify(stats(), null, 2))
  process.exit(0)
}

if (cmd === 'rebuild') {
  const idx = store.rebuildIndexes(store.loadBlocks())
  console.log('✓ 索引已重建：' + JSON.stringify(idx))
  process.exit(0)
}

if (cmd === 'export-md') {
  const out = positional[0] || join(process.env.MEMORY_DIR, 'MEMORY.md')
  const db = store.loadBlocks()
  const all = Object.values(db.blocks || {})
  const lines = ['# 我记住的事', '', `> 由 bmem 生成 · ${new Date().toISOString()} · 共 ${all.length} 块`, '',
    '下面是按时间倒序的记忆。回答涉及具体细节（日期/金额/约定/喜好）时以这里为准；', '这里没有的，就说"我不记得"，不要编。', '']
  all.sort((a, b) => String(b.origin_at || b.created_at).localeCompare(String(a.origin_at || a.created_at)))
  for (const b of all.slice(0, 500)) {
    lines.push(`- ${String(b.content || '').replace(/\s+/g, ' ')}`)
  }
  writeFileSync(out, lines.join('\n'), 'utf8')
  console.log('✓ 已导出：' + out + `（${Math.min(all.length, 500)} 块）`)
  process.exit(0)
}

console.error('未知命令：' + cmd + '\n')
help()
process.exit(2)
