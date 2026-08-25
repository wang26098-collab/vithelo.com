import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(resolve(here, '..', '..', 'package.json'), 'utf8'));

test('pins the deployment package manager and supported Node runtime', () => {
  assert.equal(packageJson.packageManager, 'pnpm@10.34.5');
  assert.equal(packageJson.engines?.node, '>=20.9 <21');
});
