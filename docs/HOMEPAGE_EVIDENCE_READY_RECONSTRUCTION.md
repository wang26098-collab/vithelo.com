# VITHELO Homepage Evidence-Ready Reconstruction

最后更新：2026-09-06

阶段：Phase A.5

> 本文档是 Home UI 实现前的证据就绪重构，不是 UI 实施稿。01–09 是本阶段的审核顺序，不代表当前代码已经渲染了九个 Section。任何 `REVIEW`、`IMAGE_REQUIRED`、`NOT_CONFIGURED` 素材或事实均不得作为公开证据接入页面。

## 重构目标

Home 只回答：**Who are you and why trust you?**

它负责：

- 建立 VITHELO 的 Nutrition OEM / ODM 定位；
- 用可核验或明确标记边界的证据建立继续尽调的理由；
- 把采购商分流到 Products、OEM / ODM、Manufacturing、Quality 和 Contact；
- 在信任形成后保留 Email、WhatsApp、Start a Project。

它不负责：

- 展开完整产品目录；
- 讲完整 Formula Development、Packaging、Sampling 流程；
- 代替 Manufacturing 或 Quality 页面完成供应商尽调；
- 把候选图片、待核验数字、证书或 MOQ 做成公开能力证明。

## Evidence status 规则

| 状态 | Home 处理 |
| --- | --- |
| `APPROVED` | 可用于公开结构、文案或资产，但仍须保持 claim 与证据范围一致 |
| `REVIEW` | 仅作为内部缺口记录；公开页面不得引用、展示或作为证明 |
| `IMAGE_REQUIRED` | 保留 Section 的信息任务，显示缺图边界或使用无图构图；不得生成替代证据 |
| `NOT_CONFIGURED` | 不输出具体业务事实；使用待配置状态或转向已配置的页面入口 |
| `DEMO_ONLY` | 仅测试/演示使用，不作为生产事实 |

## Homepage 01–09 Section Map

| No. | Section | Buyer Question | Decision Contribution | Evidence Status | Visual Composition | CTA Position | Mobile Behavior |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Hero / Brand orientation | Who are you? | 在首屏明确 VITHELO 是面向营养品品牌的 OEM / ODM 制造项目入口，并让高意向买家立即选择下一步 | `APPROVED`：Hero artwork 与结构锁定；业务事实仍遵守内容状态 | 静态锁定 Hero；左侧/主阅读区为 H1、短说明和双 CTA；不加视差、不替换、不叠加伪证据 | 首屏直接提供 `Start a Project` 与一个低摩擦联系入口；保留现有商业路径 | Hero 图保持静态；文字先于媒体；CTA 纵向排列且保持 44px 触达；不让 H1 被压成过多行 |
| 02 | Manufacturing proof / Reality check | Is there a real manufacturing basis? | 把品牌定位连接到“可以继续核验的制造现实”，而不是只展示抽象能力词 | `REVIEW`：候选生产/洁净空间图片未完成脱敏、主体和授权；不得公开使用 | 编辑式 proof ledger：一侧是简短证据说明与来源边界，另一侧是数字/标签账本；没有批准图片时不留“假工厂”大图 | 证据说明之后放 `Explore Manufacturing`；Quality 作为次级核验入口 | 先显示说明与来源边界，再显示证据条目；候选图不加载为公开 proof；链接变成全宽 44px 行动条 |
| 03 | Capability boundary / What can be supported | Can your capability match my project? | 让采购商快速判断是否值得继续了解，但不把未核验数字包装成确定产能 | `NOT_CONFIGURED`：资料中的产能、客户和覆盖数字仍需生产核验及公开授权 | 用中性指标框架或“available / pending verification”状态展示范围；缺失数据采用清晰的待核验标记，不做增长曲线或巨大数字墙 | 只在已配置内容后给 `View Manufacturing`；未配置时不放转化 CTA 伪装事实 | 指标改为单列短行；每条事实与状态紧邻；避免横向滚动和仅靠颜色表达状态 |
| 04 | Gummy capability / Format depth | Can you support this format beyond a product image? | 说明软糖是一个需要配方、感官、形状和包装协同判断的格式，引导进入 Products 或 OEM / ODM | `IMAGE_REQUIRED`：无已批准研发/软糖生产实拍；现有 media 状态不能作为公开证据 | 以“format relationship”构图：主标题 + 关系型文字轨道；不使用伪实验室图，不把 MOQ 或未核验能力写成卖点 | 段末给 `Explore Products`；高意向项目用户可看到 OEM / ODM 次级链接 | 桌面端关系轨道改为纵向顺序；所有关系项完整展开，不依赖 hover 或 wheel 锁定；动效减少为静态 reveal |
| 05 | Product directions / Discovery handoff | What kinds of products can I explore? | 只做产品方向分流，让采购商进入 Products 完成产品与剂型发现，不在 Home 复制目录 | `NOT_CONFIGURED` / `IMAGE_REQUIRED`：真实产品实体与代表图尚未完成核验 | 非对称方向列表或轻量 editorial index；每个方向只保留名称、受控短说明和 Products 链接；不做完整产品卡墙 | 方向条目内或段末统一进入 `/products`；不放 Formula、Packaging、MOQ CTA | 改为可扫读的纵向列表；条目完整显示文本；不使用水平轮播、页码或左右箭头 |
| 06 | Product formats / Format discovery | Which formats are available to compare? | 让采购商快速识别剂型范围，建立 Products 的发现入口，但不解释开发决策 | `NOT_CONFIGURED`：当前旧八剂型与目标九剂型关系尚未完成真实产品核验 | 同一平衡字段展示受控剂型入口；保留 Oral Films 在同一组，不因网格余数单独孤立；图形只作为格式识别，不当证据 | 段末 `View all Products`；不在每个格式项重复询盘 CTA | 采用单列或稳定多列折叠；九剂型/待核验项均可见；无横向 overflow；键盘顺序与视觉顺序一致 |
| 07 | OEM / ODM project runway | How can you help me develop my product? | 只给出从概念到生产的方向性路径，把复杂项目判断交给 OEM / ODM 页面 | `NOT_CONFIGURED` + `IMAGE_REQUIRED`：流程可配置，R&D、样品和包装证据尚未公开批准 | 六步简洁纵向/横向关系：Concept → Formula Development → Format Selection → Packaging → Sampling → Production；每步包含 Buyer Question、Capability、Evidence 状态，但不伪造图片 | 段末 `Explore OEM / ODM`；最终项目 CTA 不在每个步骤重复 | 六步变为纵向时间线；每步完整展开；不使用 scroll-jacking；Reduced Motion 下全部步骤默认可见 |
| 08 | Quality / Evidence boundary | Why should I trust the reliability claim? | 让采购商知道质量、检测和文件需要如何核验，并把深度问题导向 Quality / Manufacturing | `NOT_CONFIGURED` + `IMAGE_REQUIRED`：质量文件、检查场景和证书尚未完成逐项核验 | 用“evidence boundary”构图：控制点、文件类型、核验提示；不展示证书 Logo 墙，不使用待审核证照图 | 给 `Review Quality` 或 `Explore Manufacturing`；不把未核验认证变成 CTA 卖点 | 证据条目逐项堆叠；状态同时有文字；不可只通过颜色区分；链接保留 44px 高度 |
| 09 | Inquiry close / Start a project | How do we start cooperation? | 在定位、能力边界和证据路径之后完成最终转化，明确下一步所需信息 | `APPROVED`：Email、WhatsApp、Start a Project 的浏览器预填路径；内部存储/CRM 未配置 | 深色 editorial channel split；左侧项目启动说明，右侧 Email / WhatsApp 两个直接通道，下方保留 Project Brief/预填 composer | 页面底部最终 CTA；保留 `Email`、`WhatsApp`、`Start a Project`，不改变商业路径 | 先显示主标题和准备信息，再显示三个 44px 目标；Email/WhatsApp 不隐藏在折叠层；预填内容在移动端可读 |

## Section 之间的判断路径

```text
01 定位
  ↓
02 现实证据 → 03 能力边界
  ↓                 ↓
04 格式深度 → 05 产品方向 → 06 剂型发现
  ↓
07 项目路径 → 08 质量核验
  ↓
09 开始询盘
```

这条路径不是强制线性漏斗。每个 Section 都必须允许采购商跳到更具体的页面；Home 的职责是减少不确定性，不是阻止用户直接进入 Products、Manufacturing、Quality 或 Contact。

## 公开证据禁用清单

以下素材在本阶段一律不作为 Home 公开证据：

- `assets/evidence/_needs-review/` 下全部候选图片；
- `manufacturing-cleanroom-*`、`manufacturing-equipment-filling-line-*`、`manufacturing-production-operation-*` 等尚未完成审核的副本；
- `oem-moq-reference-needs-review.png`；
- `森酷企业介绍(2).pdf` 中的原 Logo、公司名、证照、外部厂房和未核验数字；
- 未完成主体、范围、有效期和公开授权核验的 GMP、HACCP、Halal、ISO、FDA 或第三方检测材料；
- 未确认的产能、客户数量、国家覆盖、MOQ、交期、价格或生产结论。

## Home UI 实现前的 Gate

- [ ] 01–09 的顺序、Section 名称和页面主问题通过产品/内容审核。
- [ ] 每个 Section 的 claim 已连接到 `docs/PAGE_EVIDENCE_MAPPING.md`；缺口明确写为 `REVIEW`、`IMAGE_REQUIRED` 或 `NOT_CONFIGURED`。
- [ ] 没有任何候选素材被组件、alt、caption、metadata 或 CSS 背景公开引用。
- [ ] Hero 仍为锁定资产；Header、导航、URL、Mega Menu、Email、WhatsApp、Start a Project 未改变。
- [ ] Mobile 行为、Reduced Motion、键盘顺序、44px 目标和无横向溢出已形成实现验收条目。
- [ ] 用户完成本阶段结构审核后，才进入 Home UI implementation；未通过前不修改 `src/components/patterns/vithelo-b2b-home.tsx` 或其 CSS。
