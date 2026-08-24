import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Termini di servizio",
  description: "Termini e condizioni di utilizzo dei servizi Casa in Chiaro.",
};

export default function TerminiPage() {
  return (
    <main className="container-x py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-red">
        <ArrowLeft className="size-4" /> Torna al sito
      </Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">Termini di servizio</h1>
      <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-ink/70">
        <p>
          I servizi di Casa in Chiaro consistono in verifiche tecnico-documentali
          indipendenti relative a immobili oggetto di compravendita o di procedure di
          asta giudiziaria. Ogni incarico è preceduto da un preventivo condiviso con il
          cliente.
        </p>
        <p>
          Casa in Chiaro opera come professionista indipendente, senza alcun interesse
          economico diretto nella compravendita, garantendo imparzialità nelle
          valutazioni fornite.
        </p>
      </div>
    </main>
  );
}
