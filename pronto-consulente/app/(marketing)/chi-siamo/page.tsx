import type { Metadata } from "next";
import {
  ShieldCheck,
  Eye,
  Award,
  Zap,
  MousePointerClick,
  BadgeCheck,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Pronto Consulente è il marketplace italiano che mette in contatto imprese e professionisti qualificati. Scopri missione, valori e i numeri della community.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Affidabilità",
    description:
      "Ogni consulente attivo sulla piattaforma è passato attraverso un processo di verifica dell'identità, delle competenze e, dove previsto, della partita IVA.",
  },
  {
    icon: Eye,
    title: "Trasparenza",
    description:
      "Prezzi chiari fin dal primo contatto, recensioni verificate e nessun costo nascosto: quello che vedi in un profilo è ciò che ottieni.",
  },
  {
    icon: Award,
    title: "Competenza",
    description:
      "Selezioniamo professionisti con esperienza comprovata nei rispettivi settori, non semplici iscritti: curriculum, certificazioni e case study reali.",
  },
  {
    icon: Zap,
    title: "Velocità",
    description:
      "Dalla ricerca alla prenotazione in pochi minuti, con tempi di risposta dei consulenti monitorati e resi pubblici in ogni profilo.",
  },
  {
    icon: MousePointerClick,
    title: "Semplicità",
    description:
      "Un percorso lineare per chi cerca una consulenza e per chi la offre, senza passaggi superflui, moduli infiniti o burocrazia inutile.",
  },
  {
    icon: Briefcase,
    title: "Professionalità",
    description:
      "Un ambiente pensato per relazioni di lavoro serie: comunicazione tracciata, pagamenti sicuri e policy chiare per entrambe le parti.",
  },
  {
    icon: BadgeCheck,
    title: "Qualità della selezione",
    description:
      "Non tutti i profili vengono accettati: valutiamo ogni candidatura per garantire un livello costante di preparazione ed etica professionale.",
  },
];

const stats = [
  { icon: Users, value: "1.900+", label: "Consulenti attivi in piattaforma" },
  { icon: Layers, value: "22", label: "Settori di competenza coperti" },
  { icon: Award, value: "8.400+", label: "Consulenze completate con successo" },
];

export default function ChiSiamoPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Chi siamo
            </span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              La consulenza giusta, senza intermediazioni inutili
            </h1>
            <p className="mt-5 text-lg text-body">
              Pronto Consulente nasce da un'osservazione semplice: trovare un professionista
              qualificato per un'esigenza specifica — un bando, una verifica di sicurezza, una
              consulenza fiscale — richiede spesso settimane di passaparola, preventivi opachi e
              incertezza sulla reale competenza di chi si ha di fronte. Abbiamo costruito un luogo
              dove questa ricerca diventa un percorso chiaro, veloce e verificabile.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">La nostra missione</h2>
              <p className="mt-4 text-body">
                Vogliamo che ogni impresa, dal libero professionista alla PMI strutturata, possa
                accedere a competenza di alto livello senza dover indovinare a chi affidarsi.
                Allo stesso tempo, vogliamo dare ai consulenti italiani uno strumento serio per
                trasformare la propria expertise in nuove opportunità di lavoro, senza dover
                gestire da soli marketing, fatturazione e gestione degli appuntamenti.
              </p>
              <p className="mt-4 text-body">
                Crediamo che un mercato della consulenza più trasparente renda tutti più forti:
                le imprese scelgono meglio, i professionisti competenti emergono e la qualità
                media del servizio nel Paese cresce.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">La nostra visione</h2>
              <p className="mt-4 text-body">
                Immaginiamo un punto di riferimento unico per la consulenza professionale in
                Italia: un luogo dove la reputazione si costruisce con i risultati e non con la
                capacità di farsi pubblicità, e dove ogni settore — dalla finanza agevolata alla
                cybersecurity, dal legale alla sostenibilità — trova gli specialisti giusti,
                verificati e pronti a lavorare.
              </p>
              <p className="mt-4 text-body">
                Non ci fermiamo alla messa in contatto: accompagniamo cliente e consulente lungo
                tutto il percorso, dalla prima richiesta alla recensione finale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">I valori che guidano ogni scelta</h2>
            <p className="mt-3 text-body">
              Non sono principi da manifesto: sono i criteri con cui progettiamo ogni funzione
              della piattaforma, dal processo di verifica dei profili alla gestione dei pagamenti.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <CardBody>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm text-body">{v.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-navy">
        <div className="container-px">
          <h2 className="text-3xl font-bold text-white">Pronto Consulente in numeri</h2>
          <p className="mt-3 max-w-2xl text-navy-100">
            Una community in crescita, costruita su verifiche reali e relazioni di lavoro portate
            a termine.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <s.icon className="h-6 w-6 text-gold-400" />
                <p className="mt-4 font-heading text-4xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-navy-100">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-navy-300">
            Dati aggiornati a titolo dimostrativo — la piattaforma pubblicherà statistiche reali
            man mano che la community cresce.
          </p>
        </div>
      </section>
    </div>
  );
}
