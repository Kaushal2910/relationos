/**
 * Shared SEO constants — single source of truth for structured data.
 *
 * The canonical origin mirrors `site:` in astro.config.mjs (Astro doesn't
 * expose that value to components at runtime). Swap both together when the
 * real domain goes live.
 */
export const SITE_URL = 'https://relationos.app';

export const SITE_NAME = 'RelationOS';

/**
 * FAQ content rendered by FaqSection.tsx AND emitted as FAQPage JSON-LD in
 * Layout.astro (homepage only). Keep the pairs here so the visible copy and
 * the structured data can never drift apart.
 */
export const FAQS = [
  {
    q: 'Do I need a partner to use RelationOS?',
    a: "No — that's the whole point. You can start solo: build a wishlist, plan your own dates, and keep memories, all completely private. When you're ready, pairing takes one code, and your future plans come along with you.",
  },
  {
    q: 'Can my partner see what I swiped past?',
    a: 'Never. Your passes stay yours — only mutual likes surface as matches. It\'s consensus without negotiation: no veto wars, no awkward "idk, you pick" threads.',
  },
  {
    q: 'Who can see my memories?',
    a: "Only you — until you explicitly share one. Every memory starts private, and sharing is a deliberate choice, one memory at a time. Your partner can't unshare something you wrote.",
  },
  {
    q: 'What happens to my stuff when I pair up?',
    a: 'Your past stays yours. Pairing adopts your future solo plans into the shared board and auto-matches spots you both already liked — but old plans and memories remain private unless you share them.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Free to download, no ads, no selling your data. The app lives on its own merits, not on your attention.',
  },
  {
    q: 'When does it launch?',
    a: 'iOS and Android are both coming soon. The core — swiping, matching, planning, and memories — is already built and in testing in Pune.',
  },
];
