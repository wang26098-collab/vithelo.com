import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal

from constants import (
    CLAIM_TYPES,
    FORMAT_MAP,
    IMAGE_ROLES,
    PUBLIC_PERMISSION,
    REVIEW_RESULTS,
)
from workbook import WorkbookData


PRODUCT_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{1,63}$")
HIGH_RISK_CLAIM_TYPES = {"功效宣称", "认证/质量"}
PUBLIC_PRODUCT_FIELDS = {
    "英文产品名",
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
}
REQUIRED_PRODUCT_FIELDS = {
    "产品编号",
    "剂型",
    "英文产品名",
    "英文短描述",
    "公开许可",
    "来源文件",
}
SUPPORTED_IMAGE_SUFFIXES = {".avif", ".jpg", ".jpeg", ".png", ".webp"}


@dataclass(frozen=True)
class Diagnostic:
    severity: Literal["error", "warning"]
    code: str
    product_id: str | None
    message: str


@dataclass(frozen=True)
class ValidatedProduct:
    product_id: str
    format_slug: str
    format_name: str
    public_fields: dict[str, str]
    public_parameters: list[dict[str, Any]]
    public_images: list[dict[str, Any]]
    public_claims: list[dict[str, str]]
    internal_fields: dict[str, str]


@dataclass(frozen=True)
class ValidationResult:
    products: list[ValidatedProduct]
    blocked_ids: set[str]
    diagnostics: list[Diagnostic]


def _text(value: Any) -> str:
    if value is None:
        return ""
    return str(value).strip()


def _order(value: Any) -> int:
    if isinstance(value, int):
        return value
    if isinstance(value, float) and value.is_integer():
        return int(value)
    try:
        return int(_text(value))
    except ValueError:
        return 9999


def validate(data: WorkbookData) -> ValidationResult:
    diagnostics: list[Diagnostic] = []
    blocked_ids: set[str] = set()
    rows_by_id: dict[str, dict[str, Any]] = {}

    for row in data.products:
        product_id = _text(row.get("产品编号")) or None
        missing = sorted(field for field in REQUIRED_PRODUCT_FIELDS if not _text(row.get(field)))
        if missing:
            diagnostics.append(
                Diagnostic("error", "REQUIRED_PRODUCT_FIELD", product_id, f"缺少必填字段：{', '.join(missing)}")
            )
            if product_id:
                blocked_ids.add(product_id)
            continue
        assert product_id is not None
        if not PRODUCT_ID_PATTERN.fullmatch(product_id):
            diagnostics.append(Diagnostic("error", "INVALID_PRODUCT_ID", product_id, "产品编号格式不正确。"))
            blocked_ids.add(product_id)
        prior = rows_by_id.get(product_id)
        if prior is not None:
            if prior != row:
                diagnostics.append(Diagnostic("error", "DUPLICATE_PRODUCT_ID", product_id, "同一产品编号包含冲突数据。"))
                blocked_ids.add(product_id)
            continue
        rows_by_id[product_id] = row

        format_name = _text(row.get("剂型"))
        if format_name not in FORMAT_MAP:
            diagnostics.append(Diagnostic("error", "UNKNOWN_FORMAT", product_id, f"无法映射剂型：{format_name}"))
            blocked_ids.add(product_id)
        if _text(row.get("公开许可")) not in PUBLIC_PERMISSION:
            diagnostics.append(Diagnostic("error", "INVALID_PUBLIC_PERMISSION", product_id, "产品公开许可值不受支持。"))
            blocked_ids.add(product_id)
        title = _text(row.get("英文产品名"))
        descriptor = _text(row.get("英文短描述"))
        if not 20 <= len(title) <= 120:
            diagnostics.append(Diagnostic("error", "TITLE_LENGTH", product_id, "英文产品名必须为 20–120 个字符。"))
            blocked_ids.add(product_id)
        if not 80 <= len(descriptor) <= 180:
            diagnostics.append(Diagnostic("error", "DESCRIPTOR_LENGTH", product_id, "英文短描述必须为 80–180 个字符。"))
            blocked_ids.add(product_id)

    child_groups: dict[str, dict[str, list[dict[str, Any]]]] = {
        product_id: {"parameters": [], "images": [], "claims": []}
        for product_id in rows_by_id
    }
    for group_name, rows in (
        ("parameters", data.parameters),
        ("images", data.images),
        ("claims", data.claims),
    ):
        for row in rows:
            product_id = _text(row.get("产品编号"))
            if product_id not in rows_by_id:
                diagnostics.append(
                    Diagnostic("error", "ORPHAN_PRODUCT_REFERENCE", product_id or None, f"{group_name} 引用了不存在的产品编号。")
                )
                if product_id:
                    blocked_ids.add(product_id)
                continue
            child_groups[product_id][group_name].append(row)

    products: list[ValidatedProduct] = []
    for product_id, row in rows_by_id.items():
        public_fields = {
            field: _text(row.get(field))
            for field in PUBLIC_PRODUCT_FIELDS
            if _text(row.get(field)) and _text(row.get("公开许可")) == "可公开"
        }
        internal_fields = {
            field: _text(value)
            for field, value in row.items()
            if _text(value) and field not in PUBLIC_PRODUCT_FIELDS
        }

        public_parameters: list[dict[str, Any]] = []
        for parameter in child_groups[product_id]["parameters"]:
            if _text(parameter.get("公开许可")) != "可公开":
                continue
            label = _text(parameter.get("参数名称英文"))
            value = _text(parameter.get("参数值英文"))
            source = _text(parameter.get("来源文件"))
            if not label or not value or not source:
                diagnostics.append(Diagnostic("error", "INVALID_PUBLIC_PARAMETER", product_id, "公开参数缺少英文标签、英文值或来源。"))
                blocked_ids.add(product_id)
                continue
            public_parameters.append({"label": label, "value": value, "order": _order(parameter.get("排序"))})
        public_parameters.sort(key=lambda item: (item["order"], item["label"]))

        public_images: list[dict[str, Any]] = []
        for image in child_groups[product_id]["images"]:
            if _text(image.get("使用许可")) != "可公开":
                continue
            file_name = _text(image.get("图片文件名"))
            role = _text(image.get("图片用途"))
            alt = _text(image.get("英文替代文本"))
            source = _text(image.get("图片来源"))
            source_path = (data.source.parent / file_name).resolve()
            if not source_path.is_relative_to(data.source.parent.resolve()):
                diagnostics.append(Diagnostic("error", "IMAGE_OUTSIDE_SOURCE_DIR", product_id, f"图片不在 Excel 所在目录：{file_name}"))
                blocked_ids.add(product_id)
                continue
            if role not in IMAGE_ROLES:
                diagnostics.append(Diagnostic("error", "UNKNOWN_IMAGE_ROLE", product_id, f"未知图片用途：{role}"))
                blocked_ids.add(product_id)
                continue
            if source_path.suffix.lower() not in SUPPORTED_IMAGE_SUFFIXES or not source_path.is_file():
                diagnostics.append(Diagnostic("error", "IMAGE_NOT_FOUND", product_id, f"找不到支持的图片：{file_name}"))
                blocked_ids.add(product_id)
                continue
            if not alt or not source:
                diagnostics.append(Diagnostic("error", "IMAGE_METADATA_REQUIRED", product_id, f"公开图片缺少英文替代文本或图片来源：{file_name}"))
                blocked_ids.add(product_id)
                continue
            public_images.append(
                {
                    "图片文件名": file_name,
                    "图片用途": role,
                    "排序": _order(image.get("排序")),
                    "英文替代文本": alt,
                    "图片来源": source,
                    "源路径": str(source_path),
                }
            )
        public_images.sort(key=lambda item: (item["排序"], item["图片文件名"]))

        public_claims: list[dict[str, str]] = []
        for claim in child_groups[product_id]["claims"]:
            claim_type = _text(claim.get("表述类型"))
            permission = _text(claim.get("公开许可"))
            review = _text(claim.get("审核结论"))
            if claim_type not in CLAIM_TYPES:
                diagnostics.append(Diagnostic("error", "UNKNOWN_CLAIM_TYPE", product_id, f"未知表述类型：{claim_type}"))
                blocked_ids.add(product_id)
                continue
            if permission not in PUBLIC_PERMISSION or review not in REVIEW_RESULTS:
                diagnostics.append(Diagnostic("error", "INVALID_CLAIM_STATUS", product_id, "表述公开许可或审核结论不受支持。"))
                blocked_ids.add(product_id)
                continue
            if permission != "可公开" or review != "可采用":
                continue
            if claim_type in HIGH_RISK_CLAIM_TYPES:
                required = ["证据文件", "证据页/位置", "适用主体与范围", "限制条件"]
                if any(not _text(claim.get(field)) for field in required):
                    diagnostics.append(Diagnostic("error", "HIGH_RISK_EVIDENCE_REQUIRED", product_id, "高风险表述缺少完整证据位置、范围或限制条件。"))
                    blocked_ids.add(product_id)
                    continue
            public_claims.append(
                {
                    "statement": _text(claim.get("候选表述英文")),
                    "type": claim_type,
                    "evidenceFile": _text(claim.get("证据文件")),
                    "evidenceLocation": _text(claim.get("证据页/位置")),
                    "scope": _text(claim.get("适用主体与范围")),
                    "limitation": _text(claim.get("限制条件")),
                }
            )

        format_name = _text(row.get("剂型"))
        products.append(
            ValidatedProduct(
                product_id=product_id,
                format_slug=FORMAT_MAP.get(format_name, ""),
                format_name=format_name,
                public_fields=public_fields,
                public_parameters=public_parameters,
                public_images=public_images,
                public_claims=public_claims,
                internal_fields=internal_fields,
            )
        )

    return ValidationResult(products, blocked_ids, diagnostics)
