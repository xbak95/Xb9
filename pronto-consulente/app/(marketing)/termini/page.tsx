import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  description:
    "Termini e condizioni d'uso di Pronto Consulente: oggetto del servizio, obblighi di clienti e consulenti, pagamenti, commissioni, responsabilità e recesso.",
};

const sections = [
  {
    title: "1. Oggetto del servizio",
    body: [
      "Pronto Consulente (di seguito \"la Piattaforma\") è un marketplace online che mette in contatto professionisti e studi di consulenza (\"Consulenti\") con imprese e privati (\"Clienti\") interessati a fruire di servizi di consulenza professionale nei settori pubblicati sulla Piattaforma.",
      "La Piattaforma agisce quale intermediario tecnologico: mette a disposizione gli strumenti per la ricerca, il confronto, la comunicazione, la prenotazione e il pagamento dei servizi, ma non è parte del rapporto contrattuale di consulenza che si instaura direttamente tra Cliente e Consulente.",
      "L'utilizzo della Piattaforma implica l'accettazione integrale dei presenti Termini e Condizioni, unitamente all'Informativa Privacy e alla Politica dei Cookie.",
    ],
  },
  {
    title: "2. Registrazione e account",
    body: [
      "Per utilizzare determinate funzionalità della Piattaforma è necessario registrare un account, fornendo dati veritieri, aggiornati e completi. L'utente è responsabile della riservatezza delle proprie credenziali e di ogni attività svolta tramite il proprio account.",
      "I Consulenti che intendono pubblicare un profilo professionale sono soggetti a un processo di verifica preventiva, che può includere il controllo dell'identità, della partita IVA, delle certificazioni dichiarate e delle referenze professionali. La Piattaforma si riserva il diritto di rifiutare o sospendere l'attivazione di un profilo che non soddisfi i propri standard qualitativi.",
    ],
  },
  {
    title: "3. Obblighi dei Consulenti",
    body: [
      "I Consulenti si impegnano a: fornire informazioni veritiere su competenze, certificazioni ed esperienza; erogare i servizi pubblicati con diligenza professionale e nel rispetto delle norme deontologiche del proprio ordine o categoria professionale, ove applicabile; rispettare gli orari e le modalità di erogazione concordate con il Cliente; mantenere aggiornato il proprio calendario di disponibilità; gestire in autonomia gli adempimenti fiscali relativi ai compensi percepiti, incluse eventuali fatturazioni.",
      "È espressamente vietato ai Consulenti sollecitare pagamenti al di fuori del circuito sicuro offerto dalla Piattaforma per servizi originati da un contatto avvenuto tramite la stessa, salvo diversi accordi successivi alla prima consulenza intercorsa regolarmente tramite Pronto Consulente.",
    ],
  },
  {
    title: "4. Obblighi dei Clienti",
    body: [
      "I Clienti si impegnano a fornire informazioni corrette e sufficienti per consentire al Consulente di comprendere la natura della richiesta, a rispettare gli appuntamenti confermati secondo le policy di cancellazione applicabili, a corrispondere il pagamento dovuto tramite gli strumenti messi a disposizione dalla Piattaforma e a utilizzare il servizio nel rispetto della legge e dei diritti di terzi.",
      "È vietato l'utilizzo della Piattaforma per finalità diverse dalla ricerca e fruizione di servizi di consulenza professionale, incluse condotte moleste, discriminatorie o lesive della dignità dei Consulenti.",
    ],
  },
  {
    title: "5. Pagamenti e commissioni",
    body: [
      "I pagamenti relativi alle consulenze prenotate tramite la Piattaforma sono gestiti tramite fornitori di servizi di pagamento terzi, nel rispetto degli standard di sicurezza previsti dalla normativa applicabile. Gli importi versati dal Cliente vengono trattenuti in sicurezza e resi disponibili al Consulente secondo le tempistiche indicate nelle policy operative della Piattaforma.",
      "La Piattaforma applica una commissione di intermediazione sulle prenotazioni concluse con successo, la cui misura varia in base al piano di abbonamento sottoscritto dal Consulente. Le commissioni applicabili sono sempre indicate in modo trasparente prima della conferma della prenotazione.",
      "Eventuali imposte, ritenute o oneri fiscali relativi ai compensi percepiti dai Consulenti restano a carico esclusivo di questi ultimi.",
    ],
  },
  {
    title: "6. Recesso, cancellazioni e rimborsi",
    body: [
      "Le condizioni di cancellazione, riprogrammazione e rimborso applicabili a ciascuna prenotazione sono indicate nel profilo del Consulente e richiamate espressamente in fase di prenotazione. In assenza di indicazioni specifiche, si applicano le policy standard descritte nella Politica di Cancellazione della Piattaforma.",
      "I Clienti che agiscono in qualità di consumatori, ove applicabile ai sensi del Codice del Consumo, potranno esercitare gli ulteriori diritti di recesso previsti dalla normativa vigente per i contratti a distanza, salvo le eccezioni relative a servizi la cui esecuzione sia già iniziata su richiesta espressa del consumatore.",
    ],
  },
  {
    title: "7. Proprietà intellettuale",
    body: [
      "Tutti i contenuti della Piattaforma — marchio, logo, interfaccia grafica, testi e software — sono di proprietà di Pronto Consulente o concessi in licenza, e non possono essere riprodotti senza autorizzazione scritta. I contenuti caricati dagli utenti (profili, portfolio, recensioni) restano di proprietà dei rispettivi autori, che concedono alla Piattaforma una licenza d'uso non esclusiva per la loro pubblicazione e promozione sul servizio.",
    ],
  },
  {
    title: "8. Limitazione di responsabilità",
    body: [
      "La Piattaforma non è responsabile della qualità, correttezza o esito dei servizi di consulenza erogati dai Consulenti, essendo questi ultimi soggetti autonomi che agiscono sotto la propria responsabilità professionale. La Piattaforma si impegna tuttavia a mantenere attivo il processo di verifica dei profili e un sistema di gestione delle segnalazioni per tutelare la qualità complessiva del servizio.",
      "Nei limiti consentiti dalla legge applicabile, la responsabilità della Piattaforma per eventuali danni derivanti dall'utilizzo del servizio è limitata all'importo delle commissioni effettivamente percepite in relazione alla specifica prenotazione oggetto di contestazione.",
    ],
  },
  {
    title: "9. Sospensione e chiusura degli account",
    body: [
      "La Piattaforma si riserva il diritto di sospendere o chiudere account che violino i presenti Termini, forniscano informazioni false, ricevano segnalazioni fondate di comportamenti scorretti o compromettano la sicurezza e la fiducia della community.",
    ],
  },
  {
    title: "10. Modifiche ai termini e legge applicabile",
    body: [
      "I presenti Termini possono essere aggiornati periodicamente; le modifiche sostanziali verranno comunicate agli utenti con ragionevole anticipo. L'uso continuato della Piattaforma dopo la pubblicazione delle modifiche costituisce accettazione delle stesse.",
      "I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente il foro del luogo di residenza o domicilio del consumatore, ove applicabile, salvo diversa competenza inderogabile prevista dalla legge.",
    ],
  },
];

export default function TerminiPage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">Documenti legali</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Termini e condizioni d'uso</h1>
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
