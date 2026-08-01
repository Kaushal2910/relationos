import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

/*
 * ── Performance budget ──────────────────────────────────────────────────────
 * Targets (mobile, lab): LCP < 2.5s · CLS < 0.1 · INP < 200ms · TBT < 200ms,
 * Lighthouse Performance ≥ 90.
 *
 * Already handled by Astro 4 defaults — do NOT re-add as "optimizations":
 *   • HTML minification        (compressHTML: true)
 *   • CSS minification          (Tailwind output is minified in build)
 *   • Small-CSS inlining        (build.inlineStylesheets: 'auto', 4KB threshold)
 *   • Deferred JS               (islands emit <script type="module">)
 *   • Immutable hashed assets   (/_astro/* filenames are content-hashed)
 *
 * The dominant first-load cost is structural and intentional: Hero is
 * `client:load`, so it pulls the ~112KB framer-motion `reveal` chunk onto the
 * critical path. That's the main TBT driver. It's kept on purpose — "the UI is
 * king" — so don't "fix" it by stripping animations. Every other island is
 * `client:visible` and loads on scroll.
 *
 * Remaining levers if the budget slips:
 *   • Real screenshots → run `npm run optimize` (WebP) and the hero preload in
 *     Layout.astro switches on automatically.
 *   • gzip/Brotli + Cache-Control are host-level (see public/_headers).
 */
export default defineConfig({
  // TODO: swap for the real domain once it's live (used by the sitemap + og tags).
  site: 'https://relationos.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
