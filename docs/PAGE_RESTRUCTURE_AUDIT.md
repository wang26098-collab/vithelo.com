# VITHELO 页面重构审计

## 审计规则

每页按 `Primary Intent → Target Buyer → Entity → Topic → Search Question → AI Answer Potential → Duplicate Content → Missing Content → Evidence → Image Need → Action` 检查。Action 只使用 Keep / Move / Rewrite / Merge / Remove。

| Page | Primary Intent | 当前问题 | 重复/错误内容 | 缺失内容 | 证据与图片需求 | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 总览与分流 | 屏幕多，制造、剂型、项目关系重复 | 重复剂型与制造能力说明 | 清晰分流和证据上下文 | 真实室内生产、剂型、项目画面；Hero 锁定 | Rewrite / Keep CTA | P0 |
| `/products` | 产品发现 | 夹带定制、包装和 Format Decisions | OEM、Packaging、Formula | 真实产品清单；每个剂型下具体产品 | 产品/剂型主图；缺图预留 | Rewrite / Move | P0 |
| 8 个剂型页 | 单剂型项目匹配 | 共享结构可能过度同质 | 部分 OEM 解释重复 | 每个剂型独有材质、产品和包装证据 | 对应剂型产品图、包装图 | Rewrite | P1 |
| `/oem-odm` | 定制项目路径 | 定制能力没有展开 | 与 Products 重复剂型和包装 | Concept、Formula、Sampling、Scale、Private Label | R&D、样品、包装、文件照片 | Rewrite | P0 |
| `/manufacturing` | 制造与质量证据 | 文字描述多，证据不足 | 与 Quality 主题重叠 | Facilities、Process、QC、Documents、Compliance | 生产线、设备、洁净间、检查场景 | Merge / Rewrite | P0 |
| `/quality` | 质量证据 | 与 Manufacturing 可能重复 | 质量体系描述分散 | 若合并则转为 Manufacturing 锚点/兼容入口 | QC、文件、检查；证照仅内部待核验 | Merge decision | P0 |
| `/about` | 企业身份 | 易重复制造能力 | Manufacturing / 客户覆盖 | 可核验身份和透明度 | 不使用源公司名、地址或证书号 | Keep / Rewrite | P1 |
| `/insights` | 买家教育 | 文章入口正常但需服务商业页 | 不应重复 Products 长说明 | Topic cluster 与相关商业页 | 文章封面、内图；没有就预留 | Keep / Rewrite | P1 |
| `/insights/[slug]` | 单问题解答 | 需检查证据、更新时间和链接 | 不重复 OEM 全流程 | Direct Answer、Evidence、Related CTA | 文章图 3:2；没有就预留 | Keep / Rewrite | P1 |
| `/contact` | 项目启动 | 当前逻辑需保持真实 | 不承载产品教育长文 | What to Prepare、What Happens Next | 可无图；辅助图可选 | Keep / Polish | P0 |

## 第一批迁移清单

- [ ] 从 Products 移出 Formula Development、Packaging Customization、OEM Process、Format Decisions 的主体内容。
- [ ] 将上述内容归入 OEM / ODM 的 Concept、Formula、Dosage Form Selection、Packaging、Sampling、Scale、Private Label。
- [ ] 将 Quality 的质量控制与证据并入 Manufacturing；先保留旧 `/quality` 路由的兼容策略，不直接删除。
- [ ] Products 补充真实产品分类和每个剂型下的产品位；无真实数据时显示 `IMAGE_REQUIRED` / `NOT_CONFIGURED`。
- [ ] Home 改为分流层，不复制每个页面的详细说明。
- [ ] 所有图片先从证据资产库匹配；没有合适图片就保留明确占位，不生成伪证据。

## 2026-09-06 实现核对补充

本次核对以当前 App Router、content schema、demo fixture 和公开素材目录为准。以下结论只描述现状，不代表已经批准的公开业务事实。

| 检查项 | 当前证据 | 结论 | 下一步 |
| --- | --- | --- | --- |
| Products hero | `src/content/demo/vithelo-b2b-site.ts` 使用 `Gummy-first. Built across eight product formats.` | 与九剂型目标架构不一致，且 hero 仍带有项目决策语气 | Phase 5 改为 Product Portfolio / Product Discovery |
| Products entity | `B2BProductsPageSchema` 使用 `DosageFormatCapabilitySchema`，只有 `id/name/fit/customization/packaging/moq` | 不是可筛选的 Product Entity | 新建受控 form、benefit、category 和 product records |
| Products overlap | Products 组件包含 `FORMAT DECISIONS`、`PACKAGING`、MOQ 和相关商业变量 | 与 OEM / ODM 及 Insights 重叠 | 将主体解释迁移到 `/oem-odm` 或对应 Insights |
| Form taxonomy | 当前 fixture 有 8 项，包含 `liquids`、`functional-gum`，缺 `jelly`、`effervescent`、`soft-chew` | 旧模型与本阶段九剂型目标不一致 | 先完成真实产品数据核验，再更新公开集合 |
| Benefit taxonomy | 当前 Products schema 没有 benefit 字段 | AI/GEO 无法从结构化内容识别功能方向 | Phase 3 先落 contract，再接页面 |
| Product detail | 已存在 `/products/[slug]` 路由目录，但当前资料仍按通用 slug 读取 | 需要从“任意 slug”过渡为 form/product 关系 | 先确定 slug 与旧链接兼容策略 |
| Manufacturing / Quality | 同时存在 `/manufacturing` 与 `/quality`，页面模式已出现 Quality & R&D 主题 | 页面职责有重叠风险 | 保留入口，后续确认合并内容与兼容路由 |
| Evidence assets | `assets/evidence/_needs-review/` 有 6 个已描述命名的候选文件 | 资产已进入内部候选库，但均未获得公开批准 | 逐项脱敏、来源、授权和页面匹配审核 |
| Navigation / inquiry | 站点内容仍包含既有导航与 `/contact`，核心 CTA 保留 | 本阶段冻结项满足 | 后续只做回归测试，不因架构调整重写 |

## 本阶段顺序与停止条件

1. 完成页面归属、产品架构和证据资产库文档。
2. 将现有产品、页面、素材逐项映射到上述文档；不能确认的记录为 `NOT_CONFIGURED`。
3. 仅当 Product Entity contract、真实产品数据边界和旧 URL 兼容策略明确后，才开始 Products schema / adapter 改造。
4. Products 重构完成前，不开始 OEM / ODM 和 Manufacturing 的大规模视觉重做。
5. 任何改代码的阶段都必须增加单元测试和 E2E 筛选/链接回归，并保持 Header、Navigation、Email、WhatsApp、Start a Project 不变。
