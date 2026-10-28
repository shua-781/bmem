# 免责声明与隐私说明 · Disclaimer & Privacy

> 这份文件说的是"你能不能信它、你的数据在哪、出事谁负责"。
> 装之前请读完，两分钟。

---

## 一、数据在你自己机器上（这是最重要的一条）

**这套代码不联网、不上传、不收集任何东西。**

```
运行时的全部动作：
  读你本地的文件（MEMORY_DIR，默认 ~/.bmem/）
  在本地算分、拼字符串
  返回一段文本给你的宿主程序

没有的：
  ✗ 网络请求（代码里没有任何 http/https 调用）
  ✗ 遥测 / 统计 / 崩溃上报
  ✗ 账号 / 授权 / 注册
  ✗ 把数据发给作者或任何第三方
```

**你可以自己验**：在 `src/` 里搜 `fetch(`、`http`、`net`、`socket`，搜不到出网的代码。
（`src/cli.mjs` 只有 `node:fs` / `node:os` / `node:path`。）

**唯一的例外**：如果你自己接了大模型去做"判断是不是同一件事"（可选，见 QUICKSTART 第 5 步），
那部分是**你的** API 调用，走你的 key，跟这个库无关。

---

## 二、它会存下你的隐私，所以请自己上锁

这个库的用途就是"记住你聊过的事"，所以**它一定会存下隐私内容**：地址、订单、健康、关系、习惯。

由此产生三个由你自己负责的事：

```
① 目录权限：默认 700（只有你的账号能读）。换机器/换用户请自己确认。
② 备份：账本 events.jsonl 是唯一真相，它丢了就真丢了。请自己备份。
③ 加密：本库**不做加密**。如果你的磁盘不安全（共享电脑、会被翻），
   请自己用系统级方案（BitLocker / LUKS / 加密卷）保护 ~/.bmem/。
```

**本库只做一件事**：在注入上下文之前，把"核心凭据"打码——
身份证号、密码、密钥、银行卡号这类会被过滤掉，不进入发给模型的文本。

**但这不是全面的隐私保护**：手机号、地址、订单号、姓名**是故意保留可读的**——
因为删掉它们，AI 就答不出"那份快递到哪了"。

> **打码的范围由你自己的判断决定，不要指望这一层替你做合规。**

---

## 三、它不保证说对

这很重要，请当真。

```
· 块是碎片，答案是拼出来的 → 它会拼错
· 词表不够时它抽不到特征 → 它会说"不记得"（这是正常行为，不是 bug）
· 分不清的它会问你 → 这不是故障，是设计
· 它的判断依赖模型 → 同样的输入，不同模型可能给出不同的块划分
```

**所以：不要把它的输出当成事实。** 它是个"记得住细节的帮手"，不是数据库，不是账本。

尤其**不要**把它用在：

```
✗ 记账、报税、合同 —— 任何要求 100% 精确的场合
✗ 医疗、法律、财务决策 —— 它不做建议，也给不出建议
✗ 唯一副本 —— 重要的事请在人能读的地方也留一份
```

---

## 四、责任

```
本软件按 MIT 协议"按原样"提供（AS IS），不附带任何明示或暗示的保证，
包括但不限于对适销性、特定用途适用性、以及不侵权的保证。

在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，
无论是在合同诉讼、侵权行为还是其他方面，由本软件或本软件的使用
或其他交易引起的、与之相关的或与之有关的。
```

—— 上面这段是 MIT 协议的原文意思，正式条款以 [`LICENSE`](./LICENSE) 为准。
说人话：**你自己判断要不要用，用出问题自己承担，作者不赔。**

---

## 五、这个仓库里没有别人的数据

本仓库（GitHub 上的 `bmem`）只含**代码和文档**。

```
✗ 不含任何人的聊天记录
✗ 不含任何人的记忆库
✗ 不含任何人的路径、账号、服务器信息
```

代码里出现的 `用户` / `奶茶` / `沪上阿姨` 这类字样，都是自检脚本里的**虚构示例数据**，
用来验证"同名同款能不能被正确区分"。

---

## 六、第三方依赖

```
零运行时依赖。只用 Node.js 标准库。
```

这是故意的：**没有依赖 = 没有供应链风险**。
你不需要担心某个间接依赖某天被投毒，也不需要 `npm audit` 一堆高危告警。

---

## 七、如果你发现安全问题

这个库的面上很小（本地文件 + 纯计算），但如果你发现：

```
· 注入文本里漏出了不该漏的东西（比如身份证原文）
· 有我没注意到的出网代码
· 数据被写到意料之外的位置
```

请开一个 issue 说明现象，**不要贴真实数据**（复现用编的就行）。

---

*一句话总结：**数据全在你机器上，我们什么都收不到；它记得住但会拼错；用不用、怎么用、出了事谁负责，都是你。***

---

# Disclaimer & Privacy (English)

**Your data stays on your machine.** This library makes no network calls, collects no telemetry,
and requires no account. You can verify by searching `src/` for `fetch(`, `http`, `net`, `socket` —
there are none. Runtime dependencies: zero (Node.js standard library only).

**It will store private content.** That is its purpose. You are responsible for directory permissions,
backups (the append-only `events.jsonl` is the single source of truth), and encryption —
this library does **not** encrypt. It only redacts core credentials (ID numbers, passwords, keys,
card numbers) before text reaches a model. Phone numbers, addresses and order numbers are
**intentionally left readable**, otherwise the assistant could not answer "where is my parcel".

**It can be wrong.** Blocks are fragments; answers are assembled. It will sometimes assemble them
incorrectly, and it will sometimes say "I don't remember" because the vocabulary is thin.
Do not treat its output as fact. Do not use it for accounting, legal, medical or financial decisions,
and do not make it your only copy of anything important.

**No warranty.** Provided "AS IS" under the MIT License, without warranty of any kind.
The authors are not liable for any claim, damages or other liability arising from the software.
See [`LICENSE`](./LICENSE) for the binding terms.

**This repository contains no one's data** — only code and documentation. Sample strings in the
self-test are fictional data used to verify disambiguation.
