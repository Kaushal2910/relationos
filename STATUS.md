# RelationOS Website — STATUS

> **Read this file first.** It's the single source of truth for the marketing
> website so a new session doesn't have to re-explore the codebase. Keep it
> updated as things change. Last updated: 2026-08-01.

## What this is
Marketing/download site for the RelationOS app. Users learn what the app does
and (eventually) download it. **The UI is the priority; keep the build light —
no heavy refactors.** The app itself lives elsewhere (`C:\Projects\RelationOS\version1\app-relationos`) — **never edit app code from here.**

## Commands
```bash
npm run dev        # dev server → http://localhost:4321 (live reload)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run check      # typecheck (Astro + TSX)
npm run optimize   # regenerate WebP screenshots + og.png (run after adding PNGs)
```

## Tech stack
- **Astro 4.16** (static output) + **React 18** islands + **Tailwind 3.4** + **Framer Motion 11**.
- **R3F / three.js was REMOVED** (2026-07-31) — animations are Framer Motion + CSS keyframes only. Do not re-add.
- Design tokens from `version1/DESIGN.md` are mapped in `tailwind.config.mjs`.
- Fonts: Google Fonts (Instrument Serif display + Plus Jakarta Sans body + JetBrains Mono meta), `display=swap` + preconnect + Latin subsetting.

## Page structure
Single page `src/pages/index.astro`, sections in order:
1. **Hero** (`client:load`) — phone carousel (`phone-mockups-1.tsx`)
2. **Marquee** — pure `.astro`, zero JS (CSS animation)
3. **SwipeShowcase** (`client:visible`) — interactive swipe deck
4. **PlanSection** (`client:visible`) — interactive shared-week board
5. **SoloSection** (`client:visible`)
6. **MemoriesSection** (`client:visible`)
7. **Roadmap** (`client:visible`) — V1–V4
8. **FaqSection** (`client:visible`)
9. **DownloadCTA** (`client:visible`)

Plus legal pages: `src/pages/privacy.astro`, `src/pages/terms.astro`.
Layout (header/nav/footer/mobile menu) is in `src/layouts/Layout.astro`.

## SEO / structured data
JSON-LD is built in `Layout.astro`'s frontmatter and emitted as
`<script type="application/ld+json">` blocks at the end of `<head>`:
- **Organization + BreadcrumbList** — every page (breadcrumb is single-level;
  its name is the page title, "RelationOS" on the homepage).
- **SoftwareApplication** (`LifestyleApplication`, `Android, iOS`, free
  `Offer`) + **FAQPage** — homepage only, gated on
  `Astro.url.pathname === '/'`.
- Shared constants live in `src/lib/seo.ts`: `SITE_NAME`, `SITE_URL`, and
  `FAQS`. The FAQ pairs render in `FaqSection.tsx` **and** feed the FAQPage
  schema — edit them only in `seo.ts` so visible copy and structured data
  can't drift.
- `SITE_URL` mirrors `site:` in `astro.config.mjs` (Astro doesn't expose the
  config value to components) — **swap both together at launch**.
- Breadcrumb/canonical URLs come from `Astro.url.href`: absolute against the
  config `site` in builds, `http://localhost:4321` in dev — expected, not a bug.

## Accessibility (WCAG 2.1 AA pass — 2026-08-01)
- **Skip link** is the first focusable element in `Layout.astro` →
  `#main-content` (`<main>` was renamed from `id="top"`; brand links now point
  at `/#main-content`). Hidden until focused.
- **Global `:focus-visible` ring** in `global.css` (2px `#E4557B`, 2px
  offset) — works on light and dark panels. Do not remove.
- **Carousel** (`phone-carousel.tsx`): `region`/`carousel` roledescription +
  label, ArrowLeft/ArrowRight keyboard nav, `aria-current` on pagination dots,
  slide container announces "Slide X of Y" via `aria-live="polite"`, autoplay
  pauses on keyboard focus (not just hover) and reduced-motion.
- **SwipeShowcase**: labeled `region`, arrow keys swipe (right = like,
  left = pass), match burst announced via a persistent `aria-live` region,
  sr-only keyboard-instructions twin of the visible hint.
- **PlanSection**: labeled `region`, day buttons carry `aria-pressed`.
- **Mobile menu**: panel is `inert` while closed (no tabbing into hidden
  links), focus moves into the menu on open and back to the toggle on close;
  the two `<nav>`s are labeled "Primary"/"Mobile"; footer column headings are
  `h2` (were `h4`, which skipped levels on legal pages).
- **SoloSection dark panel**: body text bumped `text-bg/50`→`/60` and
  `/60`→`/70` to clear 4.5:1 on `#22181C`.
- Decorative SVGs are `aria-hidden` (Hero + DownloadCTA store buttons).
- **Known contrast exceptions (design decision needed):** `text-subtle`
  `#9A8E93` (~2.9:1 on bg) and `text-primary` overlines (~3.6:1) are below
  AA for small text. Both are brand tokens shared with the app
  (`version1/DESIGN.md`) — changing them here should be a coordinated design
  call, not a website-only patch.
- **Accepted, not bugs:** disabled store buttons are unfocusable by design
  (pre-launch placeholders); the Marquee's duplicated loop is decorative
  repetition (single `aria-hidden` candidate if it ever bothers AT users).

## Key product decisions (do NOT undo without asking)
- **Download buttons are iOS / Android with "Coming soon" pills** — no store
  links exist yet. User's explicit decision. Do not add App Store/Google Play badges.
- **Consumer copy is jargon-free.** No `couple_id`, `created_by`, RLS, or
  "scope-hopping" in user-facing text (those are dev concepts).
- **Screenshots are placeholders for now.** `public/screens/` is empty; the
  phone mockup renders branded CSS wireframes. To add real screenshots: drop
  `discover.png`, `home.png`, `wishlist.png`, `memory.png` into `public/screens/`,
  then run `npm run optimize`. The carousel and the hero LCP preload pick them
  up automatically — no code changes.
- **`site:` in `astro.config.mjs` is a placeholder** (`https://relationos.app`).
  Swap for the real domain before launch (sitemap + og tags + JSON-LD depend
  on it — `SITE_URL` in `src/lib/seo.ts` mirrors it and must change too).
- **og:image stays PNG** (`public/og.png`) — social crawlers handle WebP
  spottily, and it's never rendered on-page so format has no perf impact.

## Performance (Core Web Vitals) — done 2026-07-31
Lighthouse mobile lab: **Performance 83**, CLS **0** (perfect), TBT **0 ms**
(perfect), LCP 3.2s, FCP 3.1s, Speed Index 5.8s. Budget targets live in the
comment block at the top of `astro.config.mjs`.

What's in place:
- Conditional hero-image `<link rel="preload" fetchpriority="high">` in
  `Layout.astro` (emits only when `public/screens/discover.webp` exists).
- Carousel `<img>` has `width`/`height`/`decoding="async"` (CLS guard).
- `public/_headers` — immutable 1-yr cache for `/_astro/*`, short cache for HTML.
- Below-fold islands are `client:visible`; Marquee is JS-free.

**Already Astro 4 defaults — do NOT re-add as "optimizations"** (they change
zero bytes): `compressHTML: true`, CSS minification, `build.inlineStylesheets:
'auto'`, deferred island scripts (`type="module"`), Tailwind CSS purging.

**Known tradeoff (intentional):** Hero is `client:load`, so it pulls the
~112KB framer-motion `reveal` chunk onto the critical path — the main TBT/FCP
driver under mobile throttling. Kept on purpose ("the UI is king"). To push
past 90 you'd self-host fonts or split framer-motion — out of scope by design.

**Gotchas learned:**
- React 18 **silently drops the `fetchPriority` prop on `<img>`** — that's why
  `fetchpriority="high"` lives on the `<link>` in `<head>`, not the img.
- `@astrojs/sitemap` must be **pinned to3.2.1** for Astro 4 (3.3+ needs Astro 5
  and crashes the build with `Cannot read properties of undefined (reading 'reduce')`).

## Asset pipeline
`scripts/optimize-assets.mjs` (sharp): converts `public/screens/*.png` → `.webp`,
generates `public/og.png` (1200×630 brand card), deletes any stray
`public/favicon.png` (the real favicon is an inline SVG data-URI in Layout.astro).
`scripts/setup-redesign.mjs` is the older one-shot setup (stages Stitch mockups,
installs deps, builds) — mostly historical.

## Known gaps / next steps
- Add real app screenshots + `npm run optimize` (activates the LCP preload).
- Set the real domain before launch: `site:` in `astro.config.mjs` **and**
  `SITE_URL` in `src/lib/seo.ts` (JSON-LD reads the latter).
- `hello@relationos.app` contact email is a placeholder — confirm it's real.
- Consider a real testimonial / social proof (current one is generic).
- Deploy target not chosen — `public/_headers` is Netlify/Cloudflare-Pages
  format; Vercel would need `vercel.json` instead.
