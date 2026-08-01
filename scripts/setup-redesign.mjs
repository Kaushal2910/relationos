// scripts/setup-redesign.mjs
// Idempotent setup for the RelationOS website redesign.
//1. Stages the REAL app screenshots (from the v1 Stitch design system) into
//     /public/screens so the phone-mockup carousel shows our own product.
//  2. Copies the app favicon into /public.
//  3. Removes the old, now-unused R3F + Astro section components.
//  4. Installs the new npm deps the redesign needs.
//  5. Optimizes assets (webp screenshots + og.png) via optimize-assets.mjs.
//  6. Runs a production build to verify everything compiles.
//
// Run with:  node scripts/setup-redesign.mjs
// (or from inside Claude Code:  ! node scripts/setup-redesign.mjs)

import { cpSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const V1 = 'C:/Projects/RelationOS/version1';
const STITCH = join(V1, 'stitch_unified_mobile_design_system');

const log = (m) => console.log(`\x1b[35m▸\x1b[0m ${m}`);

// 1) Screenshots ----------------------------------------------------------------
const screensDir = join(ROOT, 'public', 'screens');
mkdirSync(screensDir, { recursive: true });
const screens = {
  'home_paired_dashboard/screen.png': 'home.png',
  'discover_fully_functional_swipe_deck/screen.png': 'discover.png',
  'wishlist_your_matches/screen.png': 'wishlist.png',
  'memory_detail_evening_at_the_pier/screen.png': 'memory.png',
};
for (const [from, to] of Object.entries(screens)) {
  const src = join(STITCH, from);
  if (existsSync(src)) {
    cpSync(src, join(screensDir, to), { force: true });
    log(`screen → public/screens/${to}`);
  } else {
    console.warn(`  ! missing source: ${from}`);
  }
}

// 2) Favicon --------------------------------------------------------------------
const fav = join(V1, 'app-relationos', 'assets', 'favicon.png');
if (existsSync(fav)) {
  cpSync(fav, join(ROOT, 'public', 'favicon.png'), { force: true });
  log('favicon → public/favicon.png');
}

// 3) Dead components ------------------------------------------------------------
const dead = [
  'src/components/3d/DeviceCanvas.jsx',
  'src/components/3d/PhoneModel.jsx',
  'src/components/sections/Hero.astro',
  'src/components/sections/SOPs.astro',
  'src/components/3d',
];
for (const d of dead) {
  const p = join(ROOT, d);
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true });
    log(`removed ${d}`);
  }
}

// 4) Install --------------------------------------------------------------------
log('npm install …');
execSync('npm install --no-audit --no-fund', { cwd: ROOT, stdio: 'inherit' });

// 5) Assets (webp screenshots + og.png) ------------------------------------------
log('optimize assets …');
execSync('node scripts/optimize-assets.mjs', { cwd: ROOT, stdio: 'inherit' });

// 6) Build ----------------------------------------------------------------------
log('astro build …');
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

log('done ✔ →  run `npm run dev` to view the redesign.');
