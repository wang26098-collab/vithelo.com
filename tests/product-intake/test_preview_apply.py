import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
MODULE_DIR = ROOT / "scripts" / "product-intake"
TEST_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(MODULE_DIR))
sys.path.insert(0, str(TEST_DIR))

from apply import ApprovalError, apply_manifest  # noqa: E402
from preview import create_preview  # noqa: E402
from test_workbook import make_workbook  # noqa: E402


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def make_fixture(root: Path):
    knowledge_base = root / "kb"
    intake_root = knowledge_base / "02-跨境业务" / "VITHELO" / "产品资料"
    source_dir = intake_root / "待整理"
    source_dir.mkdir(parents=True)
    source = source_dir / "products.xlsx"
    make_workbook(source)
    Image.new("RGB", (32, 32), "white").save(source_dir / "main.png")
    site_root = root / "site"
    catalog_path = site_root / "src" / "content" / "catalog" / "products.generated.json"
    catalog_path.parent.mkdir(parents=True)
    catalog_path.write_text("[]\n", encoding="utf-8")
    return knowledge_base, source, site_root, catalog_path


class PreviewBoundaryTest(unittest.TestCase):
    def test_preview_writes_manifest_and_does_not_change_site(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            knowledge_base, source, site_root, catalog_path = make_fixture(Path(directory))
            before = sha256(catalog_path)

            batch = create_preview(source, knowledge_base, site_root)
            manifest = json.loads(batch.manifest_path.read_text(encoding="utf-8"))

            self.assertEqual(manifest["sourceSha256"], sha256(source))
            self.assertEqual(manifest["approvalStatus"], "AWAITING_USER_CONFIRMATION")
            self.assertEqual(sha256(catalog_path), before)
            self.assertTrue(batch.review_path.is_file())
            self.assertIn("VIT-GUM-001", batch.review_path.read_text(encoding="utf-8"))


class ApplyBoundaryTest(unittest.TestCase):
    def test_apply_rejects_wrong_batch_confirmation(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            knowledge_base, source, site_root, _ = make_fixture(Path(directory))
            batch = create_preview(source, knowledge_base, site_root)

            with self.assertRaisesRegex(ApprovalError, "批次号"):
                apply_manifest(batch.manifest_path, "wrong-id")

    def test_apply_rejects_changed_source(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            knowledge_base, source, site_root, _ = make_fixture(Path(directory))
            batch = create_preview(source, knowledge_base, site_root)
            source.write_bytes(source.read_bytes() + b"changed")

            with self.assertRaisesRegex(ApprovalError, "源 Excel 已变化"):
                apply_manifest(batch.manifest_path, batch.batch_id)

    def test_apply_rejects_changed_public_image(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            knowledge_base, source, site_root, _ = make_fixture(Path(directory))
            batch = create_preview(source, knowledge_base, site_root)
            Image.new("RGB", (48, 48), "black").save(source.parent / "main.png")

            with self.assertRaisesRegex(ApprovalError, "产品图片已变化"):
                apply_manifest(batch.manifest_path, batch.batch_id)

    def test_apply_writes_catalog_last_and_is_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            knowledge_base, source, site_root, catalog_path = make_fixture(Path(directory))
            batch = create_preview(source, knowledge_base, site_root)

            first = apply_manifest(batch.manifest_path, batch.batch_id)
            second = apply_manifest(batch.manifest_path, batch.batch_id)
            catalog = json.loads(catalog_path.read_text(encoding="utf-8"))

            self.assertEqual(first.catalog_sha256, second.catalog_sha256)
            self.assertEqual([item["id"] for item in catalog], ["VIT-GUM-001", "VIT-CAP-001"])
            self.assertEqual(catalog[0]["formatSlug"], "gummies")
            self.assertEqual(catalog[0]["sourceBoundary"], "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION")
            self.assertTrue((site_root / "public" / "media" / "products" / "VIT-GUM-001" / "main-01.png").is_file())
            self.assertTrue((knowledge_base / "02-跨境业务" / "VITHELO" / "产品资料" / "产品档案").is_dir())
            self.assertTrue((knowledge_base / "02-跨境业务" / "VITHELO" / "产品资料" / "已入站" / batch.batch_id / "products.xlsx").is_file())


if __name__ == "__main__":
    unittest.main()
