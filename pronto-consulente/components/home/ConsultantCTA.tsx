import { UserPlus2, PackagePlus, Inbox, CalendarCog, CreditCard, TrendingUp, LineChart } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const capabilities = [
  { icon: UserPlus2, label: "Creare il profilo" },
  { icon: PackagePlus, label: "Pubblicare servizi" },
  { icon: Inbox, label: "Ricevere richieste" },
  { icon: CalendarCog, label: "Gestire l'agenda" },
  { icon: CreditCard, label: "Farsi pagare online" },
  { icon: TrendingUp, label: "Migliorare la reputazione" },
  { icon: LineChart, label: "Statistiche e strumenti commerciali" },
];

export function ConsultantCTA() {
  return (
    <section className="section-y">
      <div className="container-px">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-navy-100 bg-white p-8 shadow-card sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Trasforma le tue competenze in nuove opportunità.</h2>
            <p className="mt-3 text-body">
              Pronto Consulente ti dà gli strumenti per farti trovare dai clienti giusti, gestire l'agenda e farti pagare in sicurezza — tutto da un'unica piattaforma.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/registrati/consulente" variant="primary" size="lg">
                Diventa consulente
              </ButtonLink>
              <ButtonLink href="/per-consulenti" variant="outline" size="lg">
                Scopri i vantaggi
              </ButtonLink>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.label} className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3.5 text-sm font-medium text-navy-800">
                <c.icon className="h-4.5 w-4.5 shrink-0 text-institutional" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
