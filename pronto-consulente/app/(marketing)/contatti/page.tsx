import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta il team di Pronto Consulente per informazioni su prenotazioni, profili consulente, pagamenti o collaborazioni.",
};

export default function ContattiPage() {
  return (
    <div>
      <section className="section-y">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Contatti
            </span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Parliamone</h1>
            <p className="mt-5 text-lg text-body">
              Hai una domanda su come funziona la piattaforma, un dubbio su una prenotazione o
              vuoi proporci una collaborazione? Scrivici: il nostro team risponde generalmente
              entro un giorno lavorativo.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardBody className="p-6 sm:p-8">
                <ContactForm />
              </CardBody>
            </Card>

            <div className="space-y-5">
              <Card>
                <CardBody className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Email</h3>
                    <p className="mt-1 text-sm text-body">assistenza@prontoconsulente.it</p>
                    <p className="text-sm text-body">partnership@prontoconsulente.it</p>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Orari di assistenza</h3>
                    <p className="mt-1 text-sm text-body">Lun–Ven, 9:00–18:00</p>
                    <p className="text-sm text-body">Risposta media entro 24 ore lavorative</p>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Sede</h3>
                    <p className="mt-1 text-sm text-body">Milano, Italia</p>
                    <p className="text-sm text-body">Operativi su tutto il territorio nazionale</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted">
        <div className="container-px">
          <h2 className="text-2xl font-bold">Dove siamo</h2>
          <div
            className="mt-6 flex h-72 w-full items-center justify-center rounded-2xl border border-navy-100 bg-[linear-gradient(135deg,#EDF1F8_25%,#F5F7FA_25%,#F5F7FA_50%,#EDF1F8_50%,#EDF1F8_75%,#F5F7FA_75%,#F5F7FA_100%)] bg-[length:32px_32px] text-sm font-medium text-body"
            role="img"
            aria-label="Mappa dimostrativa della sede di Pronto Consulente a Milano"
          >
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white/90 px-6 py-4 shadow-card">
              <MapPin className="h-5 w-5 text-navy" />
              Milano, Italia — mappa dimostrativa
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
