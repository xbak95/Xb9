import { BadgeCheck, Tag, MessageSquareQuote, CalendarClock, ShieldCheck, Video, UserCheck, Headset } from "lucide-react";

const points = [
  { icon: BadgeCheck, title: "Curriculum e identità verificati", description: "Ogni profilo passa un controllo su identità, CV e certificazioni." },
  { icon: Tag, title: "Tariffe chiare", description: "Prezzi visibili fin da subito, senza sorprese o costi nascosti." },
  { icon: MessageSquareQuote, title: "Recensioni di clienti reali", description: "Solo chi ha completato una consulenza può lasciare una recensione." },
  { icon: CalendarClock, title: "Disponibilità aggiornata", description: "Calendari sincronizzati per prenotare solo slot realmente liberi." },
  { icon: ShieldCheck, title: "Pagamenti protetti", description: "Transazioni sicure, con rimborso garantito in caso di mancata consulenza." },
  { icon: Video, title: "Online o in presenza", description: "Scegli la modalità più comoda per te, in ogni fase del percorso." },
  { icon: UserCheck, title: "Professionisti selezionati", description: "Accettiamo solo consulenti che rispettano i nostri standard di qualità." },
  { icon: Headset, title: "Supporto clienti", description: "Un team dedicato ti assiste prima, durante e dopo la consulenza." },
];

export function WhyUs() {
  return (
    <section className="section-y">
      <div className="container-px">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Perché scegliere Pronto Consulente</h2>
          <p className="mt-2 text-body">Gli stessi standard di una grande società di consulenza, con la semplicità di una piattaforma digitale.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div key={p.title} className="flex flex-col items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-[15px] font-semibold text-navy">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
