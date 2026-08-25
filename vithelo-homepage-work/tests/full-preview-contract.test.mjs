import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(here, '..', 'VITHELO_Homepage_FullPreview_V1.html'), 'utf8');
const visibleHtml = html.split('<!-- FOCUSED PREVIEW START -->')[1].split('<!-- FOCUSED PREVIEW END -->')[0];

test('renders the complete eleven-section homepage preview', () => {
  const sectionIds = [
    'hero', 'proof', 'gummy-stage', 'solutions', 'dosage-forms',
    'custom-development', 'manufacturing', 'quality', 'project-runway',
    'company-fit', 'contact',
  ];
  for (const id of sectionIds) assert.match(html, new RegExp(`id="${id}"`));
});

test('contains every approved market direction and dosage format', () => {
  for (const label of [
    'Women’s Wellness', 'Sleep, Stress &amp; Mood', 'Beauty From Within',
    'Gut &amp; Digestive Health', 'Daily Essentials', 'Active Nutrition',
    'Gummies', 'Hard Capsules', 'Softgels', 'Tablets', 'Powders',
    'Functional Gum', 'Liquids', 'Oral Films',
  ]) assert.match(html, new RegExp(label));
});

test('keeps contact data visibly unconfigured', () => {
  assert.match(html, /data-contact-state="NOT_CONFIGURED"/);
  assert.match(html, /Contact details pending approval/);
  assert.doesNotMatch(html, /sales@vithelo|wa\.me\/\d+/i);
});

test('removes the old DTC card labels and platform-logo implications', () => {
  assert.match(html, /class="legacy-preview" hidden/);
  assert.doesNotMatch(visibleHtml, />Featured<|>New<|BG-01|SS-02|EN-03/);
  assert.doesNotMatch(visibleHtml, /amazon-logo|tiktok-logo|shopify-logo|shein-logo/i);
});

test('uses English for all visible homepage content', () => {
  assert.match(visibleHtml, /Market-Led Concepts, Ready to Build\./);
  assert.match(visibleHtml, /Eight Formats\. One Manufacturing System\./);
  assert.doesNotMatch(visibleHtml, /[\u3400-\u9fff]/);
  assert.doesNotMatch(visibleHtml, /United States|U\.S\. market|American market/i);
});

test('renders six market stories and eight single-screen dosage items', () => {
  assert.equal((visibleHtml.match(/class="vp-chapter"/g) || []).length, 6);
  assert.equal((visibleHtml.match(/class="vp-dose"/g) || []).length, 8);
  assert.match(visibleHtml, /class="vp-spectrum dosage-grid"/);
});

test('keeps approved MOQ copy without turning it into a universal promise', () => {
  for (const text of ['500 bottles', '60,000–100,000', '300,000', '100,000', '100 kg', '2 metric tons']) {
    assert.match(visibleHtml, new RegExp(text));
  }
  assert.match(visibleHtml, /Flexible MOQ based on formula and packaging\./);
  assert.match(visibleHtml, /Contact us for MOQ/);
});

test('keeps every active homepage section id unique', () => {
  for (const id of ['gummy-stage', 'solutions', 'dosage-forms', 'custom-development', 'manufacturing', 'quality', 'project-runway', 'company-fit', 'contact']) {
    assert.equal((html.match(new RegExp(`<section\\s+id="${id}"`, 'g')) || []).length, 1, `${id} must be unique`);
  }
});

test('keeps the dosage spectrum in one screen as a four-by-two layout', () => {
  assert.match(html, /class="overbuilt-preview" hidden/);
  assert.match(html, /class="vp-spectrum dosage-grid"/);
  assert.equal((visibleHtml.match(/class="vp-dose"/g) || []).length, 8);
  assert.match(html, /grid-template-columns\s*:\s*repeat\(4\s*,\s*1fr\)/);
});
