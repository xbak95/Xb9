import { Check } from "lucide-react";

import { reasons } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function WhyUs() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Perché sceglierci
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Perché scegliere Casa in Chiaro
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {reasons.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="flex h-full gap-4 rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(23,19,16,0.04)]">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                  <Check className="size-4" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{reason.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/60">
                    {reason.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
