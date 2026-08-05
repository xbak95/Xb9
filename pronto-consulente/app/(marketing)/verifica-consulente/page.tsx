import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck, FileCheck2, Landmark, Crown, Zap, Award } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import type { VerificationBadge } from "@/lib/types";
import { VerifyForm } from "./VerifyForm";

export const metadata: Metadata = {
  title: "Sistema di verifica dei consulenti",
  description:
    "Scopri come funziona il sistema di verifica di Pronto Consulente: identità, curriculum, certificazioni, partita IVA, Top Consultant, risposta rapida e consulenti Premium.",
};

const badges: { type: VerificationBadge; icon: typeof BadgeCheck; title: string; description: string }[] = [
  {
    type: "identita_verificata",
    icon: BadgeCheck,
    title: "Identità verificata",
    description:
      "Il consulente ha confermato la propria identità tramite un documento ufficiale valido, verificato dal nostro team prima dell'attivazione del profilo pubblico.",
  },
  {
    type: "curriculum_verificato",
    icon: FileCheck2,
    title: "Curriculum verificato",
    description:
      "Le esperienze professionali dichiarate nel profilo sono state controllate a fronte della documentazione fornita, per garantire coerenza tra quanto raccontato e la reale esperienza sul campo.",
  },
  {
    type: "certificazioni_verificate",
    icon: ShieldCheck,
    title: "Certificazioni verificate",
    description:
      "Le certificazioni professionali indicate nel profilo (es. albi, qualifiche tecniche, attestati) sono state confermate presso l'ente certificatore o tramite documentazione ufficiale.",
  },
  {
    type: "partita_iva_verificata",
    icon: Landmark,
    title: "P.IVA verificata",
    description:
      "Il numero di partita IVA associato al profilo è stato controllato ed è attivo, a garanzia della regolarità fiscale del rapporto professionale.",
  },
  {
    type: "top_consultant",
    icon: Crown,
    title: "Top Consultant",
    description:
      "Riconoscimento riservato ai consulenti che mantengono nel tempo un rating elevato, un alto numero di consulenze completate e un tasso di raccomandazione superiore alla media della categoria.",
  },
  {
    type: "risposta_rapida",
    icon: Zap,
    title: "Risposta rapida",
    description:
      "Assegnato ai consulenti che rispondono in media entro poche ore ai messaggi dei clienti, un indicatore concreto di reattività e disponibilità.",
  },
  {
    type: "consulente_premium",
    icon: Award,
    title: "Consulente Premium",
    description:
      "Identifica i consulenti iscritti al piano Premium, con profilo avanzato, strumenti commerciali dedicati e maggiore visibilità nei risultati di ricerca.",
  },
];

export default function VerificaConsulentePage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Sicurezza e fiducia
            </span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Come verifichiamo i consulenti</h1>
            <p className="mt-5 text-lg text-body">
              Prima di pubblicare un profilo, ogni consulente attraversa un processo di verifica
              pensato per dare a chi cerca una consulenza la massima trasparenza possibile. I
              badge mostrati in ogni profilo riflettono controlli effettivamente superati, non
              semplici dichiarazioni.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) => (
              <Card key={b.type}>
                <CardBody>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{b.title}</h3>
                  <p className="mt-2 text-sm text-body">{b.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Verifica un consulente</h2>
            <p className="mt-3 text-body">
              Vuoi controllare se un profilo che hai visto è effettivamente presente e verificato
              sulla nostra piattaforma? Cerca per nome o slug del profilo.
            </p>
          </div>
          <Card className="mt-8 max-w-2xl">
            <CardBody className="p-6 sm:p-8">
              <VerifyForm />
            </CardBody>
          </Card>
          <p className="mt-4 max-w-2xl text-xs text-body">
            Strumento dimostrativo basato sui profili demo attualmente pubblicati sulla
            piattaforma.
          </p>
        </div>
      </section>
    </div>
  );
}
