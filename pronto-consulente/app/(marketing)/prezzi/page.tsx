import type { Metadata } from "next";
import { Check, X, Info } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { pricingPlans } from "@/data/pricing-plans";

export const metadata: Metadata = {
  title: "Prezzi per i consulenti",
  description:
    "Confronta i piani Base, Professional e Premium per consulenti su Pronto Consulente: funzionalità, commissioni e domande frequenti sui prezzi.",
};

const comparisonRows: { label: string; base: boolean | string; professional: boolean | string; premium: boolean | string }[] = [
  { label: "Profilo pubblico verificato", base: true, professional: true, premium: true },
  { label: "Servizi pubblicabili", base: "Fino a 3", professional: "Illimitati", premium: "Illimitati" },
  { label: "Messaggistica con i clienti", base: true, professional: true, premium: true },
  { label: "Recensioni verificate", base: true, professional: true, premium: true },
  { label: "Portfolio e case study", base: false, professional: true, premium: true },
  { label: "Statistiche di base", base: true, professional: true, premium: true },
  { label: "Statistiche avanzate e tasso di conversione", base: false, professional: true, premium: true },
  { label: "Visibilità nei risultati di ricerca", base: "Standard", professional: "Maggiorata", premium: "Prioritaria" },
  { label: "Calendario avanzato e sincronizzazione", base: false, professional: true, premium: true },
  { label: "Lead qualificati assegnati", base: false, professional: false, premium: true },
  { label: "Strumenti AI per matching e proposte", base: false, professional: false, premium: true },
  { label: "CRM clienti integrato", base: false, professional: false, premium: true },
  { label: "Supporto prioritario dedicato", base: false, professional: false, premium: true },
];

const faqs = [
  {
    question: "Quando saranno disponibili i prezzi definitivi?",
    answer:
      "I prezzi dei piani Professional e Premium sono in fase di definizione insieme ai primi consulenti della community. Verranno comunicati con largo anticipo prima di qualsiasi attivazione a pagamento, con condizioni dedicate per chi si iscrive in questa fase.",
  },
  {
    question: "Come funziona la commissione sulle prenotazioni?",
    answer:
      "Oltre all'eventuale canone del piano, la piattaforma applica una commissione sulle prenotazioni concluse con successo, per coprire pagamenti sicuri, gestione dispute e assistenza. La percentuale varia in base al piano scelto ed è sempre indicata prima della conferma.",
  },
  {
    question: "Posso cambiare piano in qualsiasi momento?",
    answer:
      "Sì. Potrai passare a un piano superiore o tornare a un piano inferiore dalla tua dashboard consulente in qualsiasi momento, senza vincoli di durata minima previsti.",
  },
  {
    question: "Il piano Base è gratuito per sempre?",
    answer:
      "Il piano Base non prevede canone fisso: resta l'opzione di ingresso pensata per chi vuole iniziare a farsi trovare sulla piattaforma con un profilo pubblico verificato.",
  },
  {
    question: "Ci sono costi per i clienti che prenotano una consulenza?",
    answer:
      "Il prezzo mostrato in ogni servizio è quello che il cliente paga per la consulenza. Eventuali costi di servizio applicati in fase di pagamento vengono sempre mostrati con chiarezza prima della conferma dell'ordine.",
  },
];

function CellIcon({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm text-ink">{value}</span>;
  return value ? (
    <Check className="mx-auto h-4 w-4 text-verified" />
  ) : (
    <X className="mx-auto h-4 w-4 text-body/50" />
  );
}

export default function PrezziPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Prezzi
            </span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Un piano per ogni fase della tua attività</h1>
            <p className="mt-5 text-lg text-body">
              Scegli il piano più adatto al tuo modo di lavorare: dalla presenza gratuita alla
              suite completa di strumenti commerciali per studi e professionisti strutturati.
            </p>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <p className="text-sm text-gold-900">
              I prezzi definitivi saranno comunicati a breve — i valori mostrati in questa pagina
              sono indicativi e non costituiscono un'offerta commerciale vincolante.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.featured ? "relative border-gold-300 ring-2 ring-gold-200" : "relative"}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="gold">Più scelto</Badge>
                  </div>
                )}
                <CardBody className="pt-8">
                  <h2 className="font-heading text-xl font-bold text-navy">{plan.name}</h2>
                  <p className="mt-1 text-sm text-body">{plan.tagline}</p>
                  <p className="mt-6 font-heading text-3xl font-bold text-navy">{plan.price}</p>
                  <p className="mt-1 text-xs text-body">{plan.commission}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href="/registrati/consulente"
                    variant={plan.featured ? "gold" : "outline"}
                    fullWidth
                    className="mt-8"
                  >
                    Scegli {plan.name}
                  </ButtonLink>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <h2 className="text-3xl font-bold">Confronta le funzionalità</h2>
          <p className="mt-3 max-w-2xl text-body">
            Uno sguardo d'insieme su cosa include ogni piano, funzionalità per funzionalità.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-navy-100">
                  <th className="p-4 text-sm font-semibold text-navy">Funzionalità</th>
                  <th className="p-4 text-center text-sm font-semibold text-navy">Base</th>
                  <th className="p-4 text-center text-sm font-semibold text-navy">Professional</th>
                  <th className="p-4 text-center text-sm font-semibold text-navy">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? "bg-muted/50" : undefined}>
                    <td className="p-4 text-sm text-ink">{row.label}</td>
                    <td className="p-4 text-center"><CellIcon value={row.base} /></td>
                    <td className="p-4 text-center"><CellIcon value={row.professional} /></td>
                    <td className="p-4 text-center"><CellIcon value={row.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px">
          <h2 className="text-3xl font-bold">Domande frequenti sui prezzi</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-base font-semibold text-navy">{f.question}</h3>
                <p className="mt-2 text-sm text-body">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
