import { Lock, Target, Clock3, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const footNotes = [
  { icon: Lock, label: "Indipendenti e imparziali (non siamo un'agenzia)" },
  { icon: Target, label: "Report chiaro e comprensibile con soluzioni suggerite" },
  { icon: Clock3, label: "Tempi rapidi e massima riservatezza" },
  { icon: BadgeCheck, label: "Un unico interlocutore per tutte le verifiche" },
];

export function CtaBanner() {
  return (
    <section className="py-6 sm:py-10">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-red px-8 py-14 text-white sm:px-16 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-brand-yellow/20"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-balance font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  Hai un immobile da comprare, vendere o valutare?
                </h2>
                <p className="mt-3 text-white/80">
                  Richiedi una verifica e acquista con serenità.
                </p>
              </div>
              <Button asChild size="lg" variant="accent" className="shrink-0">
                <a href="mailto:info@casainchiaro.it">Contattaci ora</a>
              </Button>
            </div>

            <div className="relative mt-12 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {footNotes.map((note) => (
                <div key={note.label} className="flex items-start gap-3 text-sm text-white/85">
                  <note.icon className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
                  <span>{note.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
