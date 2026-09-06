# 页面模式

路由只负责读取经过验证的内容并交给页面模式组件。产品事实和制造事实不得直接写进路由文件。

## 当前路由与任务

| 路由 | 页面模式 | 用户任务 |
| --- | --- | --- |
| `/` | `VitheloB2BHome` | 从品牌和产品能力进入制造信任、剂型理解与项目询盘 |
| `/products` | `VitheloProductsPage` | 比较八种营养产品剂型和适用的项目方向 |
| `/oem-odm` | `VitheloOemOdmPage` | 理解从需求沟通到检验交付的合作路径 |
| `/insights` | Insights route composition | 浏览英文内容入口 |
| `/insights/[slug]` | Insight detail composition | 阅读单篇文章并进入项目询盘 |
| `/contact` | `VitheloContactPage` | 准备项目资料并通过 Email 或 WhatsApp 联系 |

全局 `loading.tsx`、`error.tsx` 和 `not-found.tsx` 保持一致的恢复路径。

## 首页合同

首页当前固定为七屏：

1. `hero`：产品主导的品牌首屏；主图已锁定并保持静止。
2. `proof`：制造数字证明。当前正在按 `V-A Editorial Proof Ledger` 单独重做。
3. `gummy-stage`：软糖定制能力。
4. `solutions`：六个产品使用方向的纵向滚动叙事。
5. `dosage-forms`：八种剂型同屏展示。
6. `project-runway`：六步 OEM / ODM 项目路径。
7. `contact`：Email 与 WhatsApp 直接询盘。

首页不得恢复以下旧结构：

- 十一屏长页。
- 独立的重复制造、质量或客户类型屏。
- 禁用的首页表单。
- 产品方向页码、左右箭头或横向轮播。
- 将口溶膜单独留在最后一行的剂型网格。

## 第二屏模式

第二屏是产品首屏与制造信任之间的转场，不是四张能力卡：

- 视觉方向：冷调克制的编辑式证据账本。
- 桌面：非对称大字、静态真实工厂/实验室画面、底部数字账本。
- 移动：文案、图片、两列数字账本顺序堆叠，无横向滚动。
- 页面只显示 `VITHELO`，不得出现资料来源公司的名称、Logo 或未核验认证。
- 详细规范见 [首页第二屏设计规范](superpowers/specs/2026-09-01-vithelo-home-screen-two-design.md)。

## Products

Products 使用连续的编辑式比较结构，而不是圆角卡片墙。八种剂型必须完整可见，移动端按自然阅读顺序纵向排列，不依赖横向滑动。

## OEM / ODM

OEM / ODM 页面负责解释项目路径、质量检查和需要提前准备的资料。它不得承诺未经确认的 MOQ、交期、认证或产能。

## Contact

Contact 提供已配置的直接渠道：

- Email：`wang26098@gmail.com`
- WhatsApp：`+86 182 7366 9556`

站内表单提交仍未配置。页面应帮助访客准备剂型、配方方向、包装需求、预计数量和目标时间，不得伪装成可提交表单。

## 响应式与动效合同

- 验收宽度：1440、1280、1024、768、390、375px。
- 桌面和移动端不得出现裁切、重叠或横向溢出。
- 第四屏在桌面保持纵向滚动关系；移动端转为自然顺序内容，不劫持页面滚动。
- 动效只用于软糖能力、剂型和项目路径等需要解释关系的屏幕。
- Hero 图片和第二屏工厂图片保持静止。
- Reduced Motion 显示完整最终状态。

## 相关文档

- [当前状态](current-status.md)
- [品牌系统](brand-system.md)
- [内容模型](content-model.md)
- [设计系统](design-system.md)
- [验收](acceptance.md)
