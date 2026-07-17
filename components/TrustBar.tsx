"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";

interface TrustBarProps {
  googleRating?: number;
  googleReviewCount?: number;
}

export default function TrustBar({ googleRating, googleReviewCount }: TrustBarProps) {
  const { rotatingWords, stats } = siteConfig.trustBar;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (rotatingWords.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const allStats = [...stats];
  if (googleRating) {
    allStats.push({
      label: `${googleReviewCount ?? ""} reviews on Google`.trim(),
      value: `${googleRating.toFixed(1)} ★`,
    });
  }

  return (
    <section className="border-y border-border bg-surface py-14">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <p className="font-heading text-2xl text-ink md:text-3xl">
          We design spaces that are{" "}
          <span className="relative inline-block min-w-[8ch] text-accent">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {allStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-semibold text-ink md:text-4xl">{stat.value}</p>
              <p className="mt-1 font-body text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
