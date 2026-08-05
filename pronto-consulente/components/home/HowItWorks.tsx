import { MessageSquareText, SlidersHorizontal, CalendarCheck2, Star } from "lucide-react";

const steps = [
  { icon: MessageSquareText, title: "Descrivi ciò di cui hai bisogno", description: "Racconta il tuo problema o scegli direttamente una categoria di consulenza." },
  { icon: SlidersHorizontal, title: "Confronta i consulenti", description: "Filtra per competenza, prezzo, località, disponibilità e recensioni verificate." },
  { icon: CalendarCheck2, title: "Prenota e paga in sicurezza", description: "Scegli data e orario, effettua il pagamento protetto e ricevi la conferma immediata." },
  { icon: Star, title: "Ricevi la consulenza e lascia una recensione", description: "Incontra il tuo consulente online o in presenza e condividi la tua esperienza." },
];

export function HowItWorks() {
  return (
    <section className="section-y bg-navy-950 text-white">
      <div className="container-px">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Come funziona</h2>
          <p className="mt-2 text-white/65">Dalla ricerca alla consulenza, in quattro passaggi semplici.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="font-heading text-4xl font-bold text-white/10">{String(i + 1).padStart(2, "0")}</span>
              <div className="-mt-7 flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-navy-900">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
