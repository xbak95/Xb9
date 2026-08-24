import { steps } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="come-lavoriamo" className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Come lavoriamo
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Un percorso semplice, in quattro passaggi
          </h2>
        </Reveal>

        <RevealGroup className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          <div
            aria-hidden
            className="absolute top-8 left-0 right-0 hidden h-px bg-ink/10 lg:block"
          />
          {steps.map((step, index) => (
            <RevealItem key={step.title} className="relative">
              <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative flex size-16 items-center justify-center rounded-2xl bg-white text-brand-red shadow-[0_14px_30px_-12px_rgba(23,19,16,0.25)]">
                  <step.icon className="size-7" />
                  <span className="absolute -top-3 -right-3 flex size-7 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white shadow">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
