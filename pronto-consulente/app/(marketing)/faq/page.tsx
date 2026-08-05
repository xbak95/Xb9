import type { Metadata } from "next";
import { UserRound, CalendarCheck2, CreditCard, Briefcase, ShieldCheck } from "lucide-react";
import { Accordion } from "@/components/faq/Accordion";
import type { FAQItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Domande frequenti",
  description:
    "Le risposte alle domande più comuni su Pronto Consulente: account, prenotazioni, pagamenti, consulenti, sicurezza e privacy.",
};

const categories: { id: string; title: string; icon: typeof UserRound; items: FAQItem[] }[] = [
  {
    id: "account",
    title: "Account",
    icon: UserRound,
    items: [
      {
        question: "Come creo un account su Pronto Consulente?",
        answer:
          "Puoi registrarti come cliente o come consulente dal pulsante \"Accedi\" in alto: bastano email, password e alcune informazioni di base. La registrazione come consulente prevede anche un passaggio di verifica del profilo prima della pubblicazione.",
      },
      {
        question: "Posso avere sia un profilo cliente sia un profilo consulente?",
        answer:
          "Sì, i due ruoli sono gestibili con lo stesso indirizzo email ma restano distinti nella piattaforma: potrai passare dall'uno all'altro dal menu del tuo account.",
      },
      {
        question: "Come modifico i miei dati personali?",
        answer:
          "Dalla sezione \"Impostazioni account\" della tua dashboard puoi aggiornare in qualsiasi momento nome, email, numero di telefono e preferenze di notifica.",
      },
      {
        question: "Come chiudo definitivamente il mio account?",
        answer:
          "Puoi richiedere la chiusura dell'account dalle impostazioni oppure scrivendo al nostro team di assistenza. I dati verranno trattati secondo quanto descritto nella nostra informativa privacy.",
      },
    ],
  },
  {
    id: "prenotazioni",
    title: "Prenotazioni",
    icon: CalendarCheck2,
    items: [
      {
        question: "Come prenoto una consulenza?",
        answer:
          "Dopo aver individuato il consulente e il servizio che ti interessano, seleziona data e orario disponibili dal calendario del profilo e completa il pagamento: riceverai una conferma via email con tutti i dettagli.",
      },
      {
        question: "Posso cancellare o riprogrammare una prenotazione?",
        answer:
          "Sì. La policy standard prevede cancellazione gratuita fino a 24 ore prima dell'appuntamento e la possibilità di riprogrammare una volta senza costi con almeno 12 ore di preavviso. Alcune policy possono variare da consulente a consulente: vengono sempre mostrate prima della conferma.",
      },
      {
        question: "Cosa succede se il consulente non si presenta?",
        answer:
          "In caso di mancata presentazione del consulente hai diritto al rimborso integrale dell'importo pagato. Ti invitiamo a segnalarlo tramite l'apposita funzione dalla tua area riservata.",
      },
      {
        question: "Come funzionano le consulenze online?",
        answer:
          "Per le consulenze in modalità online riceverai un link alla videochiamata direttamente in piattaforma prima dell'appuntamento, insieme a un promemoria via email.",
      },
    ],
  },
  {
    id: "pagamenti",
    title: "Pagamenti",
    icon: CreditCard,
    items: [
      {
        question: "Quali metodi di pagamento sono accettati?",
        answer:
          "Puoi pagare con le principali carte di credito e debito. Il pagamento avviene sempre tramite il circuito sicuro della piattaforma, mai con bonifico diretto al consulente.",
      },
      {
        question: "Quando viene addebitato l'importo?",
        answer:
          "L'importo viene trattenuto in sicurezza al momento della prenotazione e reso disponibile al consulente solo dopo lo svolgimento della consulenza, secondo le policy indicate nel profilo.",
      },
      {
        question: "Come richiedo un rimborso?",
        answer:
          "Se hai diritto a un rimborso secondo la policy di cancellazione applicabile, puoi richiederlo dalla sezione \"Le mie prenotazioni\": verrà elaborato entro pochi giorni lavorativi sullo stesso metodo di pagamento utilizzato.",
      },
      {
        question: "Ricevo una fattura per la consulenza acquistata?",
        answer:
          "Sì, riceverai la documentazione fiscale relativa alla consulenza secondo le modalità previste dal consulente o dallo studio professionale che ha erogato il servizio.",
      },
    ],
  },
  {
    id: "consulenti",
    title: "Consulenti",
    icon: Briefcase,
    items: [
      {
        question: "Come vengono selezionati i consulenti sulla piattaforma?",
        answer:
          "Ogni consulente attraversa un processo di verifica che comprende identità, esperienza professionale dichiarata e, dove applicabile, certificazioni e partita IVA, prima che il profilo diventi pubblico.",
      },
      {
        question: "Come faccio a capire se un consulente è affidabile?",
        answer:
          "Ogni profilo mostra badge di verifica, recensioni verificate da clienti reali, tempo medio di risposta e statistiche sulle consulenze completate: elementi pensati per aiutarti a scegliere con consapevolezza.",
      },
      {
        question: "Posso contattare un consulente prima di prenotare?",
        answer:
          "Sì, puoi inviare un messaggio diretto per chiarire dettagli sul servizio prima di procedere con la prenotazione e il pagamento.",
      },
    ],
  },
  {
    id: "sicurezza",
    title: "Sicurezza e privacy",
    icon: ShieldCheck,
    items: [
      {
        question: "Come vengono protetti i miei dati personali?",
        answer:
          "Trattiamo i dati nel rispetto del GDPR, con misure tecniche e organizzative adeguate. Puoi consultare i dettagli completi nella nostra Informativa Privacy.",
      },
      {
        question: "Come segnalo un profilo o un contenuto sospetto?",
        answer:
          "Puoi utilizzare l'apposito modulo nella pagina \"Segnalazioni\", disponibile da ogni profilo consulente e dal footer del sito. Il nostro team modera ogni segnalazione entro 48 ore.",
      },
      {
        question: "I pagamenti sono davvero sicuri?",
        answer:
          "Tutti i pagamenti sono gestiti tramite fornitori di pagamento certificati, con trattenuta in sicurezza fino al completamento della consulenza per tutelare sia clienti sia consulenti.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">FAQ</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Domande frequenti</h1>
            <p className="mt-5 text-lg text-body">
              Le risposte alle domande che ci vengono poste più spesso, organizzate per
              argomento. Non trovi quello che cerchi? Visita il{" "}
              <a href="/centro-assistenza" className="font-medium text-institutional underline underline-offset-2">
                Centro assistenza
              </a>{" "}
              o{" "}
              <a href="/contatti" className="font-medium text-institutional underline underline-offset-2">
                contattaci
              </a>
              .
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {categories.map((cat) => (
              <div key={cat.id} id={cat.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy">{cat.title}</h2>
                </div>
                <Accordion items={cat.items} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
