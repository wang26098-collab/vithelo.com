# VITHELO 视觉系统审计

最后更新：2026-09-06

> 目标：检查当前视觉系统是否服务 SEO/GEO 信息层级、证据可信度和 B2B 采购效率。视觉审计不授权修改导航、URL、询盘路径或已锁定 Hero。

## 审计结论

当前视觉系统已经具备 Cold Ivory / Graphite / Titanium、低圆角、细边界、有限动效和证据优先的基础。下一步重点不是再造一套装饰风格，而是把“页面职责 → 证据 → 下一步动作”做成稳定的视觉层级。

主要风险：

- Products 仍有把产品发现、项目判断和包装信息混在一起的历史痕迹。
- Evidence asset 尚未完成脱敏、主体核验和公开授权，不能直接作为公开能力证明。
- 多个页面使用相近的浅色 surface / card 语言，需要用构图和信息密度区分任务，而不是继续加卡片。
- 当前页面与文档存在屏数/剂型数量历史差异，实施时以最新用户指令、`docs/current-status.md` 和已批准单屏规范共同核对，不能靠视觉代码猜测。

## 统一视觉规则审计

| System | 当前基线 | 审计要求 | 状态 |
| --- | --- | --- | --- |
| Typography | precision neo-grotesk，Display / UI / Body 统一 | H1/H2 直接表达采购问题；正文可被抓取，不把事实放进图片 | Keep / verify per page |
| Color | Cold Ivory、Graphite、Titanium、restrained optical light | Neutral 为主；Nutrition 不变成绿色频道 | Pass |
| Grid | token-led container，阅读宽度与表单宽度分离 | 用网格制造层级，不用空洞留白拖长页面 | Verify in visual QA |
| Cards | 低圆角、细边界、少阴影 | 只有需要比较或分组时使用；避免模板化卡片墙 | Reduce duplication |
| Evidence media | 真实生产、产品、R&D、质量画面优先 | 每张图必须对应页面问题；没有就 `IMAGE_REQUIRED` | Gate required |
| Motion | opacity / transform / reveal；CSS 优先 | Hero 静止；Reduced Motion 下事实完整可见 | Pass / regression test |
| Responsive | Desktop / tablet / mobile 分开判断 | 44px 触达、无溢出、CTA 不消失、正文不被隐藏 | Verify per page |
| Performance | responsive images、lazy loading、hero preload | 不增加重动画库、自动播放视频或不必要客户端 JS | Gate required |

## 页面视觉任务

| Page | Visual job | Evidence-led composition | 禁止的视觉捷径 | 当前优先级 |
| --- | --- | --- | --- | --- |
| Home | 品牌定位与信任分流 | Hero + manufacturing proof + concise capability evidence | 空洞大图、重复完整目录、把未核验数字做成事实 | P0 |
| Products | Product Discovery | 可比较的剂型 / 产品实体 / 应用入口 | OEM 流程卡、MOQ 卡、包装定制长文 | P0 |
| OEM / ODM | Project Journey | Step、Buyer Question、Capability、Evidence、Visual 五字段 | SaaS 式无证据流程图、虚构研发照片 | P0 |
| Manufacturing | 现实制造证据 | 生产环境、流程、设备、控制点和来源边界 | 外部工厂招牌、证书 Logo 墙、伪造设备能力 | P0 |
| Quality | 质量证明路径 | 检查、测试、文件和核验方法 | 用 Manufacturing 文案复制页面、把待核验证书当成证明 | P0 |
| About | 身份与透明度 | 公开身份、关系边界和可核验信息 | 暗示未确认主体、地址、客户或规模 | P1 |
| Insights | 单问题教育 | Direct answer、证据来源、相关商业页 | 把文章做成产品目录或重复销售页 | P1 |
| Contact | 项目启动 | What to prepare + Email / WhatsApp / Start a Project | 站内真实提交、未授权 CRM、冗长教育内容 | P0 |

## Evidence 资产闸门

公开引用前必须同时满足：

1. 文件命名描述真实场景，不包含未核验能力、认证、客户或结果结论。
2. 已检查源公司名、原 Logo、地址、二维码、证照编号、设备铭牌、屏幕和人员隐私。
3. 已记录页面、Section、用途、来源和公开状态。
4. Claim 与图片实际能证明的范围一致；图片不能单独证明产能、认证、法规或客户覆盖。
5. 未通过时保留在 `assets/evidence/_needs-review/`，页面使用 `IMAGE_REQUIRED`，不生成替代证据。

## 验收顺序

每次只验收一个页面或一个锁定 Section：

1. 先核对页面核心问题与 H1/H2。
2. 再核对 evidence asset 与 claim boundary。
3. 再核对 CTA 顺序：Hero 高意向、Evidence 后信任转化、产品匹配后项目转化、底部最终转化。
4. 再检查 Desktop / Tablet / Mobile、Reduced Motion、键盘与 44px 目标。
5. 最后跑 lint、typecheck、unit、E2E 和 build；视觉未被用户接受前，不宣称该屏完成。
