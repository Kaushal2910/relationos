import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Slot {
  day: string;
  date: string;
  title: string;
  time: string;
  place: string;
  grad: string;
  matched: boolean;
}

const SLOTS: Slot[] = [
  {
    day: "Fri",
    date: "Jul 31",
    title: "Rooftop dinner",
    time: "8:30 PM",
    place: "The Rosewood Terrace",
    grad: "from-rose-400 to-amber-400",
    matched: true,
  },
  {
    day: "Sat",
    date: "Aug 1",
    title: "Pottery date",
    time: "5:00 PM",
    place: "Terra Studio",
    grad: "from-amber-300 to-rose-400",
    matched: true,
  },
  {
    day: "Sun",
    date: "Aug 2",
    title: "Stargazing",
    time: "9:00 PM",
    place: "Celestial Observatory",
    grad: "from-indigo-500 to-fuchsia-500",
    matched: false,
  },
];

const FEATURES = [
  {
    icon: <CalendarCheck className="h-4 w-4" />,
    title: "One tap to the calendar",
    body: "A match becomes a plan in a single tap — time, place, and a reminder for both of you.",
  },
  {
    icon: <Heart className="h-4 w-4" />,
    title: "Shared, always in sync",
    body: "Both of you see the same week. Edits land instantly — no screenshot coordination.",
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Yours until you share",
    body: "Solo plans stay private. The moment you pair, future plans join the shared board.",
  },
];

export function PlanSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // Auto-cycle the board so the section stays alive without interaction.
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLOTS.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [auto]);

  // Respect reduced-motion users — disable autoplay (SSR-safe: client only).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
    }
  }, []);

  return (
    <section id="plan" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="overline">02 — Plan it</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-text text-balance">
              A match becomes a{" "}
              <span className="italic text-primary">plan</span> in one tap.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted text-pretty">
              No more "so… when?" threads. The spots you both loved drop
              straight onto a shared week — with a time, a place, and a
              reminder you'll both actually get.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.24 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary-soft text-secondary">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Interactive week board */}
        <div
          role="region"
          aria-label="Shared week board demo"
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-md rounded-[2rem] border border-border bg-surface p-6 shadow-e2 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-overline text-text-subtle">
                  This week
                </p>
                <h3 className="mt-1 font-display text-2xl text-text">Your plans</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary-soft text-secondary">
                <CalendarCheck className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {SLOTS.map((slot, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={slot.title}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setAuto(false);
                      setActive(i);
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-secondary/40 bg-surface shadow-e2 ring-2 ring-secondary/20"
                        : "border-border bg-surface-alt/50 hover:border-border hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br ${slot.grad} text-white shadow-e1`}
                      >
                        <span className="text-[10px] font-semibold uppercase leading-none opacity-90">
                          {slot.day}
                        </span>
                        <span className="mt-0.5 font-display text-base leading-none">
                          {slot.date.split(" ")[1]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-text">{slot.title}</p>
                        <p className="truncate text-xs text-text-muted">
                          {slot.time} · {slot.place}
                        </p>
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-like text-white"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 flex items-center gap-1.5 pl-16 text-xs font-medium text-secondary"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {slot.matched
                          ? "Matched together — you're both going"
                          : "Scheduled — invite sent to your circle"}
                      </motion.p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <p aria-hidden="true" className="mt-6 text-center text-xs text-text-subtle">
            {auto ? "Auto-playing · hover to take over" : "Your turn — tap a day"}
          </p>
          <p className="sr-only">Demo board. Select a day to see its plan.</p>
        </div>
      </div>
    </section>
  );
}
