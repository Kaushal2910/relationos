import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Spot {
  name: string;
  tag: string;
  meta: string;
  /** gradient stand-in for the spot photo */
  grad: string;
  /** whether the partner has already liked this one */
  partnerLiked: boolean;
}

const SPOTS: Spot[] = [
  {
    name: "The Rosewood Terrace",
    tag: "Cozy dinner",
    meta: "₹₹ · 2.4 km · ★ 4.8",
    grad: "from-rose-400 via-rose-500 to-amber-400",
    partnerLiked: true,
  },
  {
    name: "Blue Note Jazz Club",
    tag: "Live music",
    meta: "₹ · 1.1 km · ★ 4.6",
    grad: "from-indigo-500 via-violet-600 to-fuchsia-500",
    partnerLiked: false,
  },
  {
    name: "Terra Pottery Workshop",
    tag: "Hands-on",
    meta: "₹ · 4.8 km · ★ 4.9",
    grad: "from-amber-300 via-orange-400 to-rose-400",
    partnerLiked: true,
  },
  {
    name: "Celestial Observatory",
    tag: "Stargazing",
    meta: "₹₹ · 0.5 km · ★ 4.7",
    grad: "from-slate-700 via-indigo-800 to-fuchsia-700",
    partnerLiked: true,
  },
];

export function SwipeShowcase() {
  const [deck, setDeck] = useState<Spot[]>(SPOTS);
  const [match, setMatch] = useState<Spot | null>(null);
  const [auto, setAuto] = useState(true);
  const autoRef = useRef(true);
  autoRef.current = auto;

  const swipe = useCallback(
    (dir: "like" | "pass") => {
      setDeck((prev) => {
        if (prev.length === 0) return prev;
        const top = prev[0];
        if (dir === "like" && top.partnerLiked) {
          setMatch(top);
          window.setTimeout(() => setMatch(null), 1900);
        }
        return prev.slice(1);
      });
    },
    [],
  );

  // Auto-demo loop — keeps the section alive without interaction.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!autoRef.current) return;
      setDeck((prev) => {
        if (prev.length === 0) return SPOTS; // reshuffle
        return prev;
      });
      swipe(Math.random() > 0.35 ? "like" : "pass");
    }, 2600);
    return () => window.clearInterval(id);
  }, [swipe]);

  // Reshuffle when the deck runs dry (manual play).
  useEffect(() => {
    if (deck.length === 0) {
      const t = window.setTimeout(() => setDeck(SPOTS), 1400);
      return () => window.clearTimeout(t);
    }
  }, [deck.length]);

  // Respect reduced-motion users — disable autoplay (SSR-safe: client only).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
    }
  }, []);

  const top = deck[0];
  const next = deck[1];

  // Keyboard nav for the deck: arrows swipe, focus pauses the auto-demo.
  const onDeckKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setAuto(false);
      swipe("like");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setAuto(false);
      swipe("pass");
    }
  };

  return (
    <section id="features" aria-label="Decide together — swipe deck demo" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="overline">01 — Decide together</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-text text-balance">
              No more endless{" "}
              <span className="italic text-primary">&ldquo;idk, you pick&rdquo;</span>{" "}
              threads.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted text-pretty">
              Each of you swipes on local spots in private. The moment you both
              like the same place, it lights up as a match — no awkward
              negotiation, no veto wars.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {[
              {
                icon: <Heart className="h-4 w-4" />,
                title: "Private swipes",
                body: "Your pass is never shown. Only mutual likes surface.",
              },
              {
                icon: <Sparkles className="h-4 w-4" />,
                title: "Instant consensus",
                body: "A match the second the second heart lands.",
              },
              {
                icon: <X className="h-4 w-4" />,
                title: "Zero pressure",
                body: "Disagree silently. The deck just keeps going.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={0.24 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
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

        {/* Interactive deck */}
        <div
          role="region"
          aria-label="Swipe deck demo"
          tabIndex={0}
          onKeyDown={onDeckKeyDown}
          onFocus={() => setAuto(false)}
          onBlur={() => setAuto(true)}
          className="order-1 flex flex-col items-center focus-visible:outline-none lg:order-2"
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
        >
          <div className="relative h-[460px] w-[300px]">
            {/* Match burst */}
            <div aria-live="polite" className="pointer-events-none absolute inset-0 z-30">
              <AnimatePresence>
                {match && (
                  <motion.div
                    key="match"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                  >
                    <div className="mx-auto flex w-fit flex-col items-center gap-2 rounded-3xl bg-text px-7 py-5 text-bg shadow-e3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white">
                        <Heart className="h-6 w-6" fill="currentColor" />
                      </span>
                      <p className="font-display text-2xl italic">It's a match</p>
                      <p className="text-xs text-bg/70">You both loved {match.name}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card stack */}
            {next && (
              <div className="absolute inset-x-3 top-3 bottom-3 rounded-card bg-surface-alt" />
            )}
            <AnimatePresence initial={false}>
              {top && (
                <motion.div
                  key={top.name}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 220, rotate: 14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 90) swipe("like");
                    else if (info.offset.x < -90) swipe("pass");
                  }}
                  aria-label={`${top.name} — ${top.tag}. ${top.meta}. Use the Like and Pass buttons or the arrow keys to swipe.`}
                  className="absolute inset-0 cursor-grab overflow-hidden rounded-card border border-border bg-surface shadow-e2 active:cursor-grabbing"
                >
                  <div className={`relative h-[68%] bg-gradient-to-br ${top.grad}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text">
                      {top.tag}
                    </span>
                    {top.partnerLiked && (
                      <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-primary shadow-e1">
                        <Heart className="h-4 w-4" fill="currentColor" />
                      </span>
                    )}
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <h3 className="font-display text-2xl leading-tight">{top.name}</h3>
                      <p className="mt-1 text-xs text-white/80">{top.meta}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 pt-6">
                    <button
                      type="button"
                      onClick={() => swipe("pass")}
                      aria-label="Pass"
                      className="grid h-14 w-14 place-items-center rounded-full border border-border bg-surface text-pass shadow-e1 transition-transform hover:scale-110 active:scale-95"
                    >
                      <X className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => swipe("like")}
                      aria-label="Like"
                      className="grid h-16 w-16 place-items-center rounded-full bg-primary text-white shadow-glow transition-transform hover:scale-110 active:scale-95"
                    >
                      <Heart className="h-7 w-7" fill="currentColor" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {deck.length === 0 && (
              <div className="absolute inset-0 grid place-items-center rounded-card border border-dashed border-border bg-surface-alt/60 text-sm text-text-subtle">
                That's the deck — reshuffling…
              </div>
            )}
          </div>
          <p aria-hidden="true" className="mt-6 text-center text-xs text-text-subtle">
            {auto ? "Auto-playing · hover to take over" : "Your turn — drag or tap"}
          </p>
          <p className="sr-only">
            Demo deck. Use the Like and Pass buttons, or focus the deck and
            press the left and right arrow keys.
          </p>
        </div>
      </div>
    </section>
  );
}
