# VITHELO Deployment

This document is the project-level source of truth for domain and deployment work. Read it before changing deployment settings, build commands, hosting configuration, or production routing.

Last updated: 2026-09-01

## Confirmed deployment context

- Official domain: `vithelo.com`
- Deployment platform: Hostinger
- Git repository: `https://github.com/wang26098-collab/vithelo.com.git`
- Production branch: `main`
- Root directory in Hostinger: `./`
- Framework preset: `Next.js`
- Node.js version in Hostinger: `20.x`
- Package manager: `pnpm@10.34.5`, pinned in `package.json`
- Lockfile: `pnpm-lock.yaml` must be committed with dependency changes
- Temporary Hostinger domain seen during setup: `violet-ape-534477.hostingersite.com`

## Hostinger build settings

Use the Hostinger Next.js preset with the repository root as the source directory.

Recommended settings:

- Framework preset: `Next.js`
- Branch: `main`
- Root directory: `./`
- Node version: `20.x`
- Install command: Hostinger default is acceptable only if it respects `packageManager: pnpm@10.34.5`
- Build command: `pnpm build`
- Output directory: leave on Hostinger's default for Next.js
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://vithelo.com`

Do not add placeholder secrets or fake provider variables. Contact form submission, CRM, analytics, CMS, commerce, search, payment, and email delivery remain `NOT_CONFIGURED` until the user approves the provider and exact values.

## Known deployment failure

Hostinger previously failed while installing dependencies with this error:

```text
TypeError [ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING]: A dynamic import callback was not specified.
...
/home/u224037251/.cache/node/corepack/v1/pnpm/11.24.0/bin/pnpm.cjs
Node.js v20.19.4
ERROR: Failed to install dependencies
```

Cause: Hostinger/Corepack used cached `pnpm 11.24.0` instead of the project-pinned package manager.

Fix direction:

1. Keep `"packageManager": "pnpm@10.34.5"` in `package.json`.
2. Keep `pnpm-lock.yaml` committed.
3. In Hostinger, make sure the build uses Node `20.x`.
4. If the same error returns, clear Hostinger's build cache or force it to prepare `pnpm@10.34.5` before install.

Do not “fix” this by removing the lockfile, switching to npm without approval, or changing the project to Node 24.

## Local verification before pushing

Run the relevant checks from the repository root on Windows:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

For fast deployment-only checks, at minimum run:

```powershell
pnpm.cmd typecheck
pnpm.cmd build
```

`pnpm.cmd test:e2e` starts its own Next.js server on `127.0.0.1:3100`. Do not start a second server on that port.

## Post-deploy smoke test

After Hostinger finishes deploying from `main`, verify these routes:

- `/`
- `/products`
- `/oem-odm`
- `/insights`
- `/contact`

Check desktop and mobile widths for:

- no blank page or Hostinger error page
- no horizontal overflow
- no clipped hero text
- navigation links work
- Email links resolve to `wang26098@gmail.com`
- WhatsApp links resolve to `+86 182 7366 9556`
- no source-company name or original source logo appears in public copy or imagery

The site does not submit an internal contact form. A visible disabled or missing form is not a deployment failure as long as the two approved direct inquiry channels work.

## Domain and production cautions

The formal domain is `vithelo.com`, but DNS, SSL, redirect, and canonical-domain status must be checked in Hostinger before calling the public production launch complete.

Before launch, confirm:

- `vithelo.com` resolves to the Hostinger deployment
- `https://vithelo.com` has a valid SSL certificate
- `www.vithelo.com` redirects to the chosen canonical domain, or the reverse if the user chooses `www`
- old preview URLs are not used in public materials
- browser title, metadata, sitemap, robots, and canonical URLs match the final domain
- the legal footer contains the confirmed legal English name, public address, and privacy contact; until confirmed, these fields remain `NOT_CONFIGURED`

## Do-not-change deployment rules

- Do not deploy from the frozen HTML preview file. The deployable site is the Next.js app in this repository root.
- Do not edit `next-env.d.ts` by hand.
- Do not commit unrelated UI work together with deployment-only documentation unless the user explicitly asks.
- Do not replace `DEMO_ONLY` or `NOT_CONFIGURED` values with invented production data.
- Do not change package manager or Node major version just to satisfy one hosting build unless the user approves the tradeoff.

## Related

- [Acceptance](acceptance.md)
- [Missing production inputs](missing-production-inputs.md)
- [Visual QA evidence](visual-qa.md)
