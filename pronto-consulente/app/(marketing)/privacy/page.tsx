import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Informativa sul trattamento dei dati personali di Pronto Consulente ai sensi del Regolamento (UE) 2016/679 (GDPR): titolare, finalità, base giuridica, conservazione e diritti.",
};

const sections = [
  {
    title: "1. Titolare del trattamento",
    body: [
      "Il Titolare del trattamento dei dati personali raccolti tramite la Piattaforma Pronto Consulente è la società che gestisce il servizio, contattabile all'indirizzo email privacy@prontoconsulente.it per qualsiasi richiesta relativa al trattamento dei dati personali.",
    ],
  },
  {
    title: "2. Dati raccolti",
    body: [
      "Nell'ambito dell'erogazione del servizio raccogliamo: dati identificativi e di contatto forniti in fase di registrazione (nome, cognome, email, numero di telefono); dati professionali forniti dai Consulenti per la creazione del profilo (curriculum, certificazioni, partita IVA, portfolio); dati relativi alle prenotazioni e alle transazioni effettuate (servizi acquistati, importi, date); contenuti generati dagli utenti (messaggi tra Cliente e Consulente, recensioni, segnalazioni); dati tecnici raccolti automaticamente durante la navigazione (indirizzo IP, tipo di dispositivo e browser, pagine visitate), come dettagliato nella Politica dei Cookie.",
      "Non raccogliamo dati relativi a categorie particolari (art. 9 GDPR) se non nella misura strettamente necessaria e con base giuridica specifica, ad esempio nell'ambito di verifiche professionali che il Consulente sceglie volontariamente di fornire.",
    ],
  },
  {
    title: "3. Finalità del trattamento",
    body: [
      "I dati personali sono trattati per le seguenti finalità: creazione e gestione dell'account utente; erogazione del servizio di intermediazione tra Clienti e Consulenti, incluse prenotazione, messaggistica e gestione dei pagamenti; verifica dell'identità e delle competenze dichiarate dai Consulenti; gestione dell'assistenza clienti e delle segnalazioni; adempimento di obblighi legali, contabili e fiscali; miglioramento del servizio tramite analisi statistiche aggregate; comunicazioni di marketing, solo previo consenso specifico dell'interessato.",
    ],
  },
  {
    title: "4. Base giuridica",
    body: [
      "Il trattamento dei dati necessari all'erogazione del servizio si fonda sull'esecuzione di un contratto di cui l'interessato è parte (art. 6.1.b GDPR). Il trattamento per finalità di sicurezza, prevenzione delle frodi e verifica dei profili si fonda sul legittimo interesse del Titolare a garantire l'affidabilità della Piattaforma (art. 6.1.f GDPR). Il trattamento per finalità di marketing diretto si fonda sul consenso specifico dell'interessato (art. 6.1.a GDPR), revocabile in qualsiasi momento. Il trattamento per adempimenti fiscali e contabili si fonda su un obbligo legale (art. 6.1.c GDPR).",
    ],
  },
  {
    title: "5. Modalità e conservazione",
    body: [
      "I dati sono trattati con strumenti informatici e telematici, con misure di sicurezza tecniche e organizzative adeguate a prevenire accessi non autorizzati, perdita o divulgazione indebita.",
      "I dati relativi all'account sono conservati per tutta la durata del rapporto contrattuale e, successivamente, per il periodo necessario ad adempiere a obblighi legali (ad esempio fiscali e contabili) o a tutelare i diritti del Titolare in sede giudiziale, comunque non oltre 10 anni dalla cessazione del rapporto, salvo diversi termini di legge applicabili.",
    ],
  },
  {
    title: "6. Comunicazione e trasferimento dei dati",
    body: [
      "I dati personali possono essere comunicati a: fornitori di servizi di pagamento, per la gestione delle transazioni; fornitori di hosting e infrastruttura tecnologica; consulenti fiscali, legali e amministrativi del Titolare; autorità pubbliche, ove richiesto dalla legge.",
      "Alcuni fornitori tecnologici possono essere situati al di fuori dello Spazio Economico Europeo: in tal caso il trasferimento avviene solo verso soggetti che garantiscano un livello di protezione adeguato, tramite clausole contrattuali standard approvate dalla Commissione Europea o meccanismi equivalenti.",
    ],
  },
  {
    title: "7. Diritti dell'interessato",
    body: [
      "In qualità di interessato, hai diritto a: accedere ai tuoi dati personali; richiederne la rettifica o l'integrazione; richiederne la cancellazione, nei limiti previsti dalla legge; richiedere la limitazione del trattamento; opporti al trattamento fondato sul legittimo interesse; richiedere la portabilità dei dati forniti su base contrattuale o consensuale; revocare il consenso prestato, senza pregiudicare la liceità del trattamento svolto prima della revoca; proporre reclamo al Garante per la Protezione dei Dati Personali.",
      "Le richieste possono essere inviate a privacy@prontoconsulente.it e riceveranno riscontro entro i termini previsti dalla normativa applicabile.",
    ],
  },
  {
    title: "8. Cookie",
    body: [
      "La Piattaforma utilizza cookie tecnici, funzionali e, previo consenso, cookie di profilazione e analitici di terze parti. Per informazioni dettagliate su tipologie, finalità e modalità di gestione delle preferenze, consulta la nostra Politica dei Cookie.",
    ],
  },
  {
    title: "9. Minori",
    body: [
      "Il servizio non è rivolto a minori di 18 anni. Il Titolare non raccoglie consapevolmente dati personali di minori e, qualora venisse a conoscenza di un trattamento involontario di tali dati, provvederà alla loro cancellazione.",
    ],
  },
  {
    title: "10. Modifiche all'informativa",
    body: [
      "La presente informativa può essere aggiornata periodicamente per riflettere modifiche normative o del servizio. Le versioni aggiornate saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">Documenti legali</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Informativa sulla privacy</h1>
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
