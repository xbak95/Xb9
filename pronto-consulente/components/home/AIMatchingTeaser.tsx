import { Sparkles, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function AIMatchingTeaser() {
  return (
    <section className="section-y">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 px-6 py-14 text-center sm:px-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(200,155,74,0.22), transparent 45%)" }}
          />
          <div className="relative mx-auto max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-200">
              <Sparkles className="h-3.5 w-3.5" /> Matching intelligente
            </span>
            <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">Non sai quale consulente scegliere?</h2>
            <p className="mt-3 text-white/70">
              Raccontaci il tuo problema. Pronto Consulente analizzerà la richiesta e ti suggerirà i professionisti più adatti.
            </p>
            <ButtonLink href="/matching" variant="gold" size="lg" className="mt-7">
              Trova il mio consulente <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
