import React from "react";
import { Check, Clock, Rocket, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const versions = [
  {
    version: "V1",
    title: "Consensual Swipe & Memory Core",
    status: "Shipping now",
    statusIcon: <Check className="h-3.5 w-3.5" />,
    statusColor: "bg-like/15 text-like",
    description:
      "The primary relationship loop. Invite your partner, friend, or family member to form a secure, private circle. Swipe on local date-spot cards to hit instant consensus. Schedule matched spots directly to your integrated calendar planner, and log photos to build a permanent scrapbook timeline.",
    features: ["Swipe deck", "Mutual matches", "Shared calendar", "Memory timeline"],
  },
  {
    version: "V2",
    title: "The Smart Personalization Layer",
    status: "In planning",
    statusIcon: <Clock className="h-3.5 w-3.5" />,
    statusColor: "bg-secondary/15 text-secondary",
    description:
      "Adds a lightweight preference profile derived from swipe history and onboarding tags. Features a Claude-powered AI Date Planner that generates multi-stop itineraries grounded entirely in real database places, alongside shared bucket lists and gamified streak counters.",
    features: ["AI date planner", "Preference learning", "Bucket lists", "Streak gamification"],
  },
  {
    version: "V3",
    title: "Places Enrichment & Event Scale",
    status: "Data architecture",
    statusIcon: <Rocket className="h-3.5 w-3.5" />,
    statusColor: "bg-info/15 text-info",
    description:
      "Scales the database dynamically. Integrates with the Google Places API for automated reviews, images, and description enrichment. Ingests local ticketing and event APIs to serve real-time concert, movie, and seasonal activities onto your swipe deck.",
    features: ["Google Places API", "Live events", "Auto-enrichment", "Seasonal activities"],
  },
  {
    version: "V4",
    title: "The Ecosystem & Cycle Companion",
    status: "Conceptualization",
    statusIcon: <Lightbulb className="h-3.5 w-3.5" />,
    statusColor: "bg-warning/15 text-warning",
    description:
      "Builds deep lifestyle widgets. Integrates an opt-in menstrual cycle companion with supportive partner notifications (never exposing raw data). Adds an AI communication assistant to rephrase stressful text drafts, plus a verified business portal for real-time bookings.",
    features: ["Cycle companion", "AI comms assistant", "Business portal", "Real-time bookings"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="overline text-center">05 — Where we're headed</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 text-center font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-text text-balance">
            The product journey
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-text-muted text-pretty">
            We ship in public. Here's what's live, what's next, and what we're
            dreaming about.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {versions.map((v, i) => (
              <Reveal key={v.version} delay={i * 0.1}>
                <div
                  className={`relative flex gap-8 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <span className="absolute left-[12px] top-2 z-10 h-4 w-4 rounded-full border-2 border-bg bg-primary shadow-e1 md:left-1/2 md:-translate-x-1/2" />

                  {/* Content card */}
                  <div className="ml-12 flex-1 md:ml-0 md:w-[calc(50%-2rem)]">
                    <div className="rounded-card border border-border bg-surface p-6 shadow-e1 transition-shadow hover:shadow-e2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-overline text-primary">
                          {v.version}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${v.statusColor}`}
                        >
                          {v.statusIcon}
                          {v.status}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl text-text">{v.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted text-pretty">
                        {v.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {v.features.map((f) => (
                          <span
                            key={f}
                            className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-text-muted"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
