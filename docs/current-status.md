# VITHELO 项目当前状态

最后更新：2026-09-12

本文档是当前项目进度、已确认决策和下一步工作的入口。历史设计规范与本文冲突时，以本文和用户最新明确指令为准；历史文件继续保留作为过程记录，不代表当前实现。

## 当前产品形态

- 对外品牌统一为 `VITHELO`。
- 当前网站是面向营养健康产品 OEM / ODM、私人标签与项目询盘的英文 B2B 独立站。
- 当前公开路由包括 `/`、`/products`、`/products/[slug]`、`/oem-odm`、`/manufacturing`、`/quality`、`/about`、`/insights`、`/insights/[slug]` 和 `/contact`。
- `/products/[slug]` 当前覆盖 8 个剂型页面。
- 首页承担品牌建立、制造能力说明、产品剂型展示、项目方向解释和询盘引导，不承担支付或服务端表单提交。

## 当前首页结构与锁定规则

- 首页当前渲染九个内容区：Hero、制造证明、三款主打产品陈列、定制能力星图、产品方向、产品剂型、OEM / ODM 项目路径、晨昏品牌标语、询盘收口。
- 用户已明确允许提交当前 Hero 演示视频；Reduced Motion 下显示静态 Hero 图。除此之外不更换、重生成、缩放、位移或加入视差。
- 导航、既有内容区屏高以及各屏上下/左右内间距为当前几何锁定基线；新增晨昏标语屏复用既有屏高，不改变已接受屏幕的几何值。
- 第五区保留 Evening Routines、Active Routines、Life-stage Routines 三个产品方向场景；其前方独立的深色标题引导屏已移除，不再显示 `05 · PRODUCT DIRECTION`、主标题或右侧说明。
- 第三屏使用 Editorial Product Runway 展示 Sleep Health、Active Nutrition 和 Women’s Health 三款 VITHELO 产品；桌面一屏完整显示，平板两列，手机纵向排列。
- 第四屏使用 Customization Constellation 展示 `VITHELO` 包装、五类剂型元素与 Formula、Dosage Form、Flavor & Taste、Packaging 四个定制节点；公开锚点暂保留 `#gummy-stage` 以兼容已有链接。
- 第六屏采用参考图式的白色圆角容器、紧凑标题栏与双列影像卡片网格，在同一内容区完整展示八种剂型；Oral Films 不得被版式孤立。
- 第六屏只保留同向、一次性的轻量揭示；真实剂型名称始终稳定可读，不再使用双列对向入场、滚动惯性、桌面指针视差或标签解码。Reduced Motion 显示最终静态状态。
- 新增晨昏品牌标语屏位于 OEM / ODM 项目路径之后、询盘收口之前；桌面主标题固定两行，配图表现从晨光到夜色的连续时间流动，并保留一处克制暖光。配图标记为 `DEMO_ONLY`。
- 第九屏询盘收口已实现 VITHELO 字标遮罩揭示软糖场景图，并在约 72% 进度完成，使 Email 与 WhatsApp 在约 75% 进度前清晰可用。滚动仍由浏览器原生控制，图片标记为 `DEMO_ONLY`。
- Reduced Motion 下直接显示完整询盘内容；锚点跳转、键盘聚焦和无 JavaScript 回退也可直接到达询盘内容。
- 不再整页推翻重做。后续按单屏锁定目标、实施和验收，保留已接受屏幕。
- 本轮首页叙事与动效的设计及实施边界见 [设计规范](superpowers/specs/2026-09-11-vithelo-home-narrative-motion-design.md) 与 [实施计划](superpowers/plans/2026-09-11-vithelo-home-narrative-motion.md)。

## 询盘实现

- Email 与 WhatsApp 是当前已配置的直接询盘渠道。
- 页面内询盘编辑器只在浏览器中整理信息并生成预填 Email / WhatsApp，不在站内保存或提交数据。
- 服务端表单、CRM、反垃圾、数据保存期限、同意文本和成功/失败状态仍为 `NOT_CONFIGURED`。
- 当前第九屏的设计与实现记录见 [询盘揭示设计规范](superpowers/specs/2026-09-06-vithelo-inquiry-reveal-design.md)、[实施计划](superpowers/plans/2026-09-06-vithelo-inquiry-reveal.md) 和 [验收记录](superpowers/specs/2026-09-06-vithelo-inquiry-reveal-acceptance.md)。

## 公开身份与证据边界

- 页面、元数据、图片文字和替代文本中只允许公开 `VITHELO`。
- 不得公开资料来源中的公司中文名、英文名或原品牌标识。
- 不得把资料中的 GMP、HACCP、Halal、ISO、FDA、COA 或第三方检测图标直接当作 VITHELO 已核实认证。
- 不得自行增加功效、剂量、法规、认证、产能、MOQ、交期、价格或市场合规结论。
- 用户提供但尚未完成生产核验的数据必须明确标记来源边界；缺失内容继续使用 `NOT_CONFIGURED`。

## 已配置与待确认

已配置：

- 正式域名：`vithelo.com`
- 部署平台：Hostinger
- GitHub：`https://github.com/wang26098-collab/vithelo.com.git`
- 生产分支：`main`
- 询盘邮箱：`wang26098@gmail.com`
- WhatsApp：`+86 182 7366 9556`
- 包管理器：`pnpm@10.34.5`

仍待用户确认：

- 公司法定英文名称
- 公司注册地址或公开联系地址
- 隐私事务联系邮箱；`wang26098@gmail.com` 只能在明确确认后兼用
- 认证、检测、产能和客户覆盖数据的正式对外使用授权及证明材料

## 当前版本与验证事实

- `/products` 已收敛为 8 个剂型入口；选择剂型后只显示该剂型的 10 款 `DEMO_ONLY` 产品。
- 产品矩阵采用非对称 Product Runway；桌面为一张主卡加九张次级卡，平板两列，手机单列。
- 产品卡使用用户提供的 VITHELO 临时素材进行双图悬浮；触屏、键盘焦点和 Reduced Motion 保持信息完整。
- 产品发现标题长度约束为 20–120 个字符，描述为 80–180 个字符；卡片通过 `product` 查询参数联动至剂型详情页，并显示 `DEMO_ONLY` 参数表。
- 本轮产品页定向单元测试 9 项通过；六个验收视口产品 E2E 18 项通过；类型检查、构建和相关源文件定向 ESLint 通过。
- 当前工作分支为 `main`；用户已于 2026-09-16 明确授权整理并推送 GitHub（包含当前 Hero 演示视频）。Hostinger 部署结果仍需单独核验。
- 询盘揭示相关 42 项 E2E 在 6 个验收视口通过。
- `pnpm.cmd typecheck` 当前通过；本地运行环境为 Node 24.16.0。
- `pnpm.cmd build` 在本地 Node 24.16.0 下通过；这不等同于 Hostinger 使用的 Node 20.x 构建证据。
- 本轮完整单元测试 131 项通过；Python 产品导入测试 13 项通过；应用 lint 在排除本地参考资料后通过。
- 本轮移除产品方向标题引导屏、保留三个方向场景后的定向单元测试为 26 项通过。
- 第六屏参考图式改造的组件测试 14 项通过，桌面 1440 × 1000 与移动端 390 × 844 已完成定向截图检查；最终视觉接受仍以用户确认结果为准。
- 首页几何契约测试通过，确认既有屏高和上下/左右内间距声明未改变；本轮相关源文件的定向 ESLint 通过。
- 第四屏定向 E2E 在六个验收视口为 36 项通过；覆盖结构、响应式、动效语义、CTA 与 Reduced Motion。
- 完整 E2E 当前为 271 项通过、50 项失败、15 项跳过；需要统一旧版首页与导航预期后才能声明完整回归通过。
- `独立站内容/` 是未跟踪的本地参考资料，已从 Git 暂存和应用 lint 中排除。
- 本轮首页叙事与动效调整尚待用户视觉验收，因此当前不能声明 P0/P1 已清零或技术上线就绪。

## 下一步顺序

1. 本轮 GitHub 推送已获用户明确授权；新增晨昏标语屏的最终视觉验收仍需单独完成。
2. 以当前九个内容区首页和几何契约作为锁定基线，后续只做用户明确提出的单屏定向修改。
3. 更新仍绑定旧首页结构的其余 E2E 断言，恢复完整回归通过。
4. 调整 lint 输入范围，避免把 `独立站内容/` 的参考脚本当作产品源码；不得因此编辑参考资料。
5. 使用 Node 20.x 完成干净安装和完整生产构建。
6. 补齐法定主体、公开地址、隐私联系和证据授权等业务输入。
7. 仅在用户明确要求后推送 GitHub 或部署 Hostinger。
