# VITHELO 首页能力、剂型交互与询盘扩展设计规范

> 状态：用户已确认推荐方案，进入实施。

## 目标

在现有七屏首页中吸收用户提供的三张结构参考：把图 1 融入制造证明、把图 2 融入询盘收口、把图 3 作为询盘屏内部的品牌签名结尾，同时提升剂型交互与 Hero 纵向空间。不得复制参考页的绿色视觉、虚假 `0` 数据、`audited` 表述、无来源增长曲线或未配置联系方式。

## 结构

- 首页仍保持七个一级 section，不新增第八屏。
- 第二屏扩展为全宽编辑式制造证明：主标题、来源说明面板、四项数字账本。
- 第五屏八种剂型仍在同一平衡网格中；悬停与键盘聚焦只增强当前剂型，不改变内容顺序。
- 第七屏整合 Email、WhatsApp、询盘生成字段和品牌签名收尾。
- Hero 增高至约 `88svh`，上限约 `860px`；锁定图片不缩放、不位移、不视差。

## 制造证明

- 标识：`02 / Manufacturing proof`
- 标题：`Manufacturing, measured.`
- 说明：`Source-provided manufacturing history and reach, translated into repeatable format capacity.`
- 账本：`2008 / Manufacturing since`、`50B / Softgels per year`、`5,000+ t / Gummies per year`、`36B / Tablets per year`。
- 辅助说明：`5,000+ clients served across 50+ markets.`
- 边界：`Source: user-provided manufacturing profile. Production verification and public-use approval pending.`
- 不加入年度增长图；缺少逐年数据时，用来源边界面板替代。

## 剂型交互

- 桌面指针 hover 与键盘 `focus-within`：当前单元上移不超过 6px，视觉形态放大约 1.12 倍，当前单元对比度提高；相邻单元只轻微降低至约 0.74，不隐藏。
- 剂型名称本身成为指向 `/products` 的可聚焦链接，保证键盘用户获得同等反馈。
- 触屏设备不依赖 hover，八项保持完整静态可见。
- Reduced Motion 取消位移和放大，只保留颜色、边框和对比度反馈。

## 询盘生成器

- 字段：品牌/公司、剂型、预计数量、主要市场、项目说明。
- 用户输入只保存在当前浏览器组件状态，不写入 localStorage、Cookie、分析或服务器。
- `Prepare Email Inquiry` 生成预填 mailto。
- `Continue on WhatsApp` 生成预填 WhatsApp 文本。
- 保留直接 Email 与 WhatsApp 入口。
- 显示：`Your information is not stored on this website.`
- 不显示提交成功，不伪装成后端表单。

## 品牌签名

- 位于 Contact section 内部，不新增一级 section。
- 使用克制的大型编辑式文字 `Made for what comes next.`，附 `VITHELO · PRIVATE-LABEL NUTRITION MANUFACTURING`。
- 不使用持续动画；进入时仅允许一次短透明度揭示，Reduced Motion 直接显示。

## 方案 3 升级提醒

当网站其他上线项大致完成、准备正式发布时，提醒用户评估真正的站内提交表单。只有以下条件全部明确后才升级：表单接收服务、隐私政策、同意文本、字段数据处理、保存期限、责任人、反垃圾策略、成功/失败状态、通知和 CRM 路由。

## 验收

- 七个一级 section 顺序不变。
- Hero 更高且背景 transform 为 `none`。
- 第二屏无 `NOT_CONFIGURED`，无 `audited`，无虚构增长图。
- 八种剂型全部可见，Oral Films 不被单独放大或孤立。
- Email 与 WhatsApp URL 包含当前填写的信息，且页面声明不存储。
- Reduced Motion、键盘、移动端、44px 目标和无横向溢出继续通过。
