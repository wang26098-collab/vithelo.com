import hashlib
import json
import os
import shutil
import tempfile
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

from preview import INTAKE_RELATIVE, sha256_file


class ApprovalError(ValueError):
    pass


@dataclass(frozen=True)
class ApplyResult:
    batch_id: str
    catalog_path: Path
    catalog_sha256: str
    product_ids: list[str]


def _require_within(path: Path, root: Path, label: str) -> Path:
    resolved = path.resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ApprovalError(f"{label} 超出允许范围。")
    return resolved


def _catalog_hash(path: Path) -> str:
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    return digest


def _clean_website_record(value: dict[str, Any]) -> dict[str, Any]:
    return {key: item for key, item in value.items() if key != "mediaCopies"}


def apply_manifest(manifest_path: Path, confirmed_batch_id: str) -> ApplyResult:
    manifest_path = manifest_path.resolve()
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    batch_id = str(manifest["batchId"])
    if confirmed_batch_id != batch_id:
        raise ApprovalError("确认批次号与待确认批次号不一致。")

    knowledge_base = Path(manifest["knowledgeBaseRoot"]).resolve()
    site_root = Path(manifest["siteRoot"]).resolve()
    _require_within(manifest_path, knowledge_base, "manifest")
    catalog_path = _require_within(
        site_root / "src" / "content" / "catalog" / "products.generated.json",
        site_root,
        "网站目录",
    )

    if manifest.get("approvalStatus") == "APPLIED_LOCAL":
        if not catalog_path.is_file():
            raise ApprovalError("批次已标记写入，但网站产品目录不存在。")
        return ApplyResult(batch_id, catalog_path, _catalog_hash(catalog_path), list(manifest.get("appliedProductIds", [])))
    if manifest.get("approvalStatus") != "AWAITING_USER_CONFIRMATION":
        raise ApprovalError("批次当前不可写入。")

    source = Path(manifest["sourcePath"]).resolve()
    _require_within(source, knowledge_base / INTAKE_RELATIVE, "源 Excel")
    if not source.is_file() or sha256_file(source) != manifest["sourceSha256"]:
        raise ApprovalError("源 Excel 已变化，请重新生成待确认预览。")

    eligible = [item for item in manifest["products"] if item.get("eligible") and item.get("websiteRecord")]
    records = [_clean_website_record(item["websiteRecord"]) for item in eligible]
    for item in eligible:
        for media in item["websiteRecord"].get("mediaCopies", []):
            media_source = Path(media["sourcePath"]).resolve()
            _require_within(media_source, source.parent, "产品图片")
            if not media_source.is_file():
                raise ApprovalError(f"产品图片不存在：{media_source.name}")
            if sha256_file(media_source) != media["sourceSha256"]:
                raise ApprovalError(f"产品图片已变化：{media_source.name}")

    catalog_path.parent.mkdir(parents=True, exist_ok=True)
    current = json.loads(catalog_path.read_text(encoding="utf-8")) if catalog_path.is_file() else []
    by_id = {str(item["id"]): item for item in current}
    order = [str(item["id"]) for item in current]
    for record in records:
        product_id = str(record["id"])
        prior = by_id.get(product_id)
        if prior and prior.get("formatSlug") != record.get("formatSlug"):
            raise ApprovalError(f"产品编号 {product_id} 的剂型与网站现有记录冲突。")
        if product_id not in by_id:
            order.append(product_id)
        by_id[product_id] = record
    merged = [by_id[product_id] for product_id in order]

    for item in eligible:
        product_id = item["productId"]
        media_dir = _require_within(site_root / "public" / "media" / "products" / product_id, site_root, "媒体目录")
        media_dir.mkdir(parents=True, exist_ok=True)
        for media in item["websiteRecord"].get("mediaCopies", []):
            shutil.copy2(media["sourcePath"], media_dir / media["outputName"])

    dossier_dir = _require_within(knowledge_base / INTAKE_RELATIVE / "产品档案", knowledge_base, "产品档案目录")
    dossier_dir.mkdir(parents=True, exist_ok=True)
    for item in eligible:
        note = str(item["noteContent"]).replace("intake_status: 待确认", "intake_status: 已入站")
        (dossier_dir / item["noteFile"]).write_text(note, encoding="utf-8")

    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False, dir=catalog_path.parent, suffix=".json") as handle:
        json.dump(merged, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
        staged_catalog = Path(handle.name)
    os.replace(staged_catalog, catalog_path)

    archive_dir = _require_within(knowledge_base / INTAKE_RELATIVE / "已入站" / batch_id, knowledge_base, "归档目录")
    archive_dir.mkdir(parents=True, exist_ok=True)
    archived_source = archive_dir / source.name
    shutil.move(str(source), archived_source)

    applied_ids = [str(record["id"]) for record in records]
    manifest["approvalStatus"] = "APPLIED_LOCAL"
    manifest["appliedAt"] = datetime.now().isoformat(timespec="seconds")
    manifest["appliedProductIds"] = applied_ids
    manifest["catalogSha256"] = _catalog_hash(catalog_path)
    manifest["archivedSourcePath"] = str(archived_source)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return ApplyResult(batch_id, catalog_path, manifest["catalogSha256"], applied_ids)
