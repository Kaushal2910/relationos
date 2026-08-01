import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function DownloadCTA() {
  return (
    <section id="download" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary-pressed px-6 py-20 text-center shadow-e3 sm:px-16">
            {/* Decorative rings */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full border border-white/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-10 top-10 h-3 w-3 rounded-full bg-white/40 animate-float"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-16 bottom-16 h-2 w-2 rounded-full bg-white/30 animate-float-slow"
            />

            <div className="relative mx-auto max-w-2xl">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
                  <path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.4 5c2 0 3.4 1.1 4.2 2.3l.4.6.4-.6C11.2 6.1 12.6 5 14.6 5 18 5 19.6 8.5 22 11.8 19.5 16.4 12 21 12 21z" />
                </svg>
              </motion.span>

              <h2 className="mt-8 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] tracking-tight text-white text-balance">
                Start your first <span className="italic">memory</span> tonight.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/85 text-pretty">
                Free to download. No ads, no data selling, no partner required.
                Just you, your people, and the moments worth keeping.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  disabled
                  title="iOS download — coming soon"
                  className="group inline-flex cursor-default items-center gap-3 rounded-full bg-text px-7 py-4 text-left text-white shadow-e2 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-wide opacity-70">Download for</span>
                    <span className="flex items-center gap-2 text-base font-semibold">
                      iOS
                      <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide">
                        Coming soon
                      </span>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  title="Android download — coming soon"
                  className="group inline-flex cursor-default items-center gap-3 rounded-full bg-white/15 px-7 py-4 text-left text-white backdrop-blur-sm ring-1 ring-white/25 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48A10.87 10.87 0 0 0 1 18h22a10.87 10.87 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/></svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-wide opacity-70">Download for</span>
                    <span className="flex items-center gap-2 text-base font-semibold">
                      Android
                      <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide">
                        Coming soon
                      </span>
                    </span>
                  </span>
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-sm text-white/70">
                <span>Not ready to commit?</span>
                <a
                  href="#features"
                  className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
                >
                  See how it works
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span className="sr-only"> — the swipe deck demo above</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
