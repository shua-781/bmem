# 免责声明与责任限制

**Disclaimer, Privacy Notice & Limitation of Liability**

> 最后更新：2026-10-28 · 适用于本仓库（`beme`）的全部代码、文档与示例。
>
> **请在使用前完整阅读。你下载、安装、运行、修改或以任何方式使用本软件，即视为
> 已阅读、理解并不可撤销地接受本文件的全部条款。如果你不同意其中任何一条，
> 请立即停止使用、删除代码及全部生成的数据。**

---

## 零、先把话说明白

这是一套**实验性的个人项目**，不是产品、不是服务、不是商品。

```
· 没有公司主体，没有客服，没有 SLA，没有赔付，没有发票
· 没有"我一定维护下去"的承诺，随时可能停更、大改、甚至删除仓库
· issue 会看，但不保证回复、不保证修复、不保证时间
· 作者写它是为了解决自己的问题，"别人能用"是副产品，不是义务
```

**请你按"一个陌生人在网上放了一段能跑的代码"来对待它，而不是按"一个软件产品"。**

---

## 一、数据风险：这是最可能出事的地方

本库的**唯一用途**就是"把你说过的话存下来"，所以**它必然会存下大量数据**。
围绕数据出问题的每一种方式，作者都**不承担责任**。

### 1.1 数据丢失

可能的原因（不限于）：

```
· events.jsonl 被误删、被覆盖、被清空
· 磁盘故障、文件系统损坏、断电、强制关机
· 容器/虚拟机重建、重装系统、迁移机器时漏拷
· 你用了 rm -rf、清理工具、同步冲突、云端回收站过期
· 本库自身的 bug 导致写入失败或写坏
```

**作者不承担任何"数据丢失"的责任，也不承担由此产生的任何直接或间接损失**
（包括但不限于业务中断、声誉损失、重新收集数据的成本）。

**备份是你自己的责任。** 账本是唯一真相；它没了，记忆就真的没了。

### 1.2 数据损坏

本库用"追加写 + 原子 rename"降低损坏概率，但**不保证不发生**：

```
· 写入过程中断电 → 可能留下半行
· 并发写入（你同时开了两个进程）→ 未做进程锁，可能互相覆盖
· 手工编辑 JSON/JSONL 出错 → 结构损坏
· 磁盘位翻转、同步工具截断
```

**库损坏后能否修复、修复到什么程度，作者不做保证。**
如果你手工改过数据，作者无法、也不会为后果负责。

### 1.3 数据泄露

**这是最容易把作者拖进麻烦的一条，请特别注意。**

```
· 本库【不加密】。数据以明文 JSON / JSONL 存在磁盘上。
· 本库【不做访问控制】。任何能读那个目录的进程或用户，都能读走全部内容。
· 默认目录权限（700）只是"省事的默认值"，不是安全保证。
· 如果你的机器被入侵、被他人使用、被备份到不安全的云盘、
  或者你把目录放进了会同步的文件夹（OneDrive / iCloud / 网盘）——
  泄露的是你，责任也在你。
```

**作者不对任何形式的数据泄露、越权访问、第三方窃取承担责任。**

### 1.4 数据不一致

```
· 检索结果依赖词表、索引、打分。这些都会随版本变化而变化。
· 同一句话，今天检索出来的块可能和明天不一样（词表长了、索引重建了）。
· 重建索引、升级版本后，"记得的东西"可能变多也可能变少。
```

**作者不保证"任何时刻的检索结果都是稳定、可复现、与历史一致的"。**

### 1.5 你必须自己做的三件事

```
① 备份      —— 定期把 ~/.beme/ 拷走，至少留一份离线副本
② 上锁      —— 确认目录权限；共享电脑/笔记本请开全盘加密
③ 别当唯一副本 —— 重要的事，在人能读的地方也留一份
```

---

## 二、准确性风险：它会错，而且可能错得很像对的

**这一节请当真，不要因为 demo 表现好就放松。**

### 2.1 它会答错

```
· 块是碎片，答案是拼出来的 → 拼接过程会出错
· 它把 A 事的数字填进 B 事的句子 → 读起来通顺，但全错
· 它会把不同时间的事混成一件
· 它可能把"相似"当成"同一个"
```

**它的错误具有"高可信外观"**：语气自然、格式整齐、看不出犹豫。
这正是它最危险的地方。

### 2.2 它会把不同的事混起来

```
同一个词在不同语境下是不同的事（"苹果"可以是水果、公司、手机）。
本库用"门类"隔离来降低概率，但【不能消除】。
```

### 2.3 它可能编

设计上它应该说"我不记得"，但：

```
· 词表薄的时候，它抽不到特征 → 可能退化成"猜"
· 你接的模型本身会编 → 本库无法控制模型的行为
· 注入的片段被模型误读 → 它可能"根据记忆"编出一个不存在的事实
```

**本库只负责"捞块"，不负责"模型说的话对不对"。**

### 2.4 明令禁止的用途

**以下用途一律禁止。如果你这么用了，全部后果由你承担：**

```
✗ 记账、报税、审计、发票、合同 —— 任何要求分毫不差的场合
✗ 医疗诊断、用药、治疗方案
✗ 法律意见、诉讼材料、司法证据
✗ 金融决策、投资建议、风控判断
✗ 人事决策、信用评估、身份核验
✗ 任何"错了会造成人身伤害或重大财产损失"的场合
✗ 任何需要可追溯、可审计、可举证的场合
```

**本库不是数据库、不是账本、不是审计系统、不是合规工具。它是一个"记得住细节的帮手"。**

---

## 三、隐私与合规：数据是你在存，责任也在你

### 3.1 它会存什么

**几乎什么都存。** 只要你说过，它就可能存：

```
姓名、称呼、关系、住址、电话、订单、金额、健康、情绪、
习惯、偏好、日程、工作内容、设备信息、以及你聊天里提到的任何第三方信息
```

### 3.2 打码不是保护

本库在注入上下文**之前**，只会过滤**核心凭据类**内容：

```
会被过滤：身份证号、密码、密钥、银行卡号
不会被过滤：手机号、地址、姓名、订单号、生日、单位
```

**后者是故意保留可读的** —— 删掉它们，AI 就答不出"我的快递到哪了"。

> **这一层是"减少误发"，不是"隐私保护"。别把它当合规手段。**

### 3.3 你会存别人的数据

聊天里提到朋友、家人、同事、客户的信息，都会被存下来。
**你是否获得他们的同意、是否有权这样处理他们的个人信息，完全是你的事。**

作者不参与、不知情、不承担任何相关责任。

### 3.4 法规责任

```
· 你是否需要遵守《个人信息保护法》《数据安全法》《GDPR》《CCPA》
  或你所在司法辖区的任何法规 —— 由你自己判断、自己承担。
· 本库不提供任何合规能力：没有数据主体请求通道、没有删除权实现、
  没有留存期限管理、没有跨境传输控制、没有审计日志。
· 如果你用它处理受监管的数据（医疗、金融、政务、儿童数据），
  那是你越界，不是本库支持。
```

### 3.5 未成年人

**如果你未满 18 岁（或你所在地区的成年年龄），请在监护人陪同下使用，
并由监护人承担本文件项下的全部责任。**

本库不收集未成年人数据，但**它会忠实保存你输入的一切** —— 包括你不该输入的内容。

### 3.6 违法内容

**禁止用本库存储、处理、传播任何违反你所在地法律的内容。**

作者无法审查你的数据（数据在你机器上），**所以全部内容责任在你**。
如果执法机构找到作者，作者能提供的只有"这段代码不联网、不收集"这一事实，
以及"我不知道用户在存什么"这一事实。

---

## 四、第三方与宿主：链条上每一环都不归作者管

### 4.1 模型供应商

如果你把本库接到任何大模型（OpenAI / DeepSeek / Anthropic / 本地模型…）：

```
· 你发给模型的内容会离开你的机器 → 受该供应商的条款与隐私政策约束
· 你是否违反该供应商的使用政策（ToS）→ 你自己负责
· 模型输出的内容是否合规 → 你自己负责
· API 费用、限流、封号 → 你自己承担
```

**本库与任何模型供应商无关联、无合作、无背书。**

### 4.2 宿主软件

本库可能以插件、MCP server、CLI、定时任务等形式接入某个宿主：

```
· 宿主的许可协议、版本变更、接口废弃 → 与本库无关
· 宿主自身的 bug、数据丢失、隐私问题 → 与本库无关
· 宿主升级导致本库失效 → 作者不保证跟进修复
```

### 4.3 操作系统与硬件

```
· 文件系统行为差异（大小写、路径长度、编码、权限模型）
· 磁盘故障、断电、休眠唤醒异常
· 杀毒软件误杀、系统清理工具误删
```

**以上造成的任何后果，作者不承担责任。**

---

## 五、无保证条款

```
本软件按 MIT 协议"按原样"（AS IS）提供，不附带任何明示或暗示的保证，
包括但不限于对适销性、特定用途适用性、以及不侵权的保证。

作者不保证：
  · 本软件无错误、无中断、无缺陷
  · 本软件能满足你的特定需求
  · 本软件与你的系统/宿主/模型兼容
  · 本软件将来会继续维护或提供升级
  · 本软件的输出准确、完整、及时、可靠
```

正式法律条款以仓库根目录的 [`LICENSE`](./LICENSE) 为准。本节是对它的中文说明。

---

## 六、责任限制

### 6.1 不承担间接与后果性损失

**在任何情况下，作者或版权持有人均不对以下任何损失承担责任**（无论基于合同、
侵权、严格责任或其他法律理论，也无论是否已被告知该等损失的可能性）：

```
· 利润损失、收入损失、业务中断、商誉损失
· 数据丢失、数据损坏、数据泄露的善后成本
· 替代商品或服务的采购成本
· 第三方索赔（包括你的用户、客户、员工、监管机构对你的索赔）
· 任何间接的、附带的、特殊的、惩罚性的、后果性的损害
```

### 6.2 责任上限

**如果（尽管有上述全部条款）任何司法辖区认定作者需承担责任，
则作者对全部索赔的累计赔偿责任上限为：零（0）。**

本软件是免费提供的，作者未从你处获得任何对价。

### 6.3 你放弃索赔

**你明确放弃就本软件向作者提出任何形式的索赔、诉讼、仲裁或投诉的权利**，
但因作者故意造成人身伤害的除外（法律不允许放弃的部分，依法处理）。

---

## 七、你的承诺（反向免责）

使用本软件，你声明并保证：

```
1. 你有合法权利处理你存入本库的全部数据（包括其中的第三方个人信息）。
2. 你不会将本软件用于任何违法目的，也不会用于本文件第二节列出的禁止用途。
3. 数据合规、隐私保护、备份、加密、访问控制，全部由你自行负责并承担后果。
4. 你理解本软件是实验性项目，可能出错、可能停更、不提供技术支持与赔付。
5. 你不会因为使用结果不符合预期、数据丢失、AI 答错、或任何衍生问题，
   向作者主张任何责任。
6. 若你代表某个组织使用本软件，你保证已获得该组织授权，且该组织同样接受本文件。
```

---

## 八、作者保留的权利

```
· 随时修改本文件，修改后自提交到本仓库之时起生效（不另行通知）
· 随时停止维护、归档仓库、甚至删除仓库
· 不回复 issue / PR / 邮件（会看，但不承诺）
· 拒绝为任何特定用途提供支持、定制、担保
· 在发现被滥用时，公开说明"与本项目无关"
```

---

## 九、其他

**9.1 可分割性** — 本文件任何条款被认定无效或不可执行，不影响其余条款的效力。

**9.2 不弃权** — 作者未行使某项权利，不构成对该权利的放弃。

**9.3 语言** — 本文件以中文撰写，英文版为便利译本；两者不一致时，**以中文版为准**。

**9.4 适用法律** — 本文件不指定特定司法辖区。作者不主动在任何辖区主张权利，
也不接受任何辖区的强制管辖（法律强制要求的除外）。

---

## 十、如果你不同意

**请立即：**

```
① 停止使用
② 删除本仓库的代码
③ 删除 ~/.beme/ 及其下全部数据
④ 删除你基于本库生成的任何衍生数据
```

**继续使用即视为同意。**

---

*一句话：**数据全在你机器上，我什么都收不到；它会记、也会错；备份加密合规都是你的事；
它不承诺维护，也不赔钱。用不用、怎么用、出事谁扛，都是你。***

---
---
---

# Disclaimer, Privacy Notice & Limitation of Liability (English)

**Last updated: 2026-10-28.** Applies to all code, docs and examples in this repository (`beme`).

**By downloading, installing, running, modifying or otherwise using this software, you
acknowledge that you have read, understood and irrevocably accept every term below.
If you disagree with any part of it, stop using it immediately and delete the code and
all generated data.**

## This is an experimental personal project

Not a product. No company, no support desk, no SLA, no refunds, no guaranteed maintenance.
The author wrote it to solve their own problem; "others can use it" is a side effect,
not an obligation. Issues are read but not guaranteed to be answered or fixed.

## Data risks (most likely place to fail)

This library exists to store what you say, so it **will** store a lot of data.
The author is not responsible for any of the following:

- **Loss** — accidental deletion, disk failure, power loss, migration mistakes, sync conflicts,
  container rebuild, or bugs in this library. **Backups are your responsibility.**
- **Corruption** — interrupted writes, concurrent processes (no file locking), manual edits,
  filesystem issues. Repair is not guaranteed.
- **Leakage** — the data is stored **unencrypted** in plain JSON/JSONL with **no access control**.
  Any process or user that can read the directory can read everything. The default `700`
  permission is a convenience default, not a security guarantee. If the machine is compromised,
  shared, backed up to an unsafe cloud, or the directory sits inside a syncing folder — the leak
  is yours and so is the liability.
- **Inconsistency** — retrieval depends on vocabulary, indexes and scoring, all of which change
  between versions. Results are not guaranteed to be stable or reproducible over time.

You must: back up regularly, lock down permissions / full-disk encryption, and never treat this
as the only copy of anything important.

## Accuracy risks

It **will** be wrong, and often in a confident-looking way. Blocks are fragments; answers are
assembled, and assembly fails. It may mix facts from different events, may conflate similar
but distinct things, and may fabricate when it cannot recall. The library retrieves blocks —
it does not control what the model then says.

**Forbidden uses:** accounting, tax, audit, invoicing, contracts; medical diagnosis or treatment;
legal advice or evidence; financial or investment decisions; HR / credit / identity decisions;
anything where an error causes personal injury or significant financial loss; anything requiring
auditability or provability.

## Privacy and compliance

It stores nearly everything you say, including information about third parties. Before injection
it redacts **core credentials only** (ID numbers, passwords, keys, card numbers). Phone numbers,
addresses, names and order numbers are **intentionally kept readable**. This is damage reduction,
not privacy protection — do not treat it as a compliance mechanism.

Whether you may process the data you store (including other people's personal data), and which
laws apply to you (PIPL, DSL, GDPR, CCPA or anything else in your jurisdiction), is entirely your
determination and your responsibility. This library offers no compliance features: no data-subject
request channel, no erasure implementation, no retention management, no cross-border controls,
no audit log.

If you are under 18 (or the age of majority where you live), use it only with a guardian who
accepts these terms on your behalf.

## Third parties

If you connect it to any model provider, your content leaves your machine and is governed by that
provider's terms; compliance with their policies, costs, rate limits and account status are your
responsibility. Host application terms, host bugs and host upgrades are unrelated to this project.
Filesystem behavior, disk failures, antivirus interference and OS-level issues are unrelated too.

## No warranty

Provided **"AS IS"** under the MIT License, without warranty of any kind, express or implied,
including merchantability, fitness for a particular purpose and non-infringement. No guarantee of
being error-free, uninterrupted, compatible, maintained, or accurate. The binding terms are in
[`LICENSE`](./LICENSE).

## Limitation of liability

In no event shall the author or copyright holders be liable for any claim, damages or other
liability — whether in contract, tort, strict liability or otherwise, and whether or not advised of
the possibility of such damage — including lost profits, lost revenue, business interruption,
goodwill, data loss/corruption/leak remediation costs, cost of substitute services, third-party
claims (including claims by your users, customers, employees or regulators), or any indirect,
incidental, special, punitive or consequential damages.

**If, notwithstanding the above, liability is found, the author's aggregate liability for all
claims is zero (0).** The software is provided free of charge and no consideration was received.

**You expressly waive any right to bring claims, suits, arbitrations or complaints against the
author** arising from this software, except where such waiver is prohibited by law.

## Your representations

You represent and warrant that: (1) you have the lawful right to process all data you store,
including third-party personal data; (2) you will not use this software for any unlawful purpose
or any use forbidden above; (3) data compliance, privacy, backup, encryption and access control
are yours to handle and to bear; (4) you understand this is an experimental project that may err,
may be abandoned, and comes with no support or compensation; (5) you will not hold the author
liable for unexpected results, data loss, incorrect answers or any derivative problem; (6) if you
use it on behalf of an organization, you are authorized to do so and that organization accepts
these terms as well.

## Reserved rights

The author may modify this file at any time (effective upon commit, without notice), stop
maintaining or delete the repository, decline to answer issues/PRs/email, and refuse support,
customization or guarantees for any particular use. If the project is misused, the author may
publicly state that it is unrelated to such use.

## Miscellaneous

Severability applies. Failure to enforce a right is not a waiver. This document is written in
Chinese; the English text is a convenience translation and **the Chinese version prevails** in
case of conflict. No jurisdiction is designated; the author does not actively assert rights in any
jurisdiction and does not accept mandatory jurisdiction except where required by law.

## If you disagree

Stop using it, delete the code, delete `~/.beme/` and all data under it, and delete any derivative
data. Continued use constitutes acceptance.
