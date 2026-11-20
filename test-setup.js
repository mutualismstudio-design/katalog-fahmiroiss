import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';
import { generateAccountProfile, compileBridgeHtml } from './setup-wizard.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Running test suite for Threads Affiliate setup...');

// 1. Verify panduan-setup-lengkap.md
const guidePath = path.join(__dirname, 'panduan-setup-lengkap.md');
assert(fs.existsSync(guidePath), 'Guide file must exist');
const guideContent = fs.readFileSync(guidePath, 'utf8');

const requiredSections = [
  'Persiapan Akun & Pendaftaran',
  'Optimasi Profil & Bio',
  'Arsitektur Link Funnel',
  '10 Template Konten Siap Pakai',
  'Rencana Jadwal 30 Hari Pertama',
  '#affiliate'
];

requiredSections.forEach(sec => {
  assert(guideContent.includes(sec), `Guide should contain section/keyword: ${sec}`);
});

// 2. Verify strategi-affiliate-tanpa-link.md
const zeroLinkPath = path.join(__dirname, 'strategi-affiliate-tanpa-link.md');
assert(fs.existsSync(zeroLinkPath), 'Zero-link guide must exist');
const zeroLinkContent = fs.readFileSync(zeroLinkPath, 'utf8');

const requiredZeroLinkSections = [
  'Keyword DM Trigger',
  'Call-to-Profile',
  'Voucher Code',
  'Engagement First, Link on Demand',
  '10 Template Postingan Threads "Zero-Link"'
];

requiredZeroLinkSections.forEach(sec => {
  assert(zeroLinkContent.includes(sec), `Zero-link guide should contain: ${sec}`);
});

// 3. Verify storytelling-shopee-playbook.md
const storyPath = path.join(__dirname, 'storytelling-shopee-playbook.md');
assert(fs.existsSync(storyPath), 'Storytelling playbook must exist');
const storyContent = fs.readFileSync(storyPath, 'utf8');

const requiredStorySections = [
  'Anatomi 4 Babak Storytelling Threads',
  'Insiden Pemicu (Hook)',
  '10 Cerita Nyata Siap Posting (Produk Shopee)',
  'Shopee Mall atau Star+',
  'Koleksiku Shopee'
];

requiredStorySections.forEach(sec => {
  assert(storyContent.includes(sec), `Story playbook should contain: ${sec}`);
});

// 4. Verify index.html (Bridge Page)
const htmlPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(htmlPath), 'Bridge page HTML must exist');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(htmlContent.includes('rel="noopener sponsored"'), 'Affiliate links must include rel="noopener sponsored"');
assert(htmlContent.includes('searchInput'), 'Bridge page must have search functionality');
assert(htmlContent.includes('category-pills'), 'Bridge page must have category filters');
assert(htmlContent.includes('Disclosure'), 'Bridge page must include affiliate disclosure');

// 3. Verify setup-wizard generation logic
const testNiches = ['setup', 'home', 'gadget'];
testNiches.forEach(niche => {
  const profile = generateAccountProfile({ niche, affiliateId: 'test123' });
  assert(profile.suggestedHandle, `Handle must be generated for ${niche}`);
  assert(profile.bio.length > 10, `Bio must not be empty for ${niche}`);
  assert(profile.firstPost.charCount <= 500, `First post must stay within Threads 500 limit for ${niche}`);
  assert(profile.catalog.length > 0, `Catalog must have products for ${niche}`);
  assert(profile.catalog[0].affiliateUrl.includes('test123'), 'Affiliate tag must be present in URL');

  const compiledHtml = compileBridgeHtml(profile);
  assert(compiledHtml.includes(profile.niche), 'Compiled HTML must include niche title');
  assert(compiledHtml.includes(profile.suggestedHandle), 'Compiled HTML must include handle');
  assert(compiledHtml.includes('rel="noopener sponsored"'), 'Compiled HTML must retain affiliate rel');
});

console.log('✔ All assertions passed: Documentation, HTML bridge page, and generator wizard verified.');
