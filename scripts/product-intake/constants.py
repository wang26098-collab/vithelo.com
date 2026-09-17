SHEET_NAMES = ["填写说明", "产品主表", "产品参数", "图片清单", "宣称与证据"]

FORMAT_MAP = {
    "Gummies": "gummies",
    "Jelly": "jelly",
    "Hard Capsules": "hard-capsules",
    "Tablets": "tablets",
    "Powders": "powders",
    "Softgels": "softgels",
    "Liquids": "liquids",
    "Oral Films": "oral-films",
}

FORMAT_NAMES = {value: key for key, value in FORMAT_MAP.items()}
PUBLIC_PERMISSION = ["可公开", "仅内部", "待确认"]
IMPORT_STATUS = ["正式资料", "示例不导入"]
IMAGE_ROLES = ["主图", "悬浮图", "包装图", "场景图", "细节图", "标签/规格图"]
CLAIM_TYPES = ["产品描述", "成分事实", "规格事实", "功效宣称", "认证/质量", "其他"]
REVIEW_RESULTS = ["可采用", "仅作内部参考", "证据不足", "待核验"]

PRODUCT_COLUMNS = [
    "导入状态",
    "产品编号",
    "剂型",
    "英文产品名",
    "中文内部名",
    "英文短描述",
    "产品类型",
    "口味",
    "配方方向",
    "净含量",
    "每包装数量",
    "包装形式",
    "颜色/外观",
    "储存条件",
    "保质期",
    "定制方向",
    "目标市场",
    "公开许可",
    "来源文件",
    "来源页/位置",
    "备注",
]

PARAMETER_COLUMNS = [
    "产品编号",
    "参数名称英文",
    "参数值英文",
    "参数名称中文",
    "参数值中文",
    "排序",
    "公开许可",
    "来源文件",
    "来源页/位置",
]

IMAGE_COLUMNS = [
    "产品编号",
    "图片文件名",
    "图片用途",
    "排序",
    "英文替代文本",
    "图片来源",
    "使用许可",
    "备注",
]

CLAIM_COLUMNS = [
    "产品编号",
    "候选表述英文",
    "候选表述中文",
    "表述类型",
    "证据文件",
    "证据页/位置",
    "适用主体与范围",
    "限制条件",
    "公开许可",
    "审核结论",
]

TABLE_COLUMNS = {
    "产品主表": PRODUCT_COLUMNS,
    "产品参数": PARAMETER_COLUMNS,
    "图片清单": IMAGE_COLUMNS,
    "宣称与证据": CLAIM_COLUMNS,
}
