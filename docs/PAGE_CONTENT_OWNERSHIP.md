# VITHELO 页面内容归属表

> 目标：一个主题只有一个主要解释页面；其他页面只保留必要的上下文链接，避免 SEO/GEO 主题竞争和用户迷路。

| Topic | Primary Owner Page | Secondary Reference Page | Forbidden Duplicate Pages | 处理原则 |
| --- | --- | --- | --- | --- |
| Product portfolio / product categories | `/products` | Home、Insights | OEM / ODM、Manufacturing 详细展开 | Products 回答“有哪些产品/剂型” |
| Dosage forms | `/products` 与对应剂型页 | OEM / ODM 简短引用 | Home、Manufacturing 反复完整罗列 | Products 做发现，详情页做匹配 |
| Product applications | `/products` | Insights | OEM / ODM 作为主内容 | 展示产品方向，不展开定制流程 |
| Formula development | `/oem-odm` | 对应剂型页简短引用 | Products、Manufacturing | 配方、口味、原料、调整归项目开发 |
| Dosage form selection | `/oem-odm` | Products 链接 | Products 详细讲决策逻辑 | OEM / ODM 解释为什么这样选 |
| Packaging customization | `/oem-odm` | Products 只展示包装结果 | Products、Manufacturing 详细展开 | 瓶、袋、条包、标签、盒归定制 |
| Sampling / approval | `/oem-odm` | Contact | Products、Insights | 原型、调整、确认归项目路径 |
| Factory / production | `/manufacturing` | Home、OEM / ODM | Products | 生产线、设备、流程和现场证据 |
| Quality control | `/manufacturing` | OEM / ODM | 独立 Quality 页面重复讲述 | 与制造过程一起解释控制点 |
| Certifications / compliance | `/manufacturing` | Contact 仅保留核验提示 | Products、OEM / ODM、About | 只展示经过主体、范围、有效期和授权核验的内容 |
| R&D / testing evidence | `/manufacturing` | OEM / ODM | Products | 真实实验、检查、文件；没有证据就预留 |
| Buyer education | `/insights` 与文章详情 | 所有商业页相关链接 | Products 大段重复教育内容 | 文章回答采购问题 |
| Company identity | `/about` | Home、Manufacturing | Products、OEM / ODM | 只讲 VITHELO 身份与透明度 |
| Project inquiry | `/contact` | 全站 CTA | Products 内嵌完整询盘逻辑 | 保留 Email、WhatsApp、Start a Project |

## 页面职责结论

- Products 重新定义为 Product Portfolio，不再承载 Formula Development、Packaging Customization、Format Decisions 或 OEM Process。
- OEM / ODM 重新定义为从 Product Concept 到 Private Label Launch 的定制项目中心。
- Manufacturing 与 Quality 合并为 Manufacturing 主页面，Quality 作为其中的证据与控制模块；保留 `/quality` 的决定需在后续 URL 兼容方案中单独确认，不在本阶段直接删除。
- Home 只做总览和分流，不重复每个页面的完整解释。
