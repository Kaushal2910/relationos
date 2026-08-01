import React from "react";
import { motion } from "framer-motion";
import { Shield, User, Users, Lock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function SoloSection() {
  return (
    <section id="solo" className="relative z-10 py-24 sm:py-32">
      {/* Dark panel for contrast */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-text px-6 py-16 sm:px-16 sm:py-24">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-[80px]"
          />

          <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* Left — statement */}
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-overline text-primary-dark">
                  03 — Solo first
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-tight text-bg text-balance">
                  You don't need a partner to start.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-bg/70 text-pretty">
                  Most couple apps force you to invite someone on day one.
                  RelationOS doesn't. Build your wishlist, log your memories,
                  plan your own dates — all private, all yours. When you're
                  ready, pairing takes one code.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 grid grid-cols-2 gap-4">
                  {[
                    { icon: <User className="h-4 w-4" />, label: "Works solo", sub: "No partner required" },
                    { icon: <Lock className="h-4 w-4" />, label: "Private by default", sub: "Yours until you share" },
                    { icon: <Users className="h-4 w-4" />, label: "Pair anytime", sub: "One code, instant sync" },
                    { icon: <Shield className="h-4 w-4" />, label: "Yours, full stop", sub: "No one else can claim it" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-bg/10 bg-bg/5 p-4"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20 text-primary-dark">
                        {item.icon}
                      </span>
                      <p className="mt-3 text-sm font-semibold text-bg">{item.label}</p>
                      <p className="text-xs text-bg/70">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — visual comparison */}
            <div className="flex flex-col gap-6">
              <Reveal delay={0.12}>
                <div className="rounded-2xl border border-bg/10 bg-bg/5 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary-dark">
                      <User className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-bg">Solo mode</p>
                      <p className="text-xs text-bg/70">Just you, to start</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-bg/70">
                    Everything you create belongs to you and only you. Your
                    wishlist, your memories, your plans — invisible to anyone
                    else until you decide otherwise. No invites required, no
                    awkward empty "couple" space staring back at you.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-bg/10 bg-bg/5 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary/20 text-secondary">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-bg">Paired mode</p>
                      <p className="text-xs text-bg/70">One code, and you're in sync</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-bg/70">
                    When you pair, your future plans join the shared board and
                    the spots you both already liked light up as matches
                    automatically. Your past stays yours — old plans and
                    memories remain private unless you share them.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-primary p-6 text-center"
                >
                  <p className="font-display text-xl italic text-white">
                    "I started using it alone. When my partner joined, all my
                    saved spots were already there."
                  </p>
                  <p className="mt-3 text-xs text-white/70">— Early tester, Pune</p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
