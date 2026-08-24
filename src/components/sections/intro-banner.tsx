"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function IntroBanner() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="container-x">
        <div className="relative grid items-center overflow-hidden rounded-[2rem] bg-cream lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
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
            className="relative h-64 lg:h-full lg:min-h-[380px]"
          >
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 20%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 20%)",
              }}
            >
              <Image
                src="/hero-banner-houses.jpg"
                alt="Fila di casette modello, una evidenziata con cartellino di verifica"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
