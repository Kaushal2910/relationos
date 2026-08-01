// scripts/optimize-assets.mjs
// One-shot asset pipeline for the RelationOS website.
//   1. Converts public/screens/*.png → .webp (quality 82) — ~70% smaller over the wire.
//      Drop your real app screenshots into public/screens as PNGs
//      (discover.png, home.png, wishlist.png, memory.png), then run this —
//      the site references the .webp outputs. Until then, the phone mockup
//      shows its branded wireframe placeholders.
//   2. Generates public/og.png (1200×630) — the social-share card used by og:image.
//   3. Removes public/favicon.png — the site's favicon is an inline SVG data-URI
//      in Layout.astro; the 5 MB PNG was dead weight shipped to every deploy.
//
// Run with:  node scripts/optimize-assets.mjs  (or: npm run optimize)

import { readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SCREENS = join(PUBLIC, 'screens');

const log = (m) => console.log(`\x1b[35m▸\x1b[0m ${m}`);

// 1) Screenshots → WebP -------------------------------------------------------
const pngs = readdirSync(SCREENS).filter((f) => f.endsWith('.png'));
for (const f of pngs) {
  const src = join(SCREENS, f);
  const out = join(SCREENS, f.replace(/\.png$/, '.webp'));
  const info = await sharp(src).webp({ quality: 82 }).toFile(out);
  log(`screens/${f.replace(/\.png$/, '')}.webp ${(info.size /1024).toFixed(0)} KB`);
}

// 2) og.png — 1200×630 brand card ----------------------------------------------
const HEART =
  'M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.4 5c2 0 3.4 1.1 4.2 2.3l.4.6.4-.6C11.2 6.1 12.6 5 14.6 5 18 5 19.6 8.5 22 11.8 19.5 16.4 12 21 12 21z';
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FDF8F6"/>
      <stop offset="1" stop-color="#FBE3EA"/>
    </linearGradient>
    <radialGradient id="rose" cx="0.88" cy="0" r="0.9">
      <stop offset="0" stop-color="#E4557B" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#E4557B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="violet" cx="0" cy="0.9" r="0.8">
      <stop offset="0" stop-color="#6C5CE7" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#6C5CE7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#rose)"/>
  <rect width="1200" height="630" fill="url(#violet)"/>
  <g transform="translate(88 88)">
    <rect width="96" height="96" rx="26" fill="#E4557B"/>
    <path transform="translate(20 20) scale(2.33)" d="${HEART}" fill="#ffffff"/>
 </g>
  <text x="88" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="104" font-style="italic" fill="#E4557B">Decide. Plan. Remember.</text>
  <text x="88" y="424" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="#22181C">The relationship operating system.</text>
  <text x="88" y="556" font-family="ui-monospace, 'Courier New', monospace" font-size="26" letter-spacing="6" fill="#6E6167">RELATIONOS · MADE IN PUNE</text>
</svg>`;
// og:image stays PNG — social crawlers (Facebook/Twitter) handle PNG/JPEG
// reliably but WebP spottily, and this file is never rendered on the page so
// its format has no Core Web Vitals impact.
const ogInfo = await sharp(Buffer.from(ogSvg)).png().toFile(join(PUBLIC, 'og.png'));
log(`og.png  ${(ogInfo.size / 1024).toFixed(0)} KB`);

// 3) Dead favicon ---------------------------------------------------------------
const fav = join(PUBLIC, 'favicon.png');
try {
  rmSync(fav);
  log('removed public/favicon.png (inline SVG favicon is used instead)');
} catch {
  /* already gone */
}

log('done ✔');
