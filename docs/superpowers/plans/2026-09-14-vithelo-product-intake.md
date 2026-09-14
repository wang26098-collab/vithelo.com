# VITHELO Product Intake Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一个可复用的多产品 Excel 采集流程，自动生成 Obsidian 审核档案和网站写入预览，并在用户确认一次后把通过校验的产品写入 VITHELO 本地站点。

**Architecture:** Python 工具负责生成模板、读取 Excel、校验来源/许可、生成带源文件哈希的待确认 manifest，并在确认后更新本地 JSON 产品目录和媒体目录。Next.js 只读取经过 Zod 解析的生成目录并与现有 demo 产品合并；个人 skill 负责把自然语言请求路由到 preview/apply 两阶段，不能绕过确认闸门。

**Tech Stack:** Python 3 + openpyxl + Pillow（Codex bundled workspace runtime）、JSON、Markdown/Obsidian、TypeScript 5.9、Zod 4、Next.js 16.3 App Router、React 19、Vitest、Playwright。

---

## File map

### Repository files

- Create `scripts/product-intake/constants.py`: workbook columns, controlled vocabularies, format mapping and public-field rules.
- Create `scripts/product-intake/workbook.py`: template generation and `.xlsx` parsing only.
- Create `scripts/product-intake/validation.py`: normalized records, relationship checks, risk checks and deterministic diagnostics.
- Create `scripts/product-intake/preview.py`: batch id, source hash, Obsidian draft notes, audit summary and manifest creation.
- Create `scripts/product-intake/apply.py`: approval-time preflight, staged media copy, catalog update and archive transition.
- Create `scripts/product-intake/cli.py`: small `template`, `preview` and `apply` command surface.
- Create `tests/product-intake/test_workbook.py`: workbook structure and parsing tests.
- Create `tests/product-intake/test_validation.py`: missing, duplicate, orphan, unknown-format and permission tests.
- Create `tests/product-intake/test_preview_apply.py`: preview immutability, source-hash gate, idempotence and apply tests in temp directories.
- Create `src/content/catalog/products.generated.json`: generated website catalog, initially `[]`.
- Create `src/content/catalog/product-catalog.ts`: Zod parsing and duplicate-safe merge.
- Modify `src/content/schema.ts`: export the product discovery schema and add optional source boundary/detail sections.
- Modify `src/content/demo/vithelo-b2b-site.ts`: merge validated generated records into existing discovery items.
- Modify `src/components/patterns/vithelo-dosage-form-detail.tsx`: render imported product detail sections and source boundary without changing the accepted top-level layout.
- Create `tests/unit/product-catalog.test.ts`: generated catalog contract and duplicate guard.
- Modify `tests/unit/vithelo-products-page.test.tsx`: cover product-specific sections while keeping existing runway behavior.
- Create `tests/e2e/product-catalog.spec.ts`: stable product-detail routing, gallery, CTA and no-overflow assertions without mutating generated content.

### Knowledge-base files

- Create `E:\观澜\02-跨境业务\VITHELO\产品资料\VITHELO产品资料采集模板.xlsx`.
- Create `E:\观澜\02-跨境业务\VITHELO\产品资料\产品资料工作流.md`.
- Create directories `待整理`, `待确认`, `产品档案`, `已入站`.
- Modify `E:\观澜\02-跨境业务\VITHELO\VITHELO品牌.md`: add backlink to the workflow.
- Modify `E:\观澜\00-首页.md`: index the workflow.
- Modify `E:\观澜\99-系统\变更日志.md`: append the dated change entry.

### Personal skill files

- Create `E:\CodexWorkspace\codex-home\skills\vithelo-product-intake\SKILL.md`.
- Create `E:\CodexWorkspace\codex-home\skills\vithelo-product-intake\agents\openai.yaml`.

## Execution constraints

- Preserve all unrelated dirty-worktree files. Before each commit, run `git diff --cached --name-only` and stage only task files.
- Do not edit `next-env.d.ts`.
- Treat the screenshots as layout references only; never import their branding, product copy or images.
- Keep every imported website record at `DEMO_ONLY` with `USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION` until production verification is separately completed.
- The template example row uses `示例不导入`; executing this plan adds no public product and changes no production deployment.
- Writing `E:\观澜` and `E:\CodexWorkspace\codex-home\skills` may require a sandbox approval. Request it only when copying the already-verified staged files to those exact roots.

### Task 1: Define workbook constants and template contract

**Files:**
- Create: `scripts/product-intake/constants.py`
- Create: `scripts/product-intake/workbook.py`
- Create: `tests/product-intake/test_workbook.py`

- [ ] **Step 1: Write the failing workbook contract test**

```python
# tests/product-intake/test_workbook.py
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MODULE_DIR = ROOT / "scripts" / "product-intake"
sys.path.insert(0, str(MODULE_DIR))

from workbook import create_template, read_workbook


class WorkbookContractTest(unittest.TestCase):
    def test_template_has_required_tables_and_ignored_example(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "template.xlsx"
            create_template(target)
            result = read_workbook(target)
            self.assertEqual(result.products, [])
            self.assertEqual(
                result.sheet_names,
                ["填写说明", "产品主表", "产品参数", "图片清单", "宣称与证据"],
            )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run:

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython -m unittest discover -s tests/product-intake -p 'test_workbook.py' -v
```

Expected: FAIL because `workbook` does not exist.

- [ ] **Step 3: Add controlled constants**

```python
# scripts/product-intake/constants.py
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

PUBLIC_PERMISSION = ["可公开", "仅内部", "待确认"]
IMPORT_STATUS = ["正式资料", "示例不导入"]
IMAGE_ROLE = ["主图", "悬浮图", "包装图", "场景图", "细节图", "标签/规格图"]
CLAIM_TYPE = ["产品描述", "成分事实", "规格事实", "功效宣称", "认证/质量", "其他"]
REVIEW_RESULT = ["可采用", "仅作内部参考", "证据不足", "待核验"]

PRODUCT_COLUMNS = [
    "导入状态", "产品编号", "剂型", "英文产品名", "中文内部名", "英文短描述",
    "产品类型", "口味", "配方方向", "净含量", "每包装数量", "包装形式",
    "颜色/外观", "储存条件", "保质期", "定制方向", "目标市场", "公开许可",
    "来源文件", "来源页/位置", "备注",
]
PARAMETER_COLUMNS = [
    "产品编号", "参数名称英文", "参数值英文", "参数名称中文", "参数值中文",
    "排序", "公开许可", "来源文件", "来源页/位置",
]
IMAGE_COLUMNS = [
    "产品编号", "图片文件名", "图片用途", "排序", "英文替代文本",
    "图片来源", "使用许可", "备注",
]
CLAIM_COLUMNS = [
    "产品编号", "候选表述英文", "候选表述中文", "表述类型", "证据文件",
    "证据页/位置", "适用主体与范围", "限制条件", "公开许可", "审核结论",
]
```

- [ ] **Step 4: Implement the minimal template writer and reader**

Implement `create_template(path: Path) -> None` with openpyxl. It must:

```python
def create_template(path: Path) -> None:
    workbook = Workbook()
    workbook.remove(workbook.active)
    for sheet_name in SHEET_NAMES:
        workbook.create_sheet(sheet_name)
    _write_instructions(workbook["填写说明"])
    _write_table(workbook["产品主表"], PRODUCT_COLUMNS, "ProductsTable")
    _write_table(workbook["产品参数"], PARAMETER_COLUMNS, "ParametersTable")
    _write_table(workbook["图片清单"], IMAGE_COLUMNS, "ImagesTable")
    _write_table(workbook["宣称与证据"], CLAIM_COLUMNS, "ClaimsTable")
    _add_example_rows(workbook)
    _add_validations(workbook)
    path.parent.mkdir(parents=True, exist_ok=True)
    workbook.save(path)
```

Define the parser return value without adding a framework dependency:

```python
@dataclass(frozen=True)
class WorkbookData:
    source: Path
    sheet_names: list[str]
    products: list[dict[str, object]]
    parameters: list[dict[str, object]]
    images: list[dict[str, object]]
    claims: list[dict[str, object]]
```

`read_workbook` must verify all five sheet names and exact headers, ignore blank rows and rows where `导入状态 == 示例不导入`, and preserve source cell text without inventing defaults.

- [ ] **Step 5: Run the workbook test**

Run the Step 2 command.

Expected: PASS.

- [ ] **Step 6: Commit the workbook contract**

```powershell
git add -- scripts/product-intake/constants.py scripts/product-intake/workbook.py tests/product-intake/test_workbook.py
git commit -m "feat: define VITHELO product workbook contract"
```

### Task 2: Validate multi-product relationships and publication boundaries

**Files:**
- Create: `scripts/product-intake/validation.py`
- Create: `tests/product-intake/test_validation.py`

- [ ] **Step 1: Write failing validation tests**

The test module must cover these exact outcomes:

```python
def workbook_data(products=None, parameters=None, images=None, claims=None):
    return WorkbookData(
        source=Path("products.xlsx"),
        sheet_names=SHEET_NAMES,
        products=products or [],
        parameters=parameters or [],
        images=images or [],
        claims=claims or [],
    )

def product(product_id, format_name):
    return {
        "导入状态": "正式资料", "产品编号": product_id, "剂型": format_name,
        "英文产品名": "Test Product Direction for Private Label Nutrition",
        "英文短描述": "Source-provided product direction for structured intake testing; formula, packaging and production details remain subject to verification.",
        "公开许可": "可公开", "来源文件": "ACCEPTANCE_FIXTURE",
    }

def parameter(product_id):
    return {"产品编号": product_id, "参数名称英文": "Flavor", "参数值英文": "Test", "排序": 1, "公开许可": "可公开", "来源文件": "ACCEPTANCE_FIXTURE"}

def claim(product_id, permission, review, claim_type="产品描述", evidence="evidence.pdf"):
    return {
        "产品编号": product_id, "候选表述英文": "Acceptance fixture statement",
        "表述类型": claim_type, "证据文件": evidence, "证据页/位置": "p. 1",
        "适用主体与范围": "Acceptance fixture only", "限制条件": "Not a production claim",
        "公开许可": permission, "审核结论": review,
    }

class ValidationTest(unittest.TestCase):
    def test_unknown_format_blocks_only_that_product(self):
        result = validate(workbook_data(products=[product("P-001", "Unknown Form")]))
        self.assertEqual(result.blocked_ids, {"P-001"})
        self.assertEqual(result.diagnostics[0].code, "UNKNOWN_FORMAT")

    def test_orphan_parameter_is_reported(self):
        result = validate(workbook_data(products=[], parameters=[parameter("P-404")]))
        self.assertTrue(any(item.code == "ORPHAN_PRODUCT_REFERENCE" for item in result.diagnostics))

    def test_private_claim_never_enters_public_candidate(self):
        result = validate(workbook_data(
            products=[product("P-001", "Gummies")],
            claims=[claim("P-001", permission="仅内部", review="可采用")],
        ))
        self.assertEqual(result.products[0].public_claims, [])

    def test_high_risk_claim_requires_evidence_location(self):
        result = validate(workbook_data(
            products=[product("P-001", "Gummies")],
            claims=[claim("P-001", permission="可公开", review="可采用", claim_type="功效宣称", evidence="")],
        ))
        self.assertIn("P-001", result.blocked_ids)
        self.assertTrue(any(item.code == "HIGH_RISK_EVIDENCE_REQUIRED" for item in result.diagnostics))
```

- [ ] **Step 2: Run the tests and verify failure**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython -m unittest discover -s tests/product-intake -p 'test_validation.py' -v
```

Expected: FAIL because `validation` does not exist.

- [ ] **Step 3: Implement focused validation types**

```python
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
    public_fields: dict[str, str]
    public_parameters: list[dict[str, str | int]]
    public_images: list[dict[str, str | int]]
    public_claims: list[dict[str, str]]
    internal_fields: dict[str, str]

@dataclass(frozen=True)
class ValidationResult:
    products: list[ValidatedProduct]
    blocked_ids: set[str]
    diagnostics: list[Diagnostic]
```

Implement `validate(data: WorkbookData) -> ValidationResult` with these deterministic rules:

- required product fields: `产品编号`, `剂型`, `英文产品名`, `英文短描述`, `公开许可`, `来源文件`;
- product id regex: `^[A-Za-z0-9][A-Za-z0-9._-]{1,63}$`;
- duplicate id with conflicting cells: `DUPLICATE_PRODUCT_ID` error;
- child row references missing product: `ORPHAN_PRODUCT_REFERENCE` error;
- a product id maps to exactly one format;
- website candidate fields come only from `可公开` product rows;
- website candidate parameters come only from `可公开` rows;
- website candidate images come only from `使用许可 == 可公开` and existing files;
- website candidate claims require both `公开许可 == 可公开` and `审核结论 == 可采用`;
- `功效宣称` and `认证/质量` also require `证据文件`, `证据页/位置`, `适用主体与范围` and `限制条件`;
- internal fields, source company names and Chinese internal names never enter website candidate output.

- [ ] **Step 4: Run validation tests**

Run the Step 2 command.

Expected: all validation tests PASS.

- [ ] **Step 5: Commit validation**

```powershell
git add -- scripts/product-intake/validation.py tests/product-intake/test_validation.py
git commit -m "feat: validate VITHELO product intake data"
```

### Task 3: Generate immutable review batches

**Files:**
- Create: `scripts/product-intake/preview.py`
- Create: `scripts/product-intake/cli.py`
- Create: `tests/product-intake/test_preview_apply.py`

- [ ] **Step 1: Write failing preview tests**

```python
def fixture_workbook(root: Path) -> Path:
    source = root / "products.xlsx"
    create_template(source)
    workbook = load_workbook(source)
    products = workbook["产品主表"]
    products.append([
        "正式资料", "P-001", "Gummies",
        "Test Gummies Product for Private Label Nutrition", "测试软糖",
        "Source-provided product direction for structured intake testing; formula, packaging and production details remain subject to verification.",
        "Dietary supplement", "Test flavor", "", "", "", "Pouch", "", "", "", "", "",
        "可公开", "ACCEPTANCE_FIXTURE", "产品主表 row 3", "",
    ])
    workbook.save(source)
    return source

class PreviewBoundaryTest(unittest.TestCase):
    def test_preview_writes_hash_manifest_and_no_site_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = fixture_workbook(root)
            site_catalog = root / "site" / "src" / "content" / "catalog" / "products.generated.json"
            batch = create_preview(source, root / "待确认", site_catalog)
            manifest = json.loads(batch.manifest_path.read_text(encoding="utf-8"))
            self.assertEqual(manifest["sourceSha256"], sha256_file(source))
            self.assertEqual(manifest["approvalStatus"], "AWAITING_USER_CONFIRMATION")
            self.assertFalse(site_catalog.exists())

    def test_preview_contains_each_valid_product_and_blocked_summary(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            batch = create_preview(fixture_workbook(root), root / "待确认", root / "catalog.json")
            text = batch.review_path.read_text(encoding="utf-8")
            self.assertIn("P-001", text)
            self.assertIn("需要修正", text)
```

- [ ] **Step 2: Run and confirm failure**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython -m unittest discover -s tests/product-intake -p 'test_preview_apply.py' -v
```

Expected: FAIL because `preview` does not exist.

- [ ] **Step 3: Implement preview artifacts**

`create_preview` must create one batch directory named `YYYYMMDD-HHMMSS-<first8hash>` containing:

```text
待确认/<batch-id>/
├── manifest.json
├── 审核摘要.md
└── 产品档案草稿/
    └── <产品编号>-<安全文件名>.md
```

The manifest must contain only normalized data and exact provenance:

```json
{
  "schemaVersion": 1,
  "batchId": "20260914-120000-a1b2c3d4",
  "sourcePath": "E:/观澜/.../待整理/products.xlsx",
  "sourceSha256": "...",
  "approvalStatus": "AWAITING_USER_CONFIRMATION",
  "siteRoot": "E:/CodexWorkspace/Project-12 网站",
  "products": [],
  "blockedProductIds": [],
  "diagnostics": []
}
```

Every draft note must use `type: project`, approved taxonomy tags `[project, cross-border, 独立站, workflow]`, and wikilinks to `[[02-跨境业务/VITHELO/产品资料/产品资料工作流]]` and `[[02-跨境业务/VITHELO/VITHELO品牌]]`.

- [ ] **Step 4: Add the preview CLI**

```python
def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="vithelo-product-intake")
    subcommands = parser.add_subparsers(dest="command", required=True)
    template = subcommands.add_parser("template")
    template.add_argument("--output", type=Path, required=True)
    preview = subcommands.add_parser("preview")
    preview.add_argument("--source", type=Path, required=True)
    preview.add_argument("--knowledge-base", type=Path, required=True)
    preview.add_argument("--site-root", type=Path, required=True)
    apply_parser = subcommands.add_parser("apply")
    apply_parser.add_argument("--manifest", type=Path, required=True)
    apply_parser.add_argument("--confirm-batch", required=True)
    return parser
```

For `preview`, write only beneath `<knowledge-base>/02-跨境业务/VITHELO/产品资料/待确认`. Reject a resolved path outside the configured root.

- [ ] **Step 5: Run preview tests**

Run the Step 2 command.

Expected: preview tests PASS; no website fixture file exists before apply.

- [ ] **Step 6: Commit preview generation**

```powershell
git add -- scripts/product-intake/preview.py scripts/product-intake/cli.py tests/product-intake/test_preview_apply.py
git commit -m "feat: generate VITHELO product review batches"
```

### Task 4: Implement confirmed, idempotent local apply

**Files:**
- Create: `scripts/product-intake/apply.py`
- Modify: `scripts/product-intake/cli.py`
- Modify: `tests/product-intake/test_preview_apply.py`

- [ ] **Step 1: Add failing approval and idempotence tests**

```python
class ApplyBoundaryTest(unittest.TestCase):
    def test_apply_rejects_wrong_batch_confirmation(self):
        with tempfile.TemporaryDirectory() as directory:
            batch = preview_fixture(Path(directory))
            with self.assertRaisesRegex(ApprovalError, "batch id"):
                apply_manifest(batch.manifest_path, "wrong-id")

    def test_apply_rejects_changed_source(self):
        with tempfile.TemporaryDirectory() as directory:
            batch = preview_fixture(Path(directory))
            batch.source_path.write_bytes(batch.source_path.read_bytes() + b"changed")
            with self.assertRaisesRegex(ApprovalError, "source file changed"):
                apply_manifest(batch.manifest_path, batch.batch_id)

    def test_apply_is_idempotent_and_catalog_is_last_public_write(self):
        with tempfile.TemporaryDirectory() as directory:
            batch = preview_fixture(Path(directory))
            first = apply_manifest(batch.manifest_path, batch.batch_id)
            second = apply_manifest(batch.manifest_path, batch.batch_id)
            self.assertEqual(first.catalog_sha256, second.catalog_sha256)
            catalog = json.loads(first.catalog_path.read_text(encoding="utf-8"))
            self.assertEqual(catalog[0]["id"], "P-001")
```

Define the shared apply fixture in the same test module:

```python
def preview_fixture(root: Path):
    source = fixture_workbook(root)
    pending = root / "knowledge-base" / "02-跨境业务" / "VITHELO" / "产品资料" / "待确认"
    catalog = root / "site" / "src" / "content" / "catalog" / "products.generated.json"
    return create_preview(source, pending, catalog)
```

Use only the Python standard-library `unittest`; do not add pytest as a dependency.

- [ ] **Step 2: Run and verify failure**

Run the Task 3 Step 2 command.

Expected: FAIL because apply behavior is missing.

- [ ] **Step 3: Implement apply preflight and staging**

`apply_manifest(manifest_path, confirm_batch)` must:

1. Resolve and verify manifest, source, knowledge-base and site paths are within their configured roots.
2. Require `confirm_batch == manifest.batchId` and `approvalStatus == AWAITING_USER_CONFIRMATION`.
3. Recompute the source SHA-256 and reject any change after preview.
4. Reject all blocked product ids; allow an explicit manifest subset only when created during preview.
5. Load the current generated catalog and reject id/format conflicts.
6. Stage product notes, media and the new catalog inside a unique temporary directory.
7. Copy approved media first, write product notes second, and atomically replace `products.generated.json` last with `os.replace`.
8. Mark the batch manifest `APPLIED_LOCAL` with timestamp and output hashes.
9. Move the source Excel into `已入站/<batch-id>/` only after catalog replacement; if the source already resides there, leave it unchanged.

Generated website records must use this shape:

```json
{
  "id": "P-001",
  "formatSlug": "gummies",
  "formatName": "Gummies",
  "title": "Example Gummies Product for Private Label Nutrition",
  "descriptor": "Source-provided private-label product direction for local review; formula, packaging and production specifications remain pending production verification.",
  "dataStatus": "DEMO_ONLY",
  "sourceBoundary": "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION",
  "media": {
    "default": {"status": "DEMO_ONLY", "src": "/media/products/P-001/main.webp", "width": 1200, "height": 1200, "alt": "VITHELO Example Product package"},
    "hover": {"status": "DEMO_ONLY", "src": "/media/products/P-001/detail.webp", "width": 1200, "height": 1200, "alt": ""}
  },
  "gallery": [],
  "parameters": [],
  "detailSections": []
}
```

If no approved image exists, omit `media` and `gallery`; the existing format fallback remains active. Do not generate an alt value from claims.

- [ ] **Step 4: Connect CLI apply to the exact confirmation token**

```python
if args.command == "apply":
    result = apply_manifest(args.manifest, args.confirm_batch)
    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
```

The CLI must not offer `--yes`, wildcard confirmation or an environment-variable bypass.

- [ ] **Step 5: Run all Python tests**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython -m unittest discover -s tests/product-intake -p 'test_*.py' -v
```

Expected: all tests PASS.

- [ ] **Step 6: Commit confirmed apply**

```powershell
git add -- scripts/product-intake/apply.py scripts/product-intake/cli.py tests/product-intake/test_preview_apply.py
git commit -m "feat: apply approved product intake batches locally"
```

### Task 5: Add the generated product catalog boundary

**Files:**
- Create: `src/content/catalog/products.generated.json`
- Create: `src/content/catalog/product-catalog.ts`
- Modify: `src/content/schema.ts`
- Create: `tests/unit/product-catalog.test.ts`

- [ ] **Step 1: Write the failing catalog tests**

```ts
import { describe, expect, it } from "vitest";
import { mergeProductCatalog, parseProductCatalog } from "@/content/catalog/product-catalog";

function validCatalogItem(id: string, formatSlug: "gummies" | "softgels") {
  return {
    id,
    formatSlug,
    formatName: formatSlug === "gummies" ? "Gummies" : "Softgels",
    title: "Test Product Direction for Private Label Nutrition",
    descriptor: "Source-provided product direction for structured intake testing; formula, packaging and production details remain subject to verification.",
    dataStatus: "DEMO_ONLY" as const,
    sourceBoundary: "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION" as const,
  };
}

describe("product catalog", () => {
  it("accepts an empty generated catalog", () => {
    expect(parseProductCatalog([])).toEqual([]);
  });

  it("rejects a user-provided item without the explicit source boundary", () => {
    expect(() => parseProductCatalog([{ id: "P-001" }])).toThrow();
  });

  it("rejects duplicate ids across base and generated products", () => {
    const item = validCatalogItem("P-001", "gummies");
    expect(() => mergeProductCatalog([item], [item])).toThrow(/duplicate product id/i);
  });

  it("rejects one id mapped to two dosage formats", () => {
    expect(() => mergeProductCatalog(
      [validCatalogItem("P-001", "gummies")],
      [validCatalogItem("P-001", "softgels")],
    )).toThrow(/format conflict/i);
  });
});
```

- [ ] **Step 2: Run the focused test and verify failure**

```powershell
pnpm.cmd test -- tests/unit/product-catalog.test.ts
```

Expected: FAIL because the catalog module does not exist.

- [ ] **Step 3: Export the existing discovery schema and add optional detail fields**

Make the surgical change in `src/content/schema.ts`:

```ts
export const ProductDiscoveryItemSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._-]{1,63}$/),
  formatSlug: ProductFormatSlugSchema,
  formatName: z.string().min(1),
  healthDirections: z.array(HealthDirectionSlugSchema).min(1).optional(),
  title: z.string().min(20).max(120),
  descriptor: z.string().min(80).max(180),
  dataStatus: z.literal("DEMO_ONLY"),
  sourceBoundary: z.literal("USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION").optional(),
  media: ProductDiscoveryMediaSchema.optional(),
  gallery: z.array(DemoMediaSchema).max(4).optional(),
  parameters: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).optional(),
  detailSections: z.array(z.object({
    id: z.enum(["overview", "formula", "ingredients", "customization", "packaging", "evidence"]),
    title: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).optional(),
    items: z.array(z.string().min(1)).optional(),
  }).refine((section) => Boolean(section.paragraphs?.length || section.items?.length), {
    message: "detail section requires paragraphs or items",
  })).max(6).optional(),
});
```

Before applying, preserve any newer constraints already present in the dirty working copy. Do not replace the whole schema file.

- [ ] **Step 4: Implement parse and merge**

```ts
import { z } from "zod";
import generated from "@/content/catalog/products.generated.json";
import { ProductDiscoveryItemSchema } from "@/content/schema";

const GeneratedCatalogSchema = z.array(
  ProductDiscoveryItemSchema.extend({
    sourceBoundary: z.literal("USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION"),
  }),
);

type CatalogItem = z.infer<typeof ProductDiscoveryItemSchema>;

export function parseProductCatalog(value: unknown): CatalogItem[] {
  return GeneratedCatalogSchema.parse(value);
}

export function mergeProductCatalog(base: CatalogItem[], additions: CatalogItem[]): CatalogItem[] {
  const seen = new Map(base.map((item) => [item.id, item.formatSlug]));
  for (const item of additions) {
    const prior = seen.get(item.id);
    if (prior && prior !== item.formatSlug) throw new Error(`Product format conflict: ${item.id}`);
    if (prior) throw new Error(`Duplicate product id: ${item.id}`);
    seen.set(item.id, item.formatSlug);
  }
  return [...base, ...additions];
}

export const generatedProductCatalog = parseProductCatalog(generated);
```

Initialize `products.generated.json` as:

```json
[]
```

- [ ] **Step 5: Run tests and typecheck**

```powershell
pnpm.cmd test -- tests/unit/product-catalog.test.ts
pnpm.cmd typecheck
```

Expected: both commands exit 0.

- [ ] **Step 6: Commit the catalog boundary**

```powershell
git add -- src/content/catalog/products.generated.json src/content/catalog/product-catalog.ts src/content/schema.ts tests/unit/product-catalog.test.ts
git commit -m "feat: add validated generated product catalog"
```

### Task 6: Merge generated products and render product-specific details

**Files:**
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `src/components/patterns/vithelo-dosage-form-detail.tsx`
- Modify: `tests/unit/vithelo-products-page.test.tsx`
- Create: `tests/e2e/product-catalog.spec.ts`

- [ ] **Step 1: Add failing unit coverage for imported detail sections**

```tsx
it("renders approved product-specific disclosure sections", () => {
  const product = {
    ...vitheloB2BProductsPage.discovery.items[0],
    sourceBoundary: "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION" as const,
    detailSections: [{
      id: "ingredients" as const,
      title: "Ingredients",
      items: ["Source-provided ingredient statement"],
    }],
  };
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={product} />);
  expect(screen.getByText(/pending production verification/i)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Ingredients" }));
  expect(screen.getByText("Source-provided ingredient statement")).toBeVisible();
});
```

- [ ] **Step 2: Run the focused test and verify failure**

```powershell
pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx
```

Expected: FAIL because dynamic sections are not rendered.

- [ ] **Step 3: Merge the generated catalog at the content boundary**

In `src/content/demo/vithelo-b2b-site.ts`, import `generatedProductCatalog` and `mergeProductCatalog`, then change only the discovery items assignment:

```ts
items: mergeProductCatalog([...discoveryMatrix], generatedProductCatalog),
```

Do not alter the existing eight filters, ten demo items per filter, homepage or route structure.

- [ ] **Step 4: Render dynamic disclosures with the existing interaction**

In `VitheloDosageFormDetail`, derive sections:

```tsx
const detailSections = product?.detailSections ?? [
  { id: "overview", title: "Functional features", paragraphs: [`${format.name} projects can align formula, sensory direction, format choice and packaging in one development brief. Production inputs remain DEMO_ONLY until verified.`] },
  { id: "customization", title: "Customization options", items: format.customization },
  { id: "packaging", title: "Packaging direction", paragraphs: [`${format.packaging}. Production inputs remain DEMO_ONLY until verified.`] },
];
```

Render each section with the existing `formatDisclosure` button, `aria-expanded`, single-open-panel state, paragraphs and list items. When `sourceBoundary` exists, render:

```tsx
<p className={styles.formatSourceBoundary} role="note">
  Source-provided specifications · pending production verification.
</p>
```

Keep the gallery, quote CTA, breadcrumb, keyboard behavior and CSS geometry unchanged unless the new note needs a small token-based spacing rule in the existing module.

- [ ] **Step 5: Add focused E2E route coverage**

The E2E test must use an existing stable demo product id to verify the shared route/gallery contract without mutating the generated catalog during a running Next.js server:

```ts
await page.goto("/products/gummies?product=gummies-concept-01");
await expect(page.getByRole("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
await expect(page.getByTestId("format-gallery-image")).toBeVisible();
await expect(page.getByRole("link", { name: /get a free quote/i })).toHaveAttribute("href", "/contact");
```

Also assert `document.documentElement.scrollWidth <= clientWidth + 1` at desktop and mobile test projects. Imported source-boundary and custom-section behavior remains covered by the unit test in Step 1; the temporary acceptance apply in Task 10 proves generated-catalog output without contaminating a live E2E server.

- [ ] **Step 6: Run focused verification**

```powershell
pnpm.cmd test -- tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx
pnpm.cmd typecheck
pnpm.cmd exec eslint src/content/catalog/product-catalog.ts src/content/schema.ts src/content/demo/vithelo-b2b-site.ts src/components/patterns/vithelo-dosage-form-detail.tsx tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the website integration**

```powershell
git add -- src/content/demo/vithelo-b2b-site.ts src/components/patterns/vithelo-dosage-form-detail.tsx tests/unit/vithelo-products-page.test.tsx tests/e2e/product-catalog.spec.ts
git commit -m "feat: render approved product catalog details"
```

### Task 7: Generate and visually verify the Excel template

**Files:**
- Modify: `scripts/product-intake/workbook.py` only if visual verification finds a defect.
- Create outside repository: `E:\观澜\02-跨境业务\VITHELO\产品资料\VITHELO产品资料采集模板.xlsx`.

- [ ] **Step 1: Generate into a safe repository staging directory**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython scripts/product-intake/cli.py template --output 'tmp/product-intake/VITHELO产品资料采集模板.xlsx'
```

Expected: one `.xlsx` file is created; no knowledge-base file changes yet.

- [ ] **Step 2: Verify workbook structure programmatically**

Use openpyxl to reopen the generated file and assert:

- five sheets in the specified order;
- one Excel Table on each business sheet;
- frozen header rows and filters;
- data validation ranges cover at least rows 2 through 1000;
- the example product is marked `示例不导入`;
- no formulas, external links or macros.

Expected: all assertions PASS.

- [ ] **Step 3: Render and inspect the workbook with the spreadsheet skill**

Open each sheet preview and verify Chinese text, column widths, wrapped instructions, header contrast, frozen panes and validation hints. If defects exist, change only `workbook.py`, regenerate and repeat Step 2.

- [ ] **Step 4: Copy the verified workbook to the exact knowledge-base path**

Resolve both source and destination, verify the destination begins with `E:\观澜\02-跨境业务\VITHELO\产品资料\`, then use `Copy-Item -LiteralPath`. Do not overwrite a non-template user workbook.

- [ ] **Step 5: Reopen the copied workbook and compare SHA-256**

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'tmp\product-intake\VITHELO产品资料采集模板.xlsx'
Get-FileHash -Algorithm SHA256 -LiteralPath 'E:\观澜\02-跨境业务\VITHELO\产品资料\VITHELO产品资料采集模板.xlsx'
```

Expected: hashes match.

### Task 8: Create the Obsidian workflow and directory structure

**Files:**
- Create: `E:\观澜\02-跨境业务\VITHELO\产品资料\产品资料工作流.md`
- Create directories: `待整理`, `待确认`, `产品档案`, `已入站`
- Modify: `E:\观澜\02-跨境业务\VITHELO\VITHELO品牌.md`
- Modify: `E:\观澜\00-首页.md`
- Modify: `E:\观澜\99-系统\变更日志.md`

- [ ] **Step 1: Stage all Markdown edits under `tmp/product-intake/knowledge-base`**

The workflow frontmatter must be:

```yaml
---
title: VITHELO 产品资料工作流
created: 2026-09-14
updated: 2026-09-14
type: project
tags: [project, cross-border, 独立站, workflow, automation, template]
sources: []
confidence: high
---
```

The note must explain:

- where to place the Excel and companion image directory;
- the five workbook sheets and stable product id rule;
- the `待整理 → 待确认 → 产品档案/已入站` state flow;
- the exact phrases “整理这份 VITHELO 产品表” and “确认写入批次 <batch-id>”;
- that confirmation writes only to the local site and does not push or deploy;
- the evidence and permission boundaries;
- wikilinks to `[[02-跨境业务/VITHELO/VITHELO品牌]]` and `[[00-首页]]`.

- [ ] **Step 2: Add reciprocal links and dated log entry**

Add one link from `VITHELO品牌.md` to `[[02-跨境业务/VITHELO/产品资料/产品资料工作流]]`, add the workflow under the VITHELO heading in `00-首页.md`, and append:

```markdown
## [2026-09-14] create | VITHELO 产品资料采集与本地入站流程
- 新增多产品 Excel 模板、待确认审批流程和本地站点写入规范。
- 入口：[[02-跨境业务/VITHELO/产品资料/产品资料工作流]]
- 关联：[[02-跨境业务/VITHELO/VITHELO品牌]]
```

- [ ] **Step 3: Copy staged files and create exact directories**

Before copying, resolve every destination and assert it remains under `E:\观澜`. Use `New-Item -ItemType Directory` for missing directories and `Copy-Item -LiteralPath` for verified staged Markdown. Preserve unrelated knowledge-base content.

- [ ] **Step 4: Run a knowledge-base lint**

Check every new/modified Markdown page for frontmatter, valid taxonomy tags, at least two wikilinks and reciprocal links. Search the vault to ensure the workflow appears once in `00-首页.md` and once in the changelog entry.

Expected: no orphan page, no broken new wikilink, no duplicate index entry.

### Task 9: Create and validate the reusable Codex skill

**Files:**
- Create: `E:\CodexWorkspace\codex-home\skills\vithelo-product-intake\SKILL.md`
- Create: `E:\CodexWorkspace\codex-home\skills\vithelo-product-intake\agents\openai.yaml`

- [ ] **Step 1: Initialize the skill in a workspace staging directory**

Use the skill-creator initializer for `vithelo-product-intake` with no unused resources. The skill body must be narrow and include:

```yaml
---
name: vithelo-product-intake
description: Organize multi-product Excel files into VITHELO Obsidian product records, generate a review preview, and apply an explicitly confirmed batch to the local VITHELO website. Use when the user asks to整理、导入、更新或本地写入 VITHELO 产品表；do not use for deployment or unrelated spreadsheets.
---
```

Required workflow instructions:

1. Read `E:\观澜\02-跨境业务\VITHELO\产品资料\产品资料工作流.md` and current site governance before acting.
2. For a new or changed workbook, run CLI `preview` only.
3. Show batch id, eligible products, blocked products, high-risk claims, images and exact website destinations.
4. Ask for the exact confirmation `确认写入批次 <batch-id>`.
5. Run `apply` only when the current user message contains that exact batch id and the manifest hash still matches.
6. After apply, run Python tests, focused Vitest, typecheck and targeted ESLint; then start/open a local preview.
7. Never push GitHub, deploy Hostinger, infer missing claims, expose supplier identity or reuse confirmation for a changed source.

- [ ] **Step 2: Generate concise UI metadata**

`agents/openai.yaml` must identify the workflow without claiming deployment:

```yaml
interface:
  display_name: "VITHELO 产品资料入站"
  short_description: "整理多产品 Excel，确认后写入本地 VITHELO 网站"
  default_prompt: "整理这份 VITHELO 产品表，先生成待确认预览。"
```

Keep implicit invocation enabled so future natural-language product-intake requests can select the skill.

- [ ] **Step 3: Validate the staged skill**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython 'E:\CodexWorkspace\codex-home\skills\.system\skill-creator\scripts\quick_validate.py' 'tmp\product-intake\skill\vithelo-product-intake'
```

Expected: validation succeeds with no placeholder or metadata errors.

- [ ] **Step 4: Copy to the standard skill root and validate again**

Copy only to `E:\CodexWorkspace\codex-home\skills\vithelo-product-intake`. Do not create a duplicate project-local skill. Run `quick_validate.py` on the installed path.

- [ ] **Step 5: Update the workspace skill index**

Add `vithelo-product-intake` to `E:\CodexWorkspace\skills-enabled.json` and `E:\CodexWorkspace\技能引用索引.md` only after validation. Preserve JSON ordering style and existing entries.

### Task 10: Exercise the complete preview/confirm/apply boundary safely

**Files:**
- Temporary only: `tmp/product-intake/acceptance/**`
- No persistent product catalog additions.

- [ ] **Step 1: Create a three-product acceptance workbook**

Use the generated template to create:

- `TEST-GUM-001`: valid Gummies product with public parameters and two licensed local images;
- `TEST-CAP-001`: valid Hard Capsules product with no image, testing the format fallback;
- `TEST-BLOCK-001`: unknown format and an evidence-less efficacy claim, expected to be blocked.

All names must begin `TEST` and all source values must say `ACCEPTANCE_FIXTURE`; no real marketing claims.

- [ ] **Step 2: Run preview and prove the site is unchanged**

```powershell
$before = Get-FileHash -Algorithm SHA256 -LiteralPath 'src\content\catalog\products.generated.json'
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython scripts/product-intake/cli.py preview --source 'tmp/product-intake/acceptance/products.xlsx' --knowledge-base 'tmp/product-intake/acceptance/kb' --site-root 'E:\CodexWorkspace\Project-12 网站'
$after = Get-FileHash -Algorithm SHA256 -LiteralPath 'src\content\catalog\products.generated.json'
if ($before.Hash -ne $after.Hash) { throw 'Preview changed the site catalog.' }
```

Expected: two eligible products, one blocked product, identical before/after hash.

- [ ] **Step 3: Prove wrong confirmation and changed source are rejected**

Run `apply` with a wrong batch id and expect a non-zero exit. Copy and mutate the source fixture, run apply against that manifest and expect `source file changed`. Restore the fixture by regenerating it, not by overwriting user data.

- [ ] **Step 4: Apply in a temporary site fixture**

Point the manifest at a temporary site root containing only `src/content/catalog/products.generated.json` and `public/media/products`. Confirm the exact batch id and verify:

- two records written;
- blocked record absent;
- media copied only for `TEST-GUM-001`;
- second apply produces the same catalog hash;
- product notes move to confirmed status;
- source moves to `已入站/<batch-id>` inside the temporary knowledge base.

- [ ] **Step 5: Remove only the temporary acceptance directory**

Resolve the exact absolute target and assert it is under `E:\CodexWorkspace\Project-12 网站\tmp\product-intake\acceptance` before deletion. Do not delete the template, installed skill, knowledge-base files or any user product source.

### Task 11: Run final repository verification and open a local preview

**Files:**
- Modify documentation only if observed results differ from recorded facts.

- [ ] **Step 1: Run all product-intake Python tests**

```powershell
$wsPython = 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $wsPython -m unittest discover -s tests/product-intake -p 'test_*.py' -v
```

Expected: all tests PASS.

- [ ] **Step 2: Run focused website tests**

```powershell
pnpm.cmd test -- tests/unit/product-catalog.test.ts tests/unit/product-discovery.test.ts tests/unit/vithelo-products-page.test.tsx
pnpm.cmd typecheck
pnpm.cmd exec eslint src/content/catalog/product-catalog.ts src/content/schema.ts src/content/demo/vithelo-b2b-site.ts src/components/patterns/vithelo-dosage-form-detail.tsx tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx
pnpm.cmd build
```

Expected: all commands exit 0. Do not claim full lint or full E2E green because the repository has pre-existing documented failures outside this scope.

- [ ] **Step 3: Run the focused Playwright spec**

Add the new spec to the existing `scripts/run-e2e.ps1` invocation pattern without starting a second server on port 3100.

Expected: imported-product route, desktop/mobile overflow, gallery and disclosure checks pass.

- [ ] **Step 4: Open the local product pages**

Start the repository dev server on an available port other than 3100 if E2E is running, then open:

- `/products`
- `/products/gummies` after fixture cleanup

Verify the accepted product runway and detail geometry remain intact at 1440×1000 and 390×844. Stop only the server started for this task.

- [ ] **Step 5: Review the final diff and report exact boundaries**

Run:

```powershell
git status --short
git diff --check
git diff --stat HEAD~1..HEAD
```

Report:

- template and workflow absolute paths;
- installed skill path and trigger phrase;
- commands and pass counts;
- any pre-existing unrelated dirty files left untouched;
- confirmation boundary and the explicit fact that GitHub/Hostinger were not changed.

- [ ] **Step 6: Commit remaining scoped changes**

Stage only files listed in this plan. Verify `git diff --cached --name-only`, then:

```powershell
git commit -m "feat: complete VITHELO product intake workflow"
```
