import { services } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function Services() {
  return (
    <section id="verifichiamo" className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Cosa verifichiamo
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Un controllo tecnico completo, prima di decidere
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/60">
            Dodici aree di verifica per darti un quadro chiaro e oggettivo
            dell&apos;immobile, prima della proposta o dell&apos;asta.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {services.map((service) => (
            <RevealItem key={service.title}>
              <div className="group h-full rounded-3xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_48px_-24px_rgba(23,19,16,0.28)]">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-cream text-ink transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                  <service.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                  {service.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
