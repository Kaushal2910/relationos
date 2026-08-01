import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Calendar, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const timeline = [
  {
    date: "Oct 14",
    title: "Evening at the Pier",
    place: "The Amber Roast",
    note: "Such a beautiful evening. The sunset was incredible and the food was perfect. We talked for hours about our future.",
    photos: 4,
    color: "bg-primary",
  },
  {
    date: "Sep 28",
    title: "Pottery Workshop",
    place: "Terra Studio",
    note: "First time trying the wheel together. We made the worst bowls and laughed the entire time.",
    photos: 6,
    color: "bg-secondary",
  },
  {
    date: "Sep 12",
    title: "Stargazing Night",
    place: "Celestial Observatory",
    note: "Saw Saturn's rings for the first time. Quiet, cold, perfect.",
    photos: 3,
    color: "bg-like",
  },
];

export function MemoriesSection() {
  return (
    <section id="memories" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left — copy */}
          <div>
            <Reveal>
              <p className="overline">04 — Keep it forever</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-text text-balance">
                A timeline you'll{" "}
                <span className="italic text-primary">actually</span> look back on.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted text-pretty">
                Photos, notes, and the place it happened — pinned to the date,
                not lost in a camera roll. Every memory is private until you
                choose to share it.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  { icon: <Camera className="h-4 w-4" />, label: "Photo grids" },
                  { icon: <MapPin className="h-4 w-4" />, label: "Linked to place" },
                  { icon: <Calendar className="h-4 w-4" />, label: "Date-stamped" },
                  { icon: <Plus className="h-4 w-4" />, label: "Add anytime" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-muted shadow-e1"
                  >
                    <span className="text-primary">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 rounded-2xl border border-border bg-surface-alt/60 p-5">
                <p className="text-sm leading-relaxed text-text-muted">
                  <span className="font-semibold text-text">Private by default.</span>{" "}
                  Every memory starts as yours alone. Sharing is a deliberate
                  choice — one memory at a time — and once something is yours,
                  it stays yours. Your partner can't unshare what you wrote.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-[19px]" />

            <div className="space-y-8">
              {timeline.map((entry, i) => (
                <Reveal key={entry.title} delay={i * 0.1}>
                  <div className="relative flex gap-6">
                    {/* Dot */}
                    <span className={`relative z-10 mt-1.5 h-8 w-8 shrink-0 rounded-full ${entry.color} ring-4 ring-bg shadow-e1`} />

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex-1 rounded-card border border-border bg-surface p-5 shadow-e1 transition-shadow hover:shadow-e2"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-overline text-text-subtle">
                            {entry.date}
                          </p>
                          <h3 className="mt-1 font-display text-xl text-text">{entry.title}</h3>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-muted">
                            <MapPin className="h-3 w-3 text-primary" />
                            {entry.place}
                          </p>
                        </div>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">{entry.photos} photos</span>
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-text-muted text-pretty">
                        &ldquo;{entry.note}&rdquo;
                      </p>

                      {/* Photo thumbnails (gradient stand-ins — decorative) */}
                      <div aria-hidden="true" className="mt-4 grid grid-cols-4 gap-2">
                        {Array.from({ length: Math.min(entry.photos, 4) }).map((_, j) => (
                          <div
                            key={j}
                            className="aspect-square rounded-lg bg-gradient-to-br from-surface-alt to-border"
                            style={{
                              backgroundImage: `linear-gradient(135deg, hsl(${(i * 40 + j * 25) % 360} 60% 85%), hsl(${(i * 40 + j * 25 + 40) % 360} 50% 75%))`,
                            }}
                          />
                        ))}
                        {entry.photos > 4 && (
                          <div className="grid aspect-square place-items-center rounded-lg bg-surface-alt text-xs font-semibold text-text-muted">
                            +{entry.photos - 4}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
