import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy di Casa in Chiaro.",
};

export default function PrivacyPage() {
  return (
    <main className="container-x py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-red">
        <ArrowLeft className="size-4" /> Torna al sito
      </Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">Privacy Policy</h1>
      <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-ink/70">
        <p>
          Casa in Chiaro tratta i dati personali forniti dagli utenti esclusivamente per
          l&apos;erogazione dei servizi di assistenza tecnico-normativa alla compravendita
          immobiliare richiesti, nel rispetto del Regolamento (UE) 2016/679 (GDPR).
        </p>
        <p>
          I documenti e i dati condivisi con Casa in Chiaro sono trattati con la massima
          riservatezza e non vengono ceduti a terzi se non nell&apos;ambito delle
          collaborazioni professionali necessarie all&apos;espletamento dell&apos;incarico.
        </p>
        <p>
          Per esercitare i diritti previsti dagli articoli 15-22 del GDPR, è possibile
          contattarci all&apos;indirizzo info@casainchiaro.it.
        </p>
      </div>
    </main>
  );
}
