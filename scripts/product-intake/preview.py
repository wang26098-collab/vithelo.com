import hashlib
import json
import re
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

from PIL import Image

from validation import Diagnostic, ValidatedProduct, validate
from workbook import read_workbook


INTAKE_RELATIVE = Path("02-跨境业务") / "VITHELO" / "产品资料"
SOURCE_BOUNDARY = "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION"


@dataclass(frozen=True)
class PreviewBatch:
    batch_id: str
    batch_dir: Path
    manifest_path: Path
    review_path: Path


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _safe_name(value: str) -> str:
    safe = re.sub(r"[^A-Za-z0-9._-]+", "-", value.strip()).strip("-.")
    return safe[:80] or "product"


def _split_items(value: str) -> list[str]:
    return [item.strip() for item in re.split(r"[;；\n]+", value) if item.strip()]


def _media_record(image: dict[str, Any], product_id: str) -> dict[str, Any]:
    source = Path(str(image["源路径"]))
    with Image.open(source) as opened:
        width, height = opened.size
    role_names = {
        "主图": "main",
        "悬浮图": "hover",
        "包装图": "package",
        "场景图": "scene",
        "细节图": "detail",
        "标签/规格图": "label",
    }
    output_name = f"{role_names[str(image['图片用途'])]}-{int(image['排序']):02d}{source.suffix.lower()}"
    return {
        "status": "DEMO_ONLY",
        "src": f"/media/products/{product_id}/{output_name}",
        "width": width,
        "height": height,
        "alt": str(image["英文替代文本"]),
        "sourcePath": str(source),
        "sourceSha256": sha256_file(source),
        "outputName": output_name,
    }


def _standard_parameters(product: ValidatedProduct) -> list[dict[str, str]]:
    labels = [
        ("产品类型", "Product type"),
        ("口味", "Flavor"),
        ("配方方向", "Formula direction"),
        ("净含量", "Net weight"),
        ("每包装数量", "Quantity"),
        ("包装形式", "Packaging"),
        ("颜色/外观", "Color / appearance"),
        ("储存条件", "Storage"),
        ("保质期", "Shelf life"),
    ]
    parameters = [
        {"label": label, "value": product.public_fields[field]}
        for field, label in labels
        if product.public_fields.get(field)
    ]
    seen = {item["label"].casefold() for item in parameters}
    for item in product.public_parameters:
        label = str(item["label"])
        if label.casefold() not in seen:
            parameters.append({"label": label, "value": str(item["value"])})
            seen.add(label.casefold())
    return parameters


def _detail_sections(product: ValidatedProduct) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []
    formula = product.public_fields.get("配方方向")
    if formula:
        sections.append({"id": "formula", "title": "Formula direction", "paragraphs": [formula]})
    customization = _split_items(product.public_fields.get("定制方向", ""))
    if customization:
        sections.append({"id": "customization", "title": "Customization options", "items": customization})
    packaging_values = [
        product.public_fields.get("包装形式", ""),
        product.public_fields.get("净含量", ""),
        product.public_fields.get("每包装数量", ""),
    ]
    packaging = [value for value in packaging_values if value]
    if packaging:
        sections.append({"id": "packaging", "title": "Packaging direction", "items": packaging})

    ingredient_claims = [item["statement"] for item in product.public_claims if item["type"] == "成分事实"]
    if ingredient_claims:
        sections.append({"id": "ingredients", "title": "Ingredients", "items": ingredient_claims})
    evidence_claims = [item["statement"] for item in product.public_claims if item["type"] != "成分事实"]
    if evidence_claims:
        sections.append({"id": "evidence", "title": "Source-reviewed statements", "items": evidence_claims})
    return sections[:6]


def _website_record(product: ValidatedProduct) -> dict[str, Any]:
    media_items = [_media_record(item, product.product_id) for item in product.public_images]
    visible_media = [{key: value for key, value in item.items() if key not in {"sourcePath", "sourceSha256", "outputName"}} for item in media_items]
    record: dict[str, Any] = {
        "id": product.product_id,
        "formatSlug": product.format_slug,
        "formatName": product.format_name,
        "title": product.public_fields.get("英文产品名", ""),
        "descriptor": product.public_fields.get("英文短描述", ""),
        "dataStatus": "DEMO_ONLY",
        "sourceBoundary": SOURCE_BOUNDARY,
        "parameters": _standard_parameters(product),
        "detailSections": _detail_sections(product),
    }
    if visible_media:
        default = next((item for item, raw in zip(visible_media, product.public_images, strict=True) if raw["图片用途"] == "主图"), visible_media[0])
        hover = next((item for item, raw in zip(visible_media, product.public_images, strict=True) if raw["图片用途"] == "悬浮图"), default)
        record["media"] = {"default": default, "hover": {**hover, "alt": ""}}
        record["gallery"] = [item for item in visible_media if item["src"] not in {default["src"], hover["src"]}][:4]
    record["mediaCopies"] = [
        {"sourcePath": item["sourcePath"], "sourceSha256": item["sourceSha256"], "outputName": item["outputName"]}
        for item in media_items
    ]
    return record


def _product_note(product: ValidatedProduct, eligible: bool) -> str:
    title = product.internal_fields.get("中文内部名") or product.public_fields.get("英文产品名") or product.product_id
    rows = [
        "---",
        f'title: "{title.replace(chr(34), chr(39))}"',
        f"created: {datetime.now().date().isoformat()}",
        f"updated: {datetime.now().date().isoformat()}",
        "type: project",
        "tags: [project, cross-border, 独立站, workflow]",
        "sources: []",
        "confidence: medium",
        f"product_id: {product.product_id}",
        f"intake_status: {'待确认' if eligible else '有阻塞'}",
        "---",
        "",
        f"# {title}",
        "",
        f"- 产品编号：`{product.product_id}`",
        f"- 剂型：{product.format_name} → `{product.format_slug or '未映射'}`",
        f"- 网站候选：{'是' if eligible else '否'}",
        "- 来源边界：用户提供，等待生产核验",
        "",
        "## 网站候选字段",
        "",
    ]
    rows.extend(f"- {key}：{value}" for key, value in product.public_fields.items())
    rows.extend(
        [
            "",
            "## 关联",
            "",
            "- [[02-跨境业务/VITHELO/产品资料/产品资料工作流]]",
            "- [[02-跨境业务/VITHELO/VITHELO品牌]]",
            "",
        ]
    )
    return "\n".join(rows)


def _review_markdown(batch_id: str, source: Path, products: list[dict[str, Any]], diagnostics: list[Diagnostic]) -> str:
    eligible = [item["productId"] for item in products if item["eligible"]]
    blocked = [item["productId"] for item in products if not item["eligible"]]
    lines = [
        "---",
        f'title: "VITHELO 产品资料审核 {batch_id}"',
        f"created: {datetime.now().date().isoformat()}",
        f"updated: {datetime.now().date().isoformat()}",
        "type: project",
        "tags: [project, cross-border, 独立站, workflow]",
        f'sources: ["{source.name}"]',
        "confidence: medium",
        "---",
        "",
        f"# 产品资料审核 {batch_id}",
        "",
        f"- 源文件：`{source}`",
        f"- 可写入产品：{', '.join(eligible) if eligible else '无'}",
        f"- 需要修正：{', '.join(blocked) if blocked else '无'}",
        "- 写入范围：本地独立站，不推送 GitHub，不部署 Hostinger",
        "",
        "## 校验问题",
        "",
    ]
    if diagnostics:
        lines.extend(f"- [{item.severity}] {item.product_id or '未关联'} · {item.code} · {item.message}" for item in diagnostics)
    else:
        lines.append("- 未发现结构或许可问题。")
    lines.extend(
        [
            "",
            "## 确认方式",
            "",
            f"确认写入批次 {batch_id}",
            "",
            "## 关联",
            "",
            "- [[02-跨境业务/VITHELO/产品资料/产品资料工作流]]",
            "- [[02-跨境业务/VITHELO/VITHELO品牌]]",
            "",
        ]
    )
    return "\n".join(lines)


def create_preview(source: Path, knowledge_base: Path, site_root: Path) -> PreviewBatch:
    source = source.resolve()
    knowledge_base = knowledge_base.resolve()
    site_root = site_root.resolve()
    intake_root = (knowledge_base / INTAKE_RELATIVE).resolve()
    pending_root = (intake_root / "待确认").resolve()
    if not pending_root.is_relative_to(knowledge_base):
        raise ValueError("待确认目录超出知识库范围。")

    workbook = read_workbook(source)
    result = validate(workbook)
    source_hash = sha256_file(source)
    batch_id = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-{source_hash[:8]}"
    batch_dir = pending_root / batch_id
    drafts_dir = batch_dir / "产品档案草稿"
    drafts_dir.mkdir(parents=True, exist_ok=False)

    products: list[dict[str, Any]] = []
    for product in result.products:
        eligible = product.product_id not in result.blocked_ids and bool(product.public_fields.get("英文产品名"))
        note_name = f"{product.product_id}-{_safe_name(product.public_fields.get('英文产品名', product.product_id))}.md"
        note_content = _product_note(product, eligible)
        (drafts_dir / note_name).write_text(note_content, encoding="utf-8")
        products.append(
            {
                "productId": product.product_id,
                "eligible": eligible,
                "noteFile": note_name,
                "noteContent": note_content,
                "websiteRecord": _website_record(product) if eligible else None,
            }
        )

    review_path = batch_dir / "审核摘要.md"
    review_path.write_text(_review_markdown(batch_id, source, products, result.diagnostics), encoding="utf-8")
    manifest_path = batch_dir / "manifest.json"
    manifest = {
        "schemaVersion": 1,
        "batchId": batch_id,
        "sourcePath": str(source),
        "sourceSha256": source_hash,
        "approvalStatus": "AWAITING_USER_CONFIRMATION",
        "knowledgeBaseRoot": str(knowledge_base),
        "siteRoot": str(site_root),
        "products": products,
        "blockedProductIds": sorted(result.blocked_ids),
        "diagnostics": [asdict(item) for item in result.diagnostics],
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return PreviewBatch(batch_id, batch_dir, manifest_path, review_path)
