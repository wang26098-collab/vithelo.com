# VITHELO 项目当前状态

最后更新：2026-09-08

本文档是当前项目进度、已确认决策和下一步工作的入口。历史设计规范与本文冲突时，以本文和用户最新明确指令为准；历史文件继续保留作为过程记录，不代表当前实现。

## 当前产品形态

- 对外品牌统一为 `VITHELO`。
- 当前网站是面向营养健康产品 OEM / ODM、私人标签与项目询盘的英文 B2B 独立站。
- 当前公开路由包括 `/`、`/products`、`/products/[slug]`、`/oem-odm`、`/manufacturing`、`/quality`、`/about`、`/insights`、`/insights/[slug]` 和 `/contact`。
- `/products/[slug]` 当前覆盖 8 个剂型页面。
- 首页承担品牌建立、制造能力说明、产品剂型展示、项目方向解释和询盘引导，不承担支付或服务端表单提交。

## 当前首页结构与锁定规则

- 首页当前渲染八屏：Hero、制造证明、三款主打产品陈列、定制能力星图、产品方向、产品剂型、OEM / ODM 项目路径、询盘收口。
- Hero 画面已经锁定并保持静止；不得替换、重新生成、缩放、位移或应用视差。
- 第五屏产品方向保持原生纵向滚动，不显示页码、左右箭头，也不改成横向轮播。
- 第三屏使用 Editorial Product Runway 展示 Sleep Health、Active Nutrition 和 Women’s Health 三款 VITHELO 产品；桌面一屏完整显示，平板两列，手机纵向排列。
- 第四屏使用 Customization Constellation 展示 `VITHELO` 包装、五类剂型元素与 Formula、Dosage Form、Flavor & Taste、Packaging 四个定制节点；公开锚点暂保留 `#gummy-stage` 以兼容已有链接。
- 第六屏在同一内容区完整展示八种剂型；Oral Films 不得被版式孤立。
- 第六屏采用已确认的 2.5D DOM / CSS 动效：标题逐字揭示、双列对向入场、滚动惯性、桌面指针视差和确定性标签解码；Reduced Motion 显示最终静态状态。
- 第八屏询盘收口已实现 VITHELO 字标遮罩揭示软糖场景图。滚动仍由浏览器原生控制，图片标记为 `DEMO_ONLY`。
- Reduced Motion 下直接显示完整询盘内容；锚点跳转、键盘聚焦和无 JavaScript 回退也可直接到达询盘内容。
- 不再整页推翻重做。后续按单屏锁定目标、实施和验收，保留已接受屏幕。

## 询盘实现

- Email 与 WhatsApp 是当前已配置的直接询盘渠道。
- 页面内询盘编辑器只在浏览器中整理信息并生成预填 Email / WhatsApp，不在站内保存或提交数据。
- 服务端表单、CRM、反垃圾、数据保存期限、同意文本和成功/失败状态仍为 `NOT_CONFIGURED`。
- 当前第八屏的设计与实现记录见 [询盘揭示设计规范](superpowers/specs/2026-09-06-vithelo-inquiry-reveal-design.md)、[实施计划](superpowers/plans/2026-09-06-vithelo-inquiry-reveal.md) 和 [验收记录](superpowers/specs/2026-09-06-vithelo-inquiry-reveal-acceptance.md)。

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

- 当前工作分支为 `main`；首页锁定实现尚未推送或部署。
- 询盘揭示相关 42 项 E2E 在 6 个验收视口通过。
- `pnpm.cmd typecheck` 通过。
- `pnpm.cmd build` 在本地 Node 24.16.0 下通过；这不等同于 Hostinger 使用的 Node 20.x 构建证据。
- 完整单元测试当前为 123 项通过、0 项失败。
- 第四屏定向 E2E 在六个验收视口为 36 项通过；覆盖结构、响应式、动效语义、CTA 与 Reduced Motion。
- 完整 E2E 当前为 271 项通过、50 项失败、15 项跳过；需要统一旧版首页与导航预期后才能声明完整回归通过。
- 完整 lint 会扫描 `独立站内容/` 下的本地参考脚本，当前为 424 个错误、19,208 个警告；询盘相关源文件的定向 ESLint 已通过。
- 第八屏尚待用户视觉验收，因此当前不能声明 P0/P1 已清零或技术上线就绪。

## 下一步顺序

1. 以当前八屏首页作为锁定基线，后续只做用户明确提出的单屏定向修改。
2. 更新仍绑定旧首页结构的 E2E 断言，恢复完整回归通过。
3. 调整 lint 输入范围，避免把 `独立站内容/` 的参考脚本当作产品源码；不得因此编辑参考资料。
4. 使用 Node 20.x 完成干净安装和完整生产构建。
5. 补齐法定主体、公开地址、隐私联系和证据授权等业务输入。
6. 仅在用户明确要求后推送 GitHub 或部署 Hostinger。
