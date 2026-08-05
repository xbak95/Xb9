"use client";

import { useState } from "react";
import { ShieldAlert, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Input, Checkbox } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

export default function ImpostazioniClientePage() {
  const { push } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifiche, setNotifiche] = useState({
    email_prenotazioni: true,
    email_messaggi: true,
    push_promozioni: false,
  });

  function saveAccount(e: React.FormEvent) {
    e.preventDefault();
    push({ kind: "success", title: "Dati account aggiornati" });
  }

  function savePassword(e: React.FormEvent) {
    e.preventDefault();
    push({ kind: "success", title: "Password aggiornata" });
  }

  function saveNotifications() {
    push({ kind: "success", title: "Preferenze di notifica salvate" });
  }

  function requestDeletion() {
    setDeleteOpen(false);
    push({ kind: "info", title: "Richiesta inviata", description: "Ti risponderemo entro 30 giorni come previsto dal GDPR." });
  }

  return (
    <div>
      <PageHeader title="Impostazioni" description="Gestisci i dati del tuo account, la sicurezza e le preferenze." />

      <div className="space-y-6">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Dati account</h2>
            <form onSubmit={saveAccount} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullname">Nome e cognome</Label>
                <Input id="fullname" defaultValue="Marco Bianchi" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="marco.bianchi@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Telefono</Label>
                <Input id="phone" type="tel" defaultValue="+39 320 123 4567" />
              </div>
              <div>
                <Label htmlFor="company">Azienda (opzionale)</Label>
                <Input id="company" placeholder="Ragione sociale" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Salva modifiche</Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Cambia password</h2>
            <form onSubmit={savePassword} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="current-pw">Password attuale</Label>
                <Input id="current-pw" type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="new-pw">Nuova password</Label>
                <Input id="new-pw" type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="confirm-pw">Conferma nuova password</Label>
                <Input id="confirm-pw" type="password" placeholder="••••••••" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="secondary">
                  Aggiorna password
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Notifiche</h2>
            <div className="space-y-3">
              <Checkbox
                label="Email per nuove prenotazioni e aggiornamenti"
                checked={notifiche.email_prenotazioni}
                onChange={(e) => setNotifiche((n) => ({ ...n, email_prenotazioni: e.target.checked }))}
              />
              <Checkbox
                label="Email per nuovi messaggi dai consulenti"
                checked={notifiche.email_messaggi}
                onChange={(e) => setNotifiche((n) => ({ ...n, email_messaggi: e.target.checked }))}
              />
              <Checkbox
                label="Notifiche push su promozioni e novità"
                checked={notifiche.push_promozioni}
                onChange={(e) => setNotifiche((n) => ({ ...n, push_promozioni: e.target.checked }))}
              />
            </div>
            <Button variant="outline" size="sm" className="mt-4" onClick={saveNotifications}>
              Salva preferenze
            </Button>
          </CardBody>
        </Card>

        <Card className="border-red-100">
          <CardBody>
            <h2 className="mb-1 text-lg font-bold text-navy">Privacy e protezione dei dati</h2>
            <p className="mb-4 text-sm text-body">
              Consulta la nostra informativa privacy per sapere come trattiamo i tuoi dati personali.
            </p>
            <a
              href="/privacy"
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-institutional hover:underline"
            >
              Leggi l'informativa privacy <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">Richiedi la cancellazione dei tuoi dati</p>
                <p className="mt-1 text-sm text-red-700/80">
                  In conformità al GDPR puoi richiedere la cancellazione definitiva del tuo account e di tutti i dati associati.
                </p>
                <Button variant="danger" size="sm" className="mt-3" onClick={() => setDeleteOpen(true)}>
                  Richiedi cancellazione dati
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={requestDeletion}
        title="Richiedere la cancellazione dei dati?"
        description="Invieremo la tua richiesta al team privacy. Riceverai una conferma via email entro 30 giorni."
        confirmLabel="Invia richiesta"
        danger
      />
    </div>
  );
}
