import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informativa sui cookie di Casa in Chiaro.",
};

export default function CookiePage() {
  return (
    <main className="container-x py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-red">
        <ArrowLeft className="size-4" /> Torna al sito
      </Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">Cookie Policy</h1>
      <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-ink/70">
        <p>
          Questo sito utilizza esclusivamente cookie tecnici necessari al corretto
          funzionamento delle pagine. Non vengono utilizzati cookie di profilazione di
          terze parti.
        </p>
        <p>
          È possibile disabilitare i cookie in qualsiasi momento tramite le impostazioni
          del proprio browser, senza pregiudicare la normale navigazione del sito.
        </p>
      </div>
    </main>
  );
}
