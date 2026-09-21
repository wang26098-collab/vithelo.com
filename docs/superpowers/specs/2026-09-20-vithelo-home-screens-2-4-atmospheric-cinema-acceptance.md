# VITHELO 首页第 2–4 屏 Atmospheric Cinema 验收

- 设计规范：`2026-09-20-vithelo-home-screens-2-4-atmospheric-cinema-design.md`
- 验收视口：1440×1000、1280×800、1024×1366、768×1024、390×844、360×800
- 代理视觉检查：P0 = 0，P1 = 0
- 用户视觉验收：待确认

## 范围与结果

- 第 2 屏：保留 Manufacturing System 内容任务；使用真实工厂源图，仅通过 CSS 做裁切、暖暗分级和遮罩，未生成或伪造工厂场景。
- 第 3 屏：保留三种项目入口及 CTA；使用一张连续暖暗全景，媒体状态为 `DEMO_ONLY`，画面无包装、产品宣称、认证或可读文字。
- 第 4 屏：保留 Product Definition 内容任务、中央概念瓶与四个 HTML 决策节点；媒体状态为 `DEMO_ONLY`，未把节点或宣称烘焙进图片。
- 第 2–4 屏顺序、标题、正文、CTA 和节点数量保持不变。
- Reduced Motion 下媒体、标题、节点均直接处于最终可见状态。

## 响应式视觉检查

- 六个验收视口均无页面级横向溢出、节点碰撞或内容遮挡。
- 768px 初检发现第 2 屏图片受旧 `min-height` 与宽高比共同作用而超出版心；已仅为 ≤900px 增加 `width/max-width: 100%`，复查后图片范围为 48–705px，页面内容宽 753px。
- 390px 与 360px 下，第 3 屏三入口和第 4 屏四节点按文档流顺序排列；第 4 屏瓶体保持在裁切中心。

## 自动化验证

- 定向单元测试：3 个文件，28/28 通过。
- ESLint：通过。
- 第 2–4 屏专项 E2E：7 项通过、5 项按项目名跳过；包含六个 Playwright 项目的文档流/媒体状态/四节点检查，以及一次独立的 900px 断点上边界检查。
- 其余定向 E2E：30 项中 24 项通过；与第 2–4 屏相关的媒体状态、可见性、Reduced Motion、语义动效和 44px 目标检查均通过。其余 6 项均停在未改动的第 8 屏 `brand-statement` 旧文本空格断言，六个视口原因一致。
- TypeScript 与 Next.js production build 在本轮实现后曾通过。20:34 工作区并行修改了 `src/content/demo/vithelo-b2b-site.ts`，移除了 OEM/ODM 页面仍在读取的 `identity`、`customization`、`production` 字段；最终复跑因此在未改动的 `vithelo-oem-odm-page.tsx` 失败。本轮不越界修改该页面。
- 最终全量单元测试：134/136 通过。失败项为本轮开始前已存在的主页几何 hash 基线不一致（期望 `510CD...`，实际 `76E4...`），以及上述并行 OEM/ODM fixture/组件字段不一致。本轮未更新 hash 或越界修复来掩盖问题。
- 本地运行环境为 Node 24.16.0；未声明 Hostinger 所需 Node 20 生产验证。

## 素材记录

- `public/media/b2b/vithelo-project-entry-atmospheric-panorama.png`：1536×1024 PNG，`DEMO_ONLY`。
- `public/media/b2b/vithelo-product-definition-atmospheric.png`：1536×1024 PNG，`DEMO_ONLY`。
- 两张素材均经人工审图；唯一公开品牌为 VITHELO，无认证标志或效能、剂量、监管宣称。

## 待办

- 用户在最终浏览器预览中确认第 2–4 屏视觉后，才可把“用户视觉验收”标记为通过。
- 第 8 屏文本断言和主页几何 hash 属于既有工作区基线问题，应另行处理，不能并入本次三屏视觉修改。
