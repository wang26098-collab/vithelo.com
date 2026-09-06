# Homepage Implementation Mapping Note

最后更新：2026-09-06

## 发现的结构差异

Phase A.5 的 01–09 map 是目标审核顺序；当前 Home JSX 在本轮开始前只有 `hero`、`proof`、`gummy-stage`、`solutions`、`dosage-forms`、`project-runway`、`contact` 七个顶层 Section。

内容 fixture 还保留 `capacity` 以及若干历史字段，但它们不等于已经渲染的公开 Section。按照 Phase B 规则，本轮不重构全页、不恢复历史 Section。

## 本轮映射

| Evidence-Ready Section | 当前实现 | 本轮处理 |
| --- | --- | --- |
| 01 Hero | `#hero` | 已完成并保持不变 |
| 02 Manufacturing Proof | `#proof` | 改为 Evidence Ledger；不公开未核验数字或候选图片 |
| 03 Capability Boundary | 原先仅有内容字段，无顶层 Section | 新增 `#capacity-boundary` 结构化能力范围地图 |
| 04 Gummy Capability | `#gummy-stage` | 本轮不进入 |
| 05 Product Directions | `#solutions` | 本轮不进入 |
| 06 Format Discovery | `#dosage-forms` | 本轮不进入 |
| 07 OEM / ODM Project Runway | `#project-runway` | 本轮不进入 |
| 08 Quality Evidence Boundary | 当前无独立 Home 顶层实现 | 本轮不进入 |
| 09 Inquiry Close | `#contact` | 本轮不进入 |

## 约束

- 本 Note 只记录映射，不修改 Header、Navigation、Mega Menu、URL、Email、WhatsApp 或 Start a Project 逻辑。
- `REVIEW`、`IMAGE_REQUIRED`、`NOT_CONFIGURED` 素材和事实不进入公开 DOM、背景图、alt、caption 或 metadata。
- 后续 Section 实施仍按 04 → 09 顺序逐段进行，不能因为内容 fixture 已存在就提前渲染。
