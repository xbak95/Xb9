import type { Metadata } from "next";
import { ShieldAlert, Clock } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ReportForm } from "./ReportForm";

export const metadata: Metadata = {
  title: "Segnalazioni",
  description:
    "Segnala un problema, un contenuto inappropriato o un comportamento scorretto su Pronto Consulente. Il nostro team modera ogni segnalazione entro 48 ore.",
};

export default function SegnalazioniPage() {
  return (
    <div className="section-y">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Segnalazioni
          </span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Segnala un problema</h1>
          <p className="mt-5 text-lg text-body">
            La qualità e la sicurezza della community dipendono anche dalle segnalazioni degli
            utenti. Usa questo modulo per segnalare un profilo, un contenuto o un comportamento
            che ritieni non conforme alle nostre regole.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardBody className="p-6 sm:p-8">
              <ReportForm />
            </CardBody>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardBody className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">Tempi di moderazione</h3>
                  <p className="mt-1 text-sm text-body">
                    Il nostro team modererà la segnalazione entro 48 ore e, se necessario, ti
                    contatterà per approfondire i dettagli.
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">Segnalazioni fondate</h3>
                  <p className="mt-1 text-sm text-body">
                    Ogni segnalazione viene trattata con riservatezza. In caso di violazioni
                    accertate, adottiamo provvedimenti proporzionati fino alla sospensione
                    dell'account coinvolto.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
