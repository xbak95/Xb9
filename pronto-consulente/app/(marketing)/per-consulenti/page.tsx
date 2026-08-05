import type { Metadata } from "next";
import {
  UserCog,
  ListPlus,
  Inbox,
  CalendarClock,
  CreditCard,
  Star,
  BarChart3,
  ArrowRight,
  Check,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans } from "@/data/pricing-plans";

export const metadata: Metadata = {
  title: "Per i consulenti",
  description:
    "Trasforma le tue competenze in nuove opportunità: crea il profilo, pubblica i tuoi servizi e ricevi richieste qualificate su Pronto Consulente.",
};

const advantages = [
  {
    icon: UserCog,
    title: "Crea il profilo",
    description:
      "Presenta competenze, certificazioni, esperienze e portfolio con un profilo curato che trasmette autorevolezza fin dal primo sguardo.",
  },
  {
    icon: ListPlus,
    title: "Pubblica i tuoi servizi",
    description:
      "Definisci prezzo, durata e modalità di erogazione per ogni servizio: i clienti sanno esattamente cosa aspettarsi prima di contattarti.",
  },
  {
    icon: Inbox,
    title: "Ricevi richieste qualificate",
    description:
      "Le richieste arrivano da chi ha già letto il tuo profilo e confrontato le alternative: meno tempo perso, più conversioni.",
  },
  {
    icon: CalendarClock,
    title: "Gestisci l'agenda",
    description:
      "Calendario integrato con disponibilità sempre aggiornata: niente più scambi infiniti di email per trovare un orario comune.",
  },
  {
    icon: CreditCard,
    title: "Farsi pagare online",
    description:
      "Pagamenti sicuri gestiti dalla piattaforma, con accredito automatico a consulenza confermata e nessuna gestione manuale degli incassi.",
  },
  {
    icon: Star,
    title: "Migliora la reputazione",
    description:
      "Recensioni verificate al termine di ogni consulenza costruiscono una reputazione solida, visibile a tutti i potenziali clienti.",
  },
  {
    icon: BarChart3,
    title: "Statistiche e strumenti commerciali",
    description:
      "Visualizzazioni profilo, tasso di conversione, valore medio delle prenotazioni: dati concreti per capire cosa funziona e migliorare l'offerta.",
  },
];

export default function PerConsulentiPage() {
  return (
    <div>
      <section className="section-y bg-navy">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Per i consulenti
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Trasforma le tue competenze in nuove opportunità
            </h1>
            <p className="mt-5 text-lg text-navy-100">
              Migliaia di imprese cercano ogni settimana professionisti qualificati su Pronto
              Consulente. Costruisci un profilo che lavora per te, ricevi richieste in linea con le
              tue competenze e gestisci l'intero rapporto di lavoro — dalla prima richiesta alla
              fattura — in un solo posto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/registrati/consulente" size="lg" variant="gold" className="gap-2">
                Diventa consulente
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/come-funziona" size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                Scopri come funziona
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Tutto ciò che serve per lavorare bene, in un unico posto</h2>
            <p className="mt-3 text-body">
              Non ti offriamo solo visibilità: ti diamo gli strumenti operativi per gestire il tuo
              lavoro di consulente in modo professionale.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <Card key={a.title}>
                <CardBody>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm text-body">{a.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold">Un piano per ogni fase della tua attività</h2>
              <p className="mt-3 text-body">
                Inizia gratis e passa a un piano superiore quando vuoi aumentare visibilità e
                strumenti commerciali. I prezzi definitivi saranno comunicati a breve.
              </p>
            </div>
            <ButtonLink href="/prezzi" variant="outline" className="gap-2">
              Vedi tutti i piani
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.featured ? "border-gold-300 ring-2 ring-gold-200" : undefined}
              >
                <CardBody>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-navy">{plan.name}</h3>
                    {plan.featured && <Badge tone="gold">Più scelto</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-body">{plan.tagline}</p>
                  <p className="mt-5 font-heading text-2xl font-bold text-navy">{plan.price}</p>
                  <p className="mt-1 text-xs text-body">{plan.commission}</p>
                  <ul className="mt-5 space-y-2.5">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href="/prezzi"
                    variant={plan.featured ? "gold" : "outline"}
                    fullWidth
                    className="mt-6"
                  >
                    Scopri il piano {plan.name}
                  </ButtonLink>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px">
          <Card className="bg-navy-900 text-white">
            <CardBody className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Pronto a far crescere la tua attività di consulenza?
                </h2>
                <p className="mt-2 max-w-xl text-navy-100">
                  La registrazione richiede pochi minuti. Il tuo profilo sarà revisionato e
                  attivato dopo il processo di verifica.
                </p>
              </div>
              <ButtonLink href="/registrati/consulente" size="lg" variant="gold" className="shrink-0 gap-2">
                Diventa consulente
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
