import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const homepagePath = resolve(here, '..', 'VITHELO_Homepage_V2.1_footer_scroll_frames.html');
const html = readFileSync(homepagePath, 'utf8');

test('preserves the existing VITHELO homepage baseline', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /VITHELO/);
  assert.match(html, /product-spotlight-wrap/);
  assert.match(html, /final-outro-section/);
  assert.match(html, /footer-reveal-panel/);
});

test('remains a single-file Tailwind and vanilla JavaScript page', () => {
  assert.match(html, /cdn\.tailwindcss\.com/);
  assert.doesNotMatch(html, /react|vue|next\.js/i);
});

test('ships an explicit media requirements manifest', () => {
  assert.equal(existsSync(resolve(here, '..', 'assets', 'README.md')), true);
});

test('states the gummy-led B2B proposition in the hero', () => {
  assert.match(html, /GUMMY-LED NUTRITION OEM \/ ODM/);
  assert.match(html, /Build Your Next Nutrition Product With a Proven Manufacturer\./);
  assert.match(html, /Explore Gummy Manufacturing/);
});

test('renders the four approved proof facts', () => {
  assert.match(html, /Manufacturing experience since[\s\S]*2008/);
  assert.match(html, /Cumulative clients served[\s\S]*5,000\+/);
  assert.match(html, /Countries and markets[\s\S]*50\+/);
  assert.match(html, /Custom gummy MOQ[\s\S]*500[\s\S]*bottles/);
});
