"use client";

import { motion } from "framer-motion";
import {
  Check,
  FileCheck2,
  Gavel,
  PenTool,
  Search,
  Stamp,
  Tablet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const heroChecklist = [
  "Verifiche tecniche e urbanistiche",
  "Documenti chiari e comprensibili",
  "Più sicurezza, meno sorprese",
  "Serenità per te e per chi ami",
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-brand-yellow/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-52 -left-32 size-[380px] rounded-full bg-brand-red/10 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-ink/70"
          >
            <span className="size-1.5 rounded-full bg-brand-red" />
            Verifiche tecniche pre-acquisto
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-balance font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl"
          >
            Acquista o vendi la tua casa{" "}
            <span className="relative whitespace-nowrap text-brand-red">
              in sicurezza.
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 h-3 w-full text-brand-yellow"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C60 2 240 2 298 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink/65"
          >
            Verifichiamo per te la situazione tecnica e normativa
            dell&apos;immobile prima della firma.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col gap-3"
          >
            {heroChecklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-[15px] font-medium text-ink/75">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <a href="#contatti">
                <FileCheck2 />
                Richiedi una verifica
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#verifichiamo">Scopri i servizi</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-sm text-ink/45"
          >
            <span>Indipendenti</span>
            <span className="size-1 rounded-full bg-ink/20" />
            <span>Imparziali</span>
            <span className="size-1 rounded-full bg-ink/20" />
            <span>In tutta Italia</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[480px]"
        >
          <div className="absolute inset-6 rounded-[2.5rem] bg-cream" />
          <div className="bg-grid absolute inset-6 rounded-[2.5rem] opacity-60" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-64 w-64 items-end justify-center">
              <div className="absolute -bottom-2 h-6 w-48 rounded-full bg-ink/10 blur-md" />
              <div className="relative z-10 h-40 w-52 rounded-b-2xl bg-brand-yellow shadow-[0_20px_45px_-15px_rgba(23,19,16,0.35)]">
                <div className="absolute left-1/2 top-6 size-8 -translate-x-1/2 rounded-full bg-brand-red/90" />
                <div className="absolute bottom-0 left-1/2 h-20 w-14 -translate-x-1/2 rounded-t-lg bg-white/90" />
              </div>
              <svg
                aria-hidden
                viewBox="0 0 220 90"
                className="absolute -top-16 left-1/2 z-20 h-24 w-56 -translate-x-1/2"
              >
                <path
                  d="M4 88 L110 6 L216 88"
                  fill="none"
                  stroke="#d71920"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <motion.div
            className="absolute left-1 top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_-12px_rgba(23,19,16,0.25)] animate-float"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-brand-red-light text-brand-red">
              <FileCheck2 className="size-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-ink">Planimetria</p>
              <p className="text-ink/45">verificata</p>
            </div>
          </motion.div>

          <motion.div className="absolute -right-2 top-16 flex size-16 items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_-12px_rgba(23,19,16,0.25)] animate-float-delayed">
            <Search className="size-7 text-ink/70" />
          </motion.div>

          <motion.div className="absolute bottom-8 -left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_-12px_rgba(23,19,16,0.25)] animate-float-delayed">
            <div className="flex size-8 items-center justify-center rounded-full bg-brand-yellow-light text-brand-yellow-dark">
              <Stamp className="size-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-ink">Agibilità</p>
              <p className="text-ink/45">conforme</p>
            </div>
          </motion.div>

          <motion.div className="absolute -right-3 bottom-24 flex size-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_14px_30px_-12px_rgba(23,19,16,0.35)] animate-float">
            <Gavel className="size-6" />
          </motion.div>

          <motion.div className="absolute -right-5 -bottom-2 flex h-20 w-28 flex-col justify-between rounded-2xl bg-white p-3 shadow-[0_14px_30px_-12px_rgba(23,19,16,0.25)] animate-float">
            <Tablet className="size-5 text-ink/60" />
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-12 rounded-full bg-cream-dark" />
              <PenTool className="size-3.5 text-brand-red" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
