import { Building, Gavel, Home, Landmark, ScaleIcon, Users2 } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const audiences = [
  { icon: Home, label: "Privati che acquistano casa" },
  { icon: Building, label: "Privati che vendono casa" },
  { icon: Gavel, label: "Chi partecipa ad aste giudiziarie" },
  { icon: Landmark, label: "Agenzie immobiliari" },
  { icon: ScaleIcon, label: "Studi legali e notarili" },
  { icon: Users2, label: "Investitori immobiliari" },
];

export function ForWho() {
  return (
    <section id="per-chi" className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Per chi
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Un servizio pensato per chi vuole decidere con consapevolezza
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {audiences.map((item) => (
            <RevealItem key={item.label}>
              <div className="flex items-center gap-4 rounded-2xl border border-ink/8 bg-white px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-18px_rgba(23,19,16,0.25)]">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-yellow-light text-brand-yellow-dark">
                  <item.icon className="size-5" />
                </div>
                <span className="font-medium text-ink/80">{item.label}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
