import React from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FAQS } from "@/lib/seo";

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* Left — sticky header */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="overline">06 — Good to know</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-text text-balance">
              Questions,{" "}
              <span className="italic text-primary">answered</span> honestly.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-text-muted text-pretty">
              The short version of what people ask before they download.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href="#download"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-primary hover:text-white"
            >
              Get the app
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        {/* Right — editorial Q&A list */}
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-text transition-colors group-hover:text-primary sm:text-2xl">
                      {item.q}
                    </h3>
                  </span>
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-text-muted transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:text-primary">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-xl pl-10 text-sm leading-relaxed text-text-muted text-pretty sm:text-base">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
