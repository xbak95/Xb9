import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politica dei cookie",
  description:
    "Politica dei cookie di Pronto Consulente: tipologie di cookie utilizzati, finalità e modalità di gestione delle preferenze.",
};

const cookieTable = [
  {
    category: "Cookie tecnici",
    purpose: "Necessari al funzionamento del sito: autenticazione, sicurezza, memorizzazione delle preferenze di sessione.",
    consent: "Non richiesto",
  },
  {
    category: "Cookie funzionali",
    purpose: "Ricordano le preferenze dell'utente (lingua, filtri di ricerca salvati) per migliorare l'esperienza di navigazione.",
    consent: "Non richiesto",
  },
  {
    category: "Cookie analitici",
    purpose: "Raccolgono dati aggregati e anonimizzati sull'utilizzo del sito per comprenderne l'utilizzo e migliorarlo.",
    consent: "Richiesto",
  },
  {
    category: "Cookie di profilazione/marketing",
    purpose: "Utilizzati da terze parti per mostrare comunicazioni promozionali pertinenti agli interessi dell'utente.",
    consent: "Richiesto",
  },
];

const sections = [
  {
    title: "1. Cosa sono i cookie",
    body: [
      "I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell'utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Svolgono funzioni diverse: dal mantenimento della sessione di navigazione alla memorizzazione di preferenze, fino all'analisi statistica dell'utilizzo del sito.",
    ],
  },
  {
    title: "2. Tipologie di cookie utilizzati",
    body: [
      "La tabella seguente riassume le categorie di cookie utilizzate sulla Piattaforma, la relativa finalità e se sia richiesto il consenso preventivo dell'utente.",
    ],
  },
  {
    title: "3. Cookie di terze parti",
    body: [
      "Alcuni cookie possono essere installati da servizi di terze parti integrati nella Piattaforma (ad esempio strumenti di analisi statistica o di pagamento). Il trattamento effettuato tramite tali cookie è disciplinato dalle rispettive informative privacy dei fornitori terzi, di cui consigliamo la consultazione.",
    ],
  },
  {
    title: "4. Come gestire le preferenze sui cookie",
    body: [
      "Al primo accesso alla Piattaforma viene mostrato un banner che consente di accettare, rifiutare o personalizzare l'uso dei cookie non tecnici. Le preferenze possono essere modificate in qualsiasi momento tramite il link \"Preferenze cookie\" presente nel footer del sito.",
      "È inoltre possibile gestire o disabilitare i cookie direttamente dalle impostazioni del proprio browser; si segnala che la disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento di alcune funzionalità della Piattaforma.",
    ],
  },
  {
    title: "5. Durata dei cookie",
    body: [
      "I cookie di sessione vengono eliminati alla chiusura del browser. I cookie persistenti restano memorizzati sul dispositivo per un periodo che varia in base alla finalità, generalmente non superiore a 12 mesi, salvo rinnovo del consenso.",
    ],
  },
  {
    title: "6. Aggiornamenti alla presente politica",
    body: [
      "La presente Politica dei Cookie può essere aggiornata periodicamente per riflettere modifiche normative, tecnologiche o nei servizi di terze parti integrati. Si consiglia di consultare periodicamente questa pagina.",
    ],
  },
];

export default function CookiePage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">Documenti legali</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Politica dei cookie</h1>
          <p className="mt-4 text-sm text-body">Ultimo aggiornamento: {formatDate("2026-08-05")}</p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <p className="text-sm text-gold-900">
              Documento dimostrativo — da far validare da un legale prima della pubblicazione in
              produzione. I testi presenti in questa pagina hanno finalità illustrativa e non
              costituiscono consulenza legale.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {sections.slice(0, 2).map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-bold text-navy">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2.5 text-sm leading-relaxed text-body">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-card">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="p-4 text-sm font-semibold text-navy">Categoria</th>
                    <th className="p-4 text-sm font-semibold text-navy">Finalità</th>
                    <th className="p-4 text-sm font-semibold text-navy">Consenso</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={row.category} className={i % 2 === 1 ? "bg-muted/50" : undefined}>
                      <td className="p-4 align-top text-sm font-medium text-ink">{row.category}</td>
                      <td className="p-4 align-top text-sm text-body">{row.purpose}</td>
                      <td className="p-4 align-top text-sm text-body">{row.consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sections.slice(2).map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-bold text-navy">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2.5 text-sm leading-relaxed text-body">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
