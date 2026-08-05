import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  UserRound,
  Briefcase,
  CreditCard,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  MessageSquareText,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Centro assistenza",
  description:
    "Hub di supporto di Pronto Consulente: trova risposte per clienti e consulenti su prenotazioni, pagamenti, account e sicurezza, oppure contatta il nostro team.",
};

const topics = [
  {
    icon: UserRound,
    title: "Per i clienti",
    description:
      "Come cercare un consulente, confrontare i profili, prenotare una consulenza e gestire le tue richieste.",
  },
  {
    icon: Briefcase,
    title: "Per i consulenti",
    description:
      "Creazione del profilo, pubblicazione dei servizi, gestione dell'agenda e strumenti per far crescere la tua attività.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti",
    description:
      "Metodi di pagamento accettati, tempistiche di accredito, fatturazione, rimborsi e cancellazioni.",
  },
  {
    icon: KeyRound,
    title: "Account",
    description:
      "Registrazione, accesso, modifica dei dati personali, notifiche e chiusura dell'account.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza",
    description:
      "Verifica dei profili, protezione dei dati, segnalazione di contenuti o comportamenti sospetti.",
  },
];

export default function CentroAssistenzaPage() {
  return (
    <div>
      <section className="section-y bg-navy">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Centro assistenza
            </span>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Come possiamo aiutarti?</h1>
            <p className="mt-5 text-lg text-navy-100">
              Cerca una risposta tra le nostre guide oppure sfoglia le categorie di aiuto qui
              sotto. Se non trovi ciò che cerchi, il nostro team è a disposizione.
            </p>
          </div>

          <form
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-premium"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Cerca nel centro assistenza"
          >
            <Search className="ml-2 h-5 w-5 shrink-0 text-body" />
            <input
              type="search"
              placeholder="Cerca una domanda, ad esempio “come cancello una prenotazione”"
              className="h-11 w-full border-0 bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="hidden h-11 shrink-0 items-center rounded-xl bg-navy px-5 text-sm font-medium text-white hover:bg-navy-800 sm:flex"
            >
              Cerca
            </button>
          </form>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px">
          <h2 className="text-3xl font-bold">Sfoglia per categoria</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <Card key={t.title} hover>
                <CardBody>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{t.title}</h3>
                  <p className="mt-2 text-sm text-body">{t.description}</p>
                  <Link
                    href="/faq"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:text-navy-800"
                  >
                    Vedi le domande
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardBody className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-navy">Domande frequenti</h3>
                <p className="text-sm text-body">
                  Consulta le risposte alle domande più comuni su account, prenotazioni,
                  pagamenti, consulenti, sicurezza e privacy.
                </p>
                <ButtonLink href="/faq" variant="outline" className="mt-1 self-start gap-2">
                  Vai alle FAQ
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-navy">Non hai trovato risposta?</h3>
                <p className="text-sm text-body">
                  Scrivi al nostro team di assistenza: rispondiamo generalmente entro un giorno
                  lavorativo.
                </p>
                <ButtonLink href="/contatti" variant="outline" className="mt-1 self-start gap-2">
                  Contattaci
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
