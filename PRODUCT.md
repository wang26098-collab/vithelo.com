# VITHELO 产品定义

<!-- impeccable:product-schema 1 -->

## 平台

英文 B2B Web 独立站。

## 技术栈

Next.js App Router、TypeScript、Tailwind CSS 4、定制 Radix primitives、Motion、Zod、Vitest、Testing Library 和 Playwright。

## 核心用户

- 寻找营养健康产品 OEM / ODM 或私人标签合作的品牌方。
- 评估剂型、配方方向、包装需求、预计数量和项目周期的采购或项目负责人。
- 需要先理解制造能力、产品方向和合作路径，再通过 Email 或 WhatsApp 发起询盘的海外访客。

## 产品目的

用一个克制、可信、面向决策的英文网站，把 VITHELO 的营养健康产品制造能力转化为清晰的 B2B 项目路径。首页负责建立信任和引导询盘；Products 支持剂型比较；OEM / ODM 解释合作流程；Insights 提供内容入口；Contact 完成直接联系。

## 当前定位

- 对外品牌统一为 `VITHELO`。
- 当前阶段只聚焦营养健康产品制造与 B2B 询盘，不再以“双产品世界”作为公开网站结构。
- 网站不是电商商店，不提供支付、账户、购物车或在线下单。
- 网站不是认证或法规证明库；未经核验的资料不得包装成公开背书。

## 当前公开路由

- `/`：七屏首页，完成品牌、制造证明、产品能力、项目路径和询盘收口。
- `/products`：八种产品剂型的连续比较。
- `/oem-odm`：六步合作路径与质量检查点。
- `/insights`、`/insights/[slug]`：英文内容与文章。
- `/contact`：Email、WhatsApp 和项目准备信息。

## 当前首页合同

1. Hero：使用已完成并锁定的主图。
2. Manufacturing proof：从产品画面过渡到真实制造数字。
3. Gummy capability：说明软糖定制能力。
4. Product directions：原生纵向滚动的六个使用方向，无页码与左右箭头。
5. Product formats：八种剂型同屏展示，口溶膜不单独占行。
6. OEM / ODM runway：从 brief 到 delivery 的六步路径。
7. Inquiry close：Email 与 WhatsApp 直接询盘，不显示无效表单。

## 已确认的设计原则

- 视觉基准是已完成的导航栏：材料感、克制、精确，不依赖模板化卡片堆叠。
- Hero 主图不得替换、移动、缩放或视差。
- 不要求每屏都有动效；只在关系解释和步骤展开时使用。
- 不再整页推翻重做。每次只处理一个已批准屏幕，完成后作为后续质量基准。
- 当前只重做第二屏，方向为 `V-A Editorial Proof Ledger`。
- 项目内部规范与计划使用中文，网站公开文案使用英文。

## 内容与身份边界

- 页面只公开 `VITHELO`。
- 不公开 `独立站内容/` 资料中的公司名称、原品牌或 Logo。
- 用户提供的 PDF 可作为设计与事实来源，但认证、检测、客户覆盖和产能仍需生产核验与对外授权。
- 不自行发明功效、剂量、法规、认证、MOQ、交期、价格、产能或市场政策。
- 缺失字段继续显示或记录为 `NOT_CONFIGURED`。

## 已配置

- Email：`wang26098@gmail.com`
- WhatsApp：`+86 182 7366 9556`
- 正式域名：`vithelo.com`
- 部署：Hostinger，GitHub `main`，Node 20.x，`pnpm@10.34.5`

## 上线阻塞项

- 公司法定英文名称。
- 公司注册地址或公开联系地址。
- 隐私事务联系邮箱确认。
- 正式隐私政策和页脚法律信息。
- 数据、认证和图片的正式对外使用批准。
- Node 20.x 干净安装、完整构建、部署和上线后 DNS/SSL/移动端验收。

## 当前状态入口

完整进度见 [docs/current-status.md](docs/current-status.md)。
