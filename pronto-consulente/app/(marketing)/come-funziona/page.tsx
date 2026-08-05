import type { Metadata } from "next";
import {
  Search,
  ListChecks,
  CalendarCheck2,
  Star,
  UserPlus,
  UserCog,
  Inbox,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";

export const metadata: Metadata = {
  title: "Come funziona",
  description:
    "Scopri come funziona Pronto Consulente: il percorso in 4 passi per trovare un consulente qualificato e come i professionisti pubblicano i propri servizi.",
};

const clientSteps = [
  {
    icon: Search,
    title: "Descrivi la tua esigenza",
    description:
      "Racconta in poche righe cosa ti serve — una consulenza fiscale, un bando da valutare, un audit di sicurezza — oppure sfoglia direttamente le 22 categorie disponibili.",
  },
  {
    icon: ListChecks,
    title: "Confronta i consulenti",
    description:
      "Valuta profili verificati con recensioni reali, prezzi trasparenti, tempi di risposta e portfolio di progetti simili al tuo. Filtra per settore, modalità e disponibilità.",
  },
  {
    icon: CalendarCheck2,
    title: "Prenota e paga in sicurezza",
    description:
      "Scegli data e orario direttamente dal calendario del consulente e completa il pagamento tramite il circuito sicuro della piattaforma: nessun bonifico anticipato a soggetti non verificati.",
  },
  {
    icon: Star,
    title: "Ricevi la consulenza e recensisci",
    description:
      "Svolgi la consulenza online, in presenza o in modalità ibrida, poi lascia una recensione verificata: aiuti altre imprese a scegliere e il consulente a costruire la propria reputazione.",
  },
];

const consultantSteps = [
  {
    icon: UserPlus,
    title: "Registrati",
    description:
      "Crea un account consulente con i tuoi dati professionali. La registrazione richiede pochi minuti; l'attivazione del profilo pubblico segue un processo di verifica.",
  },
  {
    icon: UserCog,
    title: "Crea il tuo profilo",
    description:
      "Aggiungi bio, competenze, certificazioni, esperienze lavorative e portfolio. Un profilo completo aumenta in modo significativo la visibilità nei risultati di ricerca.",
  },
  {
    icon: Inbox,
    title: "Ricevi richieste",
    description:
      "I clienti ti contattano direttamente o prenotano uno dei tuoi servizi pubblicati. Gestisci messaggi, preventivi e calendario da un'unica dashboard.",
  },
  {
    icon: Receipt,
    title: "Fatturati",
    description:
      "Al termine della consulenza ricevi il pagamento tramite la piattaforma ed emetti fattura in autonomia. Statistiche su visualizzazioni profilo e tasso di conversione ti aiutano a migliorare.",
  },
];

function StepList({ steps, ctaHref, ctaLabel }: { steps: typeof clientSteps; ctaHref: string; ctaLabel: string }) {
  return (
    <div>
      <ol className="grid gap-5 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Card key={s.title} as="li">
            <CardBody className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="mt-2 font-heading text-xs font-bold text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-sm text-body">{s.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </ol>
      <div className="mt-8">
        <ButtonLink href={ctaHref} size="lg" className="gap-2">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
}

export default function ComeFunzionaPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Come funziona
            </span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Un percorso chiaro, sia che tu cerchi sia che tu offra consulenza
            </h1>
            <p className="mt-5 text-lg text-body">
              Pronto Consulente collega domanda e offerta di consulenza professionale con un
              processo semplice, tracciato e sicuro dall'inizio alla fine. Scegli il percorso che
              ti riguarda.
            </p>
          </div>

          <div className="mt-10">
            <Tabs
              tabs={[
                {
                  id: "clienti",
                  label: "Per i clienti",
                  content: (
                    <StepList
                      steps={clientSteps}
                      ctaHref="/ricerca"
                      ctaLabel="Trova un consulente"
                    />
                  ),
                },
                {
                  id: "consulenti",
                  label: "Per i consulenti",
                  content: (
                    <StepList
                      steps={consultantSteps}
                      ctaHref="/registrati/consulente"
                      ctaLabel="Diventa consulente"
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold text-navy">Pagamenti protetti</h2>
              <p className="mt-2 text-sm text-body">
                Il pagamento viene trattenuto in sicurezza dalla piattaforma e rilasciato al
                consulente solo a consulenza confermata, secondo policy chiare di cancellazione e
                rimborso.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Verifiche reali</h2>
              <p className="mt-2 text-sm text-body">
                Identità, curriculum, certificazioni e partita IVA vengono controllati prima
                dell'attivazione del profilo pubblico. I badge in ogni profilo riflettono verifiche
                effettivamente superate.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Assistenza dedicata</h2>
              <p className="mt-2 text-sm text-body">
                In caso di dubbi durante la ricerca, la prenotazione o la gestione del profilo, il
                Centro Assistenza e il nostro team di supporto restano a disposizione.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
