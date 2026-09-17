import argparse
import json
from pathlib import Path

from apply import apply_manifest
from preview import create_preview


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="vithelo-product-intake")
    commands = parser.add_subparsers(dest="command", required=True)

    preview = commands.add_parser("preview", help="生成待确认预览，不修改网站")
    preview.add_argument("--source", required=True, type=Path)
    preview.add_argument("--knowledge-base", required=True, type=Path)
    preview.add_argument("--site-root", required=True, type=Path)

    apply_parser = commands.add_parser("apply", help="使用精确批次号写入本地网站")
    apply_parser.add_argument("--manifest", required=True, type=Path)
    apply_parser.add_argument("--confirm-batch", required=True)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if args.command == "preview":
        result = create_preview(args.source, args.knowledge_base, args.site_root)
        print(
            json.dumps(
                {
                    "batchId": result.batch_id,
                    "manifest": str(result.manifest_path),
                    "review": str(result.review_path),
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 0
    result = apply_manifest(args.manifest, args.confirm_batch)
    print(
        json.dumps(
            {
                "batchId": result.batch_id,
                "catalog": str(result.catalog_path),
                "catalogSha256": result.catalog_sha256,
                "productIds": result.product_ids,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
