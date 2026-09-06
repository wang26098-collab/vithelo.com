# VITHELO Evidence Asset Library

## 目录

公开候选资产按以下目录管理：

```text
assets/evidence/
├── manufacturing/
├── quality/
├── rd/
├── oem/
├── packaging/
├── products/
├── team/
├── certificates/
└── _needs-review/
```

原始素材继续保存在 `独立站内容/`；证照、企业介绍和未脱敏素材不复制到公开候选目录。

## 命名规则

使用：`主题-场景-对象-序号.ext`

示例：

- `manufacturing-production-line-filling-01.jpg`
- `manufacturing-cleanroom-equipment-01.jpg`
- `rd-formula-development-sample-01.jpg`
- `oem-packaging-selection-bottle-01.jpg`
- `products-gummy-format-sample-01.jpg`

禁止使用 `IMG_001`、微信默认文件名或无法说明内容的名称。命名不得写入未核验能力、认证或客户结论。

## 当前素材审计

| 原文件 | 内部分类 | 公开状态 | 原因/处理 |
| --- | --- | --- | --- |
| `工厂.mp4` | manufacturing / _needs-review | 待筛选 | 逐帧选室内画面；检查招牌、铭牌、人员、屏幕和反光 |
| `微信图片_..._2.jpg` | _needs-review | 禁止公开 | 工厂外立面、招牌和园区信息 |
| `微信图片_..._3.jpg` | manufacturing / _needs-review | 待脱敏 | 生产设备画面含设备品牌标识 |
| `微信图片_..._4.jpg` | manufacturing | 候选 | 管线/设备画面；检查墙面文字与铭牌 |
| `微信图片_..._6.jpg` | manufacturing | 候选 | 洁净空间画面；检查反光与标识 |
| `微信图片_..._7.jpg` | manufacturing | 候选 | 室内通道画面；检查门牌、标识与反光 |
| `微信图片_..._8.jpg` | manufacturing / rd | 候选 | 室内设备与人员画面；检查人员和设备信息 |
| `微信图片_..._10.jpg` | certificates | 禁止公开 | 公司名、证照内容和证书信息 |
| `微信图片_..._11.jpg` | certificates | 禁止公开 | 公司名、地址、注册号、证书号和有效期 |
| `森酷企业介绍(2).pdf` | _needs-review / certificates | 禁止公开 | 原 logo、公司名、外部厂房、证照和未核验数据 |
| `起订量.png` | products / oem / _needs-review | 待核验 | 含 MOQ、中文营销文案和产品/服务信息，不能直接作为公开承诺 |

## 2026-09-06 页面匹配矩阵

以下是当前 `assets/evidence/` 候选副本的内部匹配建议。`_needs-review` 不是公开可用状态；在完成脱敏、来源核对、主体确认和公开授权前，不得被组件直接引用。

| 候选文件 | 主要页面 | 可回答的问题 | 当前动作 |
| --- | --- | --- | --- |
| `manufacturing-cleanroom-corridor-01.jpg` | Manufacturing | 是否有可展示的室内洁净空间场景？ | Keep in review；检查门牌、反光和设备信息 |
| `manufacturing-cleanroom-view-01.jpg` | Manufacturing | 生产空间的环境如何呈现？ | Keep in review；确认不含源品牌或可识别地址 |
| `manufacturing-equipment-filling-line-01.jpg` | Manufacturing | 是否有真实设备/生产线画面？ | Keep in review；检查设备铭牌和品牌标识 |
| `manufacturing-process-piping-equipment-01.jpg` | Manufacturing | 是否能说明工艺设备场景？ | Keep in review；不得从图片推导产能或认证 |
| `manufacturing-production-operation-01.jpg` | Manufacturing / Quality | 是否有人员操作或过程检查画面？ | Keep in review；检查人员身份、文件和屏幕 |
| `oem-moq-reference-needs-review.png` | OEM / ODM 内部参考 | 原始资料是否包含 MOQ 或项目约束？ | 不公开；只进入业务核验队列 |

## IMAGE_REQUIRED 清单

当前没有足够证据支持以下公开页面资产，先保留缺失状态：

| Page | Section | Missing Image | Purpose | Recommended Shot | Priority |
| --- | --- | --- | --- | --- | --- |
| Products | Product discovery | 真实产品方向与九种剂型代表图 | 帮采购商识别可生产的产品类型 | 无品牌、无虚构包装的剂型/产品实拍，1:1 或 4:5 | P0 |
| Products | Functional applications | 六个功能方向的真实产品关联图 | 支持 benefit taxonomy 的可视化发现 | 按已核验产品方向提供产品或包装细节，不用功效场景暗示 | P1 |
| OEM / ODM | Formula development | 真实研发/配方样品图 | 说明开发阶段存在的实际工作 | 实验室桌面、样品、记录局部，清除敏感信息 | P0 |
| OEM / ODM | Sampling | 样品审核或调整场景 | 说明 prototype → review → adjustment | 无客户信息的样品排列或审核画面 | P1 |
| Manufacturing | Production process | 可公开的生产流程图 | 证明页面所述流程有对应现场 | 室内生产步骤，16:10 或 3:2，无标识 | P0 |
| Quality | Document review | 可公开的质量文件/检查场景 | 说明证据如何被核验 | 不露编号、地址、公司名的文件审核局部 | P1 |

## IMAGE_REQUIRED 机制

没有合适图片时，页面保留以下内部记录，不生成假图：

```text
IMAGE_REQUIRED
Page: Manufacturing
Section: Production process
Purpose: Show the real production step
Recommended shot: Indoor process scene without signage or identifiable documents
Ratio: 16:10 or 3:2
Priority: High
```

## 发布前检查

- [ ] 文件名、alt、caption 只出现 VITHELO 和已核验描述。
- [ ] 不含源公司名、原 logo、外部招牌、地址、二维码、证照编号、注册号或人员隐私。
- [ ] 图片确实回答页面问题，不只是填充空白。
- [ ] 页面事实与图片来源、范围和限制一致。
- [ ] 通过桌面、Tablet、Mobile 裁切检查和 Reduced Motion 检查。
