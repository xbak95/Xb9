import { advantages } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function Advantages() {
  return (
    <section className="relative -mt-2 pb-20 sm:pb-28">
      <div className="container-x">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full rounded-3xl border border-ink/8 bg-white p-7 shadow-[0_1px_2px_rgba(23,19,16,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(23,19,16,0.25)]">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-red-light text-brand-red transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
