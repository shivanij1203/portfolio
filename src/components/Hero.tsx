"use client";

import { Magnetic, Spotlight } from "./Interactions";
import { motion, useReducedMotion } from "motion/react";
import type { Pr } from "@/lib/github";

type Receipt = {
  figure: string;
  caption: string;
  href?: string;
  live?: string;
};

export default function Hero({
  receipts,
  merged,
}: {
  receipts: Receipt[];
  merged: Pr | undefined;
}) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:px-8 sm:pt-28">
        <motion.p
          {...rise(0)}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
        >
          Tampa, Florida
        </motion.p>

        <motion.h1
          {...rise(0.06)}
          className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.035em]"
        >
          Shivani Jagannatham
        </motion.h1>

        {/* Slot for the cut-out photo once it is re-shot at full resolution. */}

        <motion.div
          {...rise(0.14)}
          className="mt-8 flex max-w-[60ch] flex-col gap-4 font-read text-[1.18rem] leading-[1.6] text-ink/85"
        >
          <p>
            I&rsquo;m a software engineer. I spent two years writing Java and
            Spring Boot services at Verizon, and right now I build AI features
            that K&#8209;12 district leaders use to ask questions about their own
            data.
          </p>
          <p>
            Most of this page is about bugs, because{" "}
            <span className="marker">working out why something breaks</span> is
            the part of the job I&rsquo;m best at.
          </p>
        </motion.div>

        <motion.div
          {...rise(0.22)}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-4"
        >
          {receipts.map((r) => {
            const inner = (
              <div className="flex h-full flex-col gap-2 bg-card p-5">
                <span className="tabnum font-display text-[1.6rem] font-bold leading-none tracking-tight text-maroon">
                  {r.figure}
                </span>
                <span className="text-[0.87rem] leading-snug text-muted">
                  {r.caption}
                </span>
                {r.live ? (
                  <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">
                    {r.live}
                  </span>
                ) : null}
              </div>
            );

            return (
              <Spotlight key={r.figure} className="rounded-none">
                {r.href ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full no-underline"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Spotlight>
            );
          })}
        </motion.div>

        {merged ? (
          <motion.p {...rise(0.3)} className="mt-5 font-mono text-[11px] text-dim">
            These read their state from the GitHub API, so they stay honest ·{" "}
            <Magnetic strength={0.18}>
              <a
                href={merged.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-pink"
              >
                check for yourself
              </a>
            </Magnetic>
          </motion.p>
        ) : null}
      </div>
    </header>
  );
}
