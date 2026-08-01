import React from "react";
import { motion } from "framer-motion";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20 pb-16 md:pt-28">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-secondary/8 blur-[80px]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-8">
        {/* Left column — editorial headline */}
        <div className="relative z-10 max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/60 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              Version 1.0 — live now
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-7 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] tracking-tight text-text text-balance">
              The app that turns{" "}
              <span className="italic text-primary">
                &ldquo;what should we do?&rdquo;
              </span>{" "}
              into a plan.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted text-pretty">
              Swipe on date spots together. Match instantly. Schedule in one tap.
              Then keep every photo and note in a timeline you'll actually look
              back on.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                disabled
                title="iOS download — coming soon"
                className="group inline-flex cursor-default items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-e2 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download for iOS
                <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide">
                  Coming soon
                </span>
              </button>
              <button
                type="button"
                disabled
                title="Android download — coming soon"
                className="group inline-flex cursor-default items-center gap-3 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text shadow-e1 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48A10.87 10.87 0 0 0 1 18h22a10.87 10.87 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/></svg>
                Download for Android
                <span className="rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-primary">
                  Coming soon
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex items-center gap-5 text-sm text-text-subtle">
              <div aria-hidden="true" className="flex -space-x-2">
                {["#E4557B", "#6C5CE7", "#2FBF71"].map((c) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-full border-2 border-bg"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span>
                Loved by couples, friends & families in Pune
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right column — phone mockup */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneMockupBasic />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-text-subtle">
          <span className="text-[11px] font-medium uppercase tracking-overline">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-5 w-[1px] bg-text-subtle/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
