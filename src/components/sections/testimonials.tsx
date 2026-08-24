"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Testimonianze
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            La fiducia di chi ha scelto chiarezza
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-ink/8 bg-white p-10 sm:p-14">
            <Quote className="absolute right-8 top-8 size-16 text-cream" strokeWidth={1} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex gap-1 text-brand-yellow">
                  {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                    <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 text-balance font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-brand-red-light font-display text-sm font-bold text-brand-red">
                    {testimonials[index].name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{testimonials[index].name}</p>
                    <p className="text-sm text-ink/60">{testimonials[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Testimonianza precedente"
              onClick={() => go(index - 1)}
              className="flex size-11 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                  onClick={() => go(i)}
                  className="flex size-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-brand-red" : "w-2 bg-ink/15"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              aria-label="Testimonianza successiva"
              onClick={() => go(index + 1)}
              className="flex size-11 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
