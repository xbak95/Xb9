"use client";

import { motion } from "framer-motion";
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
          <div className="absolute inset-6 rounded-[2.5rem] bg-cream" />
          <div className="bg-grid absolute inset-6 rounded-[2.5rem] opacity-60" />

          <svg
            aria-hidden
            viewBox="0 0 480 480"
            className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]"
          >
            <defs>
              <pattern id="blueprintGrid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M18 0H0V18" fill="none" stroke="#c3cede" strokeWidth="0.6" />
              </pattern>
            </defs>

            {/* Blueprint / planimetria sheet */}
            <g transform="rotate(-3 240 340)">
              <rect x="55" y="250" width="370" height="175" rx="10" fill="#fbfaf5" stroke="#dcd6c6" strokeWidth="2" />
              <rect x="67" y="262" width="346" height="151" fill="url(#blueprintGrid)" />
              <rect x="95" y="285" width="120" height="80" fill="none" stroke="#8fa0bd" strokeWidth="2" />
              <rect x="230" y="290" width="70" height="45" fill="none" stroke="#8fa0bd" strokeWidth="2" />
              <path d="M95 325h120M155 285v80" stroke="#8fa0bd" strokeWidth="1.5" />
              <circle cx="345" cy="360" r="22" fill="none" stroke="#8fa0bd" strokeWidth="2" />
            </g>

            {/* Soft shadow under house */}
            <ellipse cx="235" cy="322" rx="112" ry="16" fill="#171310" opacity="0.12" />

            {/* House body */}
            <rect x="150" y="185" width="180" height="140" rx="6" fill="#f4c542" />
            <rect x="150" y="185" width="180" height="140" rx="6" fill="#000000" opacity="0.04" />
            {/* round window */}
            <circle cx="205" cy="228" r="17" fill="#241f1a" />
            {/* small windows */}
            <rect x="270" y="245" width="28" height="28" rx="2" fill="#241f1a" />
            {/* door */}
            <rect x="222" y="257" width="36" height="68" rx="2" fill="#241f1a" />

            {/* Roof */}
            <path
              d="M120 195 L240 95 L360 195 L360 178 L246 82 C243 79.5 237 79.5 234 82 L120 178 Z"
              fill="#d71920"
            />
            <path d="M120 195 L240 95 L360 195" fill="none" stroke="#a3131a" strokeWidth="3" strokeLinejoin="round" />
            {/* chimney */}
            <rect x="318" y="108" width="20" height="34" fill="#d71920" stroke="#a3131a" strokeWidth="2" />

            {/* Keys */}
            <g transform="translate(60 372) rotate(-8)">
              <circle cx="0" cy="0" r="13" fill="none" stroke="#9aa0a6" strokeWidth="5" />
              <rect x="10" y="-3" width="34" height="6" rx="3" fill="#9aa0a6" />
              <rect x="40" y="-2" width="6" height="10" fill="#9aa0a6" />
              <rect x="50" y="-2" width="6" height="14" fill="#9aa0a6" />
            </g>
            <g transform="translate(66 372) rotate(14)">
              <rect x="10" y="-2.5" width="46" height="5" rx="2.5" fill="#b7bcc2" />
              <rect x="52" y="-1.5" width="5" height="8" fill="#b7bcc2" />
              <rect x="60" y="-1.5" width="5" height="11" fill="#b7bcc2" />
            </g>

            {/* Key tag / fob (echoes the logo tag) */}
            <g transform="translate(120 392) rotate(10)">
              <rect x="-18" y="-16" width="36" height="32" rx="8" fill="#d71920" stroke="#a3131a" strokeWidth="2" />
              <path
                d="M-9 0 L-2 8 L11 -8"
                fill="none"
                stroke="#f4c542"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Pen */}
            <g transform="translate(300 400) rotate(-24)">
              <rect x="-70" y="-7" width="140" height="14" rx="7" fill="#20201f" />
              <rect x="40" y="-7" width="18" height="14" fill="#f4c542" />
              <path d="M58 -7 L74 0 L58 7 Z" fill="#3a3a38" />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
