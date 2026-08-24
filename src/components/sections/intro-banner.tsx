"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type HouseProps = {
  cx: number;
  scale: number;
  variant: "muted" | "highlight";
};

function ModelHouse({ cx, scale, variant }: HouseProps) {
  const w = 130 * scale;
  const h = 110 * scale;
  const roofH = 66 * scale;
  const baseY = 360;
  const bodyTop = baseY - h;
  const roofTip = bodyTop - roofH;
  const isHighlight = variant === "highlight";

  const body = isHighlight ? "#f4c542" : "#f3f1ec";
  const roof = isHighlight ? "#d71920" : "#e4e1d8";
  const stroke = isHighlight ? "#b0141a" : "#c9c6bc";
  const accent = isHighlight ? "#d71920" : "#c9c6bc";
  const door = isHighlight ? "#3a2f1c" : "#cfccc2";
  const opacity = isHighlight ? 1 : 0.85;

  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={baseY + 6} rx={w * 0.62} ry={7 * scale} fill="#171310" opacity={0.08} />
      <rect
        x={cx - w / 2}
        y={bodyTop}
        width={w}
        height={h}
        rx={3 * scale}
        fill={body}
        stroke={stroke}
        strokeWidth={2}
      />
      <path
        d={`M${cx - w / 2 - 6 * scale} ${bodyTop} L${cx} ${roofTip} L${cx + w / 2 + 6 * scale} ${bodyTop} Z`}
        fill={roof}
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={bodyTop + h * 0.32} r={7.5 * scale} fill="none" stroke={accent} strokeWidth={2.5} />
      <rect
        x={cx - 9 * scale}
        y={baseY - 24 * scale}
        width={18 * scale}
        height={24 * scale}
        rx={1.5 * scale}
        fill={door}
      />
    </g>
  );
}

export function IntroBanner() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 -right-32 size-[480px] rounded-full bg-brand-yellow/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 -left-32 size-[360px] rounded-full bg-brand-yellow/15 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h2 className="text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Prima di comprare o vendere casa, verifica.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink/65">
            Casa in chiaro offre assistenza tecnico-normativa alla
            compravendita immobiliare, aiutandoti a controllare documenti,
            conformità edilizia, urbanistica e catastale prima della
            proposta, del preliminare o del rogito.
          </p>
          <p className="mt-5 font-display text-lg font-bold text-brand-red">
            Non vendiamo case.
          </p>
          <p className="font-display text-lg font-bold text-ink">
            Verifichiamo ciò che stai per comprare o vendere.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contatti">Sto comprando casa</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contatti">Sto vendendo casa</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[750/420] w-full max-w-[620px]"
        >
          <svg
            aria-hidden
            viewBox="0 0 750 420"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <ModelHouse cx={65} scale={0.68} variant="muted" />
            <ModelHouse cx={210} scale={0.86} variant="muted" />
            <ModelHouse cx={390} scale={1.2} variant="highlight" />
            <ModelHouse cx={565} scale={0.94} variant="muted" />
            <ModelHouse cx={700} scale={0.72} variant="muted" />

            {/* key tag hanging from the highlighted house */}
            <g transform="translate(300 318) scale(1.3) rotate(15)">
              <path
                d="M0 -18 Q26 -30 46 -6"
                fill="none"
                stroke="#3a3a38"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect x="-2" y="-2" width="40" height="34" rx="9" fill="#d71920" stroke="#b0141a" strokeWidth="2" />
              <circle cx="10" cy="7" r="3.2" fill="none" stroke="#f4c542" strokeWidth="2" />
              <path
                d="M6 20 L14 27 L30 8"
                fill="none"
                stroke="#241f1a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
