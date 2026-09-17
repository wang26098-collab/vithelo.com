import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MODULE_DIR = ROOT / "scripts" / "product-intake"
sys.path.insert(0, str(MODULE_DIR))

from constants import SHEET_NAMES  # noqa: E402
from validation import validate  # noqa: E402
from workbook import WorkbookData  # noqa: E402


def make_product(product_id: str, format_name: str = "Gummies", permission: str = "可公开") -> dict[str, object]:
    return {
        "导入状态": "正式资料",
        "产品编号": product_id,
        "剂型": format_name,
        "英文产品名": "Test Product Direction for Private Label Nutrition",
        "中文内部名": "内部测试产品",
        "英文短描述": "Source-provided product direction for structured intake testing; formula, packaging and production details remain subject to verification.",
        "产品类型": "Dietary supplement",
        "口味": "Test flavor",
        "配方方向": "",
        "净含量": "",
        "每包装数量": "",
        "包装形式": "Pouch",
        "颜色/外观": "",
        "储存条件": "",
        "保质期": "",
        "定制方向": "",
        "目标市场": "",
        "公开许可": permission,
        "来源文件": "ACCEPTANCE_FIXTURE",
        "来源页/位置": "产品主表 row 2",
        "备注": "Internal only note",
    }


def make_parameter(product_id: str, permission: str = "可公开") -> dict[str, object]:
    return {
        "产品编号": product_id,
        "参数名称英文": "Flavor",
        "参数值英文": "Test flavor",
        "参数名称中文": "口味",
        "参数值中文": "测试口味",
        "排序": 1,
        "公开许可": permission,
        "来源文件": "ACCEPTANCE_FIXTURE",
        "来源页/位置": "产品参数 row 2",
    }


def make_claim(
    product_id: str,
    *,
    permission: str = "可公开",
    review: str = "可采用",
    claim_type: str = "产品描述",
    evidence_file: str = "evidence.pdf",
    evidence_location: str = "p. 1",
) -> dict[str, object]:
    return {
        "产品编号": product_id,
        "候选表述英文": "Acceptance fixture statement",
        "候选表述中文": "验收测试表述",
        "表述类型": claim_type,
        "证据文件": evidence_file,
        "证据页/位置": evidence_location,
        "适用主体与范围": "Acceptance fixture only",
        "限制条件": "Not a production claim",
        "公开许可": permission,
        "审核结论": review,
    }


def make_data(
    source: Path,
    *,
    products: list[dict[str, object]] | None = None,
    parameters: list[dict[str, object]] | None = None,
    images: list[dict[str, object]] | None = None,
    claims: list[dict[str, object]] | None = None,
) -> WorkbookData:
    return WorkbookData(
        source=source,
        sheet_names=SHEET_NAMES,
        products=products or [],
        parameters=parameters or [],
        images=images or [],
        claims=claims or [],
    )


class ValidationTest(unittest.TestCase):
    def test_unknown_format_blocks_only_that_product(self) -> None:
        result = validate(
            make_data(
                Path("products.xlsx"),
                products=[make_product("P-001", "Unknown Form"), make_product("P-002", "Gummies")],
            )
        )

        self.assertEqual(result.blocked_ids, {"P-001"})
        self.assertTrue(any(item.code == "UNKNOWN_FORMAT" and item.product_id == "P-001" for item in result.diagnostics))

    def test_orphan_parameter_is_reported(self) -> None:
        result = validate(
            make_data(
                Path("products.xlsx"),
                products=[make_product("P-001")],
                parameters=[make_parameter("P-404")],
            )
        )

        self.assertTrue(any(item.code == "ORPHAN_PRODUCT_REFERENCE" for item in result.diagnostics))

    def test_private_claim_never_enters_public_candidate(self) -> None:
        result = validate(
            make_data(
                Path("products.xlsx"),
                products=[make_product("P-001")],
                claims=[make_claim("P-001", permission="仅内部")],
            )
        )

        self.assertEqual(result.products[0].public_claims, [])

    def test_high_risk_claim_requires_complete_evidence_location(self) -> None:
        result = validate(
            make_data(
                Path("products.xlsx"),
                products=[make_product("P-001")],
                claims=[
                    make_claim(
                        "P-001",
                        claim_type="功效宣称",
                        evidence_file="",
                        evidence_location="",
                    )
                ],
            )
        )

        self.assertIn("P-001", result.blocked_ids)
        self.assertTrue(any(item.code == "HIGH_RISK_EVIDENCE_REQUIRED" for item in result.diagnostics))

    def test_only_approved_existing_images_enter_public_candidate(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "products.xlsx"
            source.touch()
            (root / "main.png").write_bytes(b"image")
            images = [
                {
                    "产品编号": "P-001",
                    "图片文件名": "main.png",
                    "图片用途": "主图",
                    "排序": 1,
                    "英文替代文本": "VITHELO test package",
                    "图片来源": "User supplied",
                    "使用许可": "可公开",
                    "备注": "",
                },
                {
                    "产品编号": "P-001",
                    "图片文件名": "private.png",
                    "图片用途": "细节图",
                    "排序": 2,
                    "英文替代文本": "Private image",
                    "图片来源": "User supplied",
                    "使用许可": "仅内部",
                    "备注": "",
                },
            ]

            result = validate(make_data(source, products=[make_product("P-001")], images=images))

            self.assertEqual([item["图片文件名"] for item in result.products[0].public_images], ["main.png"])

    def test_public_image_must_stay_in_excel_directory(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source_dir = root / "待整理"
            source_dir.mkdir()
            source = source_dir / "products.xlsx"
            source.touch()
            (root / "outside.png").write_bytes(b"image")
            image = {
                "产品编号": "P-001",
                "图片文件名": "..\\outside.png",
                "图片用途": "主图",
                "排序": 1,
                "英文替代文本": "VITHELO test package",
                "图片来源": "User supplied",
                "使用许可": "可公开",
                "备注": "",
            }

            result = validate(make_data(source, products=[make_product("P-001")], images=[image]))

            self.assertIn("P-001", result.blocked_ids)
            self.assertTrue(any(item.code == "IMAGE_OUTSIDE_SOURCE_DIR" for item in result.diagnostics))


if __name__ == "__main__":
    unittest.main()
