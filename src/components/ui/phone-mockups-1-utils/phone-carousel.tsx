import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageItem {
  /** Image URL. For the RelationOS site these live in /public/screens. */
  src: string;
  /** Accessible description of the screen. */
  alt: string;
  /** Optional short caption shown under the dots. */
  caption?: string;
  /**
   * Branded wireframe shown behind the image (and instead of it, if the image
   * is missing / 404s). Lets the carousel look intentional with zero assets —
   * drop a real PNG at `src` later and it simply covers this placeholder.
   */
  fallback?: {
    /** Short screen title for the faux top bar, e.g. "Discover". */
    name: string;
    /** Tailwind gradient classes for the hero card, e.g. "from-rose-400 to-amber-400". */
    grad: string;
    /** Accent hex for faux UI bits (active tab, chips). */
    accent: string;
  };
}

interface PhoneCarouselProps {
  images: ImageItem[];
  /** Autoplay interval in ms. Set to 0 to disable. */
  interval?: number;
  /** Show the floating glow halo behind the device. */
  glow?: boolean;
  /** Optional className for the outer wrapper (sizing, rotation, etc.). */
  className?: string;
  /** Render pagination dots + caption below the device. */
  showDots?: boolean;
  /** Start index. */
  startIndex?: number;
}

/**
 * A faux app screen used as a placeholder / fallback when no screenshot is
 * available. Pure CSS — no image assets required.
 */
function ScreenPlaceholder({ name, grad, accent }: NonNullable<ImageItem["fallback"]>) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#FDF8F6]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-9 pb-3">
        <span className="font-display text-lg text-[#22181C]">{name}</span>
        <span className="h-4 w-4 rounded-md" style={{ background: `${accent}22` }} />
      </div>
      {/* Hero card */}
      <div className="px-3">
        <div className={`relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${grad}`}>
          <div className="absolute inset-x-3 bottom-3 space-y-1.5">
            <div className="h-2 w-1/2 rounded-full bg-white/80" />
            <div className="h-1.5 w-1/3 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
      {/* List rows */}
      <div className="space-y-2.5 px-3 pt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-[0_2px_8px_-2px_rgba(34,24,28,0.08)]">
            <div className="h-9 w-9 shrink-0 rounded-lg" style={{ background: `${accent}1a` }} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-2/3 rounded-full bg-[#ECE2DE]" />
              <div className="h-1.5 w-1/2 rounded-full bg-[#F5EEEB]" />
            </div>
          </div>
        ))}
      </div>
      {/* Bottom tab bar */}
      <div className="mt-auto flex items-center justify-around border-t border-[#ECE2DE] px-4 py-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-1.5 w-5 rounded-full"
            style={{ background: i === 1 ? accent : "#ECE2DE" }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * A realistic iPhone-style frame that cross-fades through a set of app
 * screenshots. This is the component the integration prompt referenced at
 * `@/components/ui/phone-mockups-1-utils/phone-carousel` but never actually
 * shipped — implemented here from scratch.
 *
 * Works with or without images: each slide renders a branded wireframe
 * placeholder, and the real screenshot layers on top only if it loads.
 */
export function PhoneCarousel({
  images,
  interval = 3400,
  glow = true,
  className,
  showDots = true,
  startIndex = 0,
}: PhoneCarouselProps) {
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      const len = images.length;
      setIndex(((next % len) + len) % len);
    },
    [images.length],
  );

  useEffect(() => {
    if (interval <= 0 || paused || images.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [interval, paused, images.length]);

  // Respect reduced-motion users — freeze autoplay (SSR-safe: client only).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
  }, []);

  const current = images[index];

  // Arrow keys move between slides when focus is inside the carousel.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="RelationOS app screens"
      onKeyDown={onKeyDown}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn("flex flex-col items-center", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {/* Ambient glow halo */}
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[3.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(228,85,123,0.35),transparent_70%)] blur-2xl"
          />
        )}

        {/* Device body */}
        <div className="relative rounded-phone bg-gradient-to-b from-[#2a2326] to-[#151013] p-[10px] shadow-phone ring-1 ring-black/10">
          {/* Side power button */}
          <span className="absolute -right-[2px] top-[120px] h-16 w-[3px] rounded-r bg-[#2a2326]" />
          {/* Volume buttons */}
          <span className="absolute -left-[2px] top-[96px] h-8 w-[3px] rounded-l bg-[#2a2326]" />
          <span className="absolute -left-[2px] top-[140px] h-12 w-[3px] rounded-l bg-[#2a2326]" />

          {/* Screen — the slide container announces changes to AT */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
            aria-live="polite"
            className="relative aspect-[9/19.5] w-[268px] overflow-hidden rounded-screen bg-white sm:w-[288px]"
          >
            {/* Stacked, cross-fading slides (placeholder + optional image) */}
            <AnimatePresence initial={false}>
              {images.map((img, i) =>
                i === index ? (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Wireframe placeholder — always present as the backdrop */}
                    {img.fallback && (
                      <ScreenPlaceholder
                        name={img.fallback.name}
                        grad={img.fallback.grad}
                        accent={img.fallback.accent}
                      />
                    )}
                    {/* Real screenshot on top, hidden if it fails to load.
                        width/height match the 9:19.5 screen ratio (CLS guard);
                        decoding is async. Slide 0 is the only one in the initial
                        HTML, so it stays eager — the LCP boost comes from the
                        <link rel=preload> in Layout.astro, not this attribute
                        (React 18 drops the fetchPriority prop anyway). */}
                    {!failed[img.src] && (
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={576}
                        height={1248}
                        decoding="async"
                        loading={i === 0 ? "eager" : "lazy"}
                        draggable={false}
                        onError={() => setFailed((f) => ({ ...f, [img.src]: true }))}
                        className="absolute inset-0 h-full w-full select-none object-cover object-top"
                      />
                    )}
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>

            {/* Dynamic island */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2.5 z-10 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1b1b1d] ring-1 ring-white/10" />
            </div>

            {/* Subtle top sheen */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-screen bg-gradient-to-b from-white/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Pagination + caption */}
      {showDots && (
        <div className="mt-7 flex flex-col items-center gap-3">
          <div role="group" aria-label="Choose screen" className="flex items-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Show screen ${i + 1}: ${img.alt}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-text-subtle/40 hover:bg-text-subtle/70",
                )}
              />
            ))}
          </div>
          {current?.caption && (
            <AnimatePresence mode="wait">
              <motion.p
                key={current.caption}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-center text-sm font-medium text-text-muted"
              >
                {current.caption}
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
