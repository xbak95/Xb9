import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politica di cancellazione",
  description:
    "Politica di cancellazione, riprogrammazione e rimborso di Pronto Consulente per le consulenze prenotate sulla piattaforma.",
};

const sections = [
  {
    title: "1. Ambito di applicazione",
    body: [
      "La presente Politica di Cancellazione disciplina le condizioni standard applicabili alle prenotazioni di servizi di consulenza effettuate tramite Pronto Consulente, salvo condizioni specifiche e più favorevoli al Cliente eventualmente indicate dal singolo Consulente nel proprio profilo, che prevalgono su quelle standard.",
    ],
  },
  {
    title: "2. Cancellazione da parte del Cliente",
    body: [
      "Il Cliente può cancellare gratuitamente una prenotazione confermata fino a 24 ore prima dell'orario concordato per la consulenza. In caso di cancellazione comunicata oltre tale termine, è dovuto al Consulente il 50% del compenso pattuito, a titolo di indennizzo per il mancato preavviso.",
      "In caso di mancata presentazione del Cliente all'appuntamento confermato, senza alcuna comunicazione di cancellazione, è dovuto l'intero compenso pattuito.",
    ],
  },
  {
    title: "3. Riprogrammazione",
    body: [
      "Il Cliente ha diritto a riprogrammare una volta, senza costi aggiuntivi, la data o l'orario di una consulenza confermata, con un preavviso di almeno 12 ore rispetto all'orario originariamente concordato, subordinatamente alla disponibilità del Consulente nel nuovo calendario.",
      "Richieste di riprogrammazione ulteriori rispetto alla prima, o con preavviso inferiore a 12 ore, sono soggette all'accettazione discrezionale del Consulente e possono comportare l'applicazione delle condizioni di cancellazione di cui al punto 2.",
    ],
  },
  {
    title: "4. Cancellazione da parte del Consulente",
    body: [
      "Qualora sia il Consulente a cancellare una consulenza confermata, o a non presentarsi all'appuntamento senza tempestiva comunicazione, il Cliente ha diritto al rimborso integrale dell'importo versato, indipendentemente dal preavviso con cui la cancellazione è avvenuta.",
      "In caso di cancellazioni ripetute e ingiustificate da parte di un Consulente, la Piattaforma si riserva di adottare provvedimenti sul relativo profilo, inclusa la sospensione, a tutela della qualità del servizio.",
    ],
  },
  {
    title: "5. Modalità di rimborso",
    body: [
      "I rimborsi spettanti vengono elaborati sullo stesso metodo di pagamento utilizzato per la prenotazione, entro un termine indicativo di 5-10 giorni lavorativi dall'approvazione della richiesta, salvo tempi tecnici dipendenti dal circuito di pagamento utilizzato.",
      "Le richieste di rimborso possono essere avviate dalla sezione \"Le mie prenotazioni\" dell'area riservata del Cliente o contattando il servizio di assistenza.",
    ],
  },
  {
    title: "6. Casi particolari",
    body: [
      "Per servizi che prevedono attività preparatorie già avviate dal Consulente su richiesta esplicita del Cliente prima della data della consulenza (ad esempio l'analisi di documentazione fornita in anticipo), il Consulente può trattenere una quota proporzionale del compenso a copertura del lavoro già svolto, anche in caso di cancellazione entro i termini ordinari. Tale eventualità, ove applicabile, viene comunicata al Cliente prima della conferma della prenotazione.",
      "In presenza di controversie tra Cliente e Consulente relative all'applicazione della presente politica, il team di assistenza di Pronto Consulente può intervenire in qualità di mediatore, senza che ciò costituisca ammissione di responsabilità della Piattaforma rispetto al rapporto contrattuale tra le parti.",
    ],
  },
  {
    title: "7. Aggiornamenti alla politica",
    body: [
      "La presente Politica di Cancellazione può essere aggiornata periodicamente. Le prenotazioni già confermate restano regolate dalla versione della politica in vigore al momento della conferma, salvo modifiche più favorevoli al Cliente.",
    ],
  },
];

export default function PoliticaCancellazionePage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">Documenti legali</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Politica di cancellazione</h1>
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
            {sections.map((s) => (
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
