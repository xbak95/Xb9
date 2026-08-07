"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, FileCheck2 } from "lucide-react";

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
          <div className="absolute inset-6 overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-25px_rgba(23,19,16,0.35)]">
            <Image
              src="/hero-house.jpg"
              alt="Casetta su una planimetria, con chiavi e penna"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
