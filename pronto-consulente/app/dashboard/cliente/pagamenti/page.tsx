"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { clientBookings } from "@/data/bookings";
import type { Booking } from "@/lib/types";

function paymentLabel(status: Booking["status"]): { label: string; tone: "verified" | "gold" | "navy" | "danger" } {
  switch (status) {
    case "completata":
      return { label: "Pagato", tone: "verified" };
    case "confermata":
      return { label: "Autorizzato", tone: "navy" };
    case "riprogrammata":
      return { label: "In attesa nuova data", tone: "gold" };
    case "annullata":
      return { label: "Rimborsato", tone: "danger" };
    default:
      return { label: "In attesa conferma", tone: "gold" };
  }
}

export default function PagamentiPage() {
  const { push } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  function saveCard() {
    push({ kind: "success", title: "Metodo di pagamento aggiornato" });
    setEditOpen(false);
  }

  const history = clientBookings.filter((b) => b.price > 0);

  return (
    <div>
      <PageHeader title="Pagamenti" description="Gestisci il tuo metodo di pagamento e consulta lo storico." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Metodo di pagamento</h2>
            <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-5 text-white shadow-card">
              <div className="flex items-center justify-between">
                <CreditCard className="h-6 w-6 text-gold-300" />
                <span className="text-xs font-medium uppercase tracking-wide text-white/70">Visa</span>
              </div>
              <p className="mt-6 text-lg font-semibold tracking-widest">•••• •••• •••• 4242</p>
              <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                <span>Marco Bianchi</span>
                <span>Scad. 05/28</span>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-body">
              <ShieldCheck className="h-3.5 w-3.5 text-verified" /> Pagamenti protetti e crittografati.
            </p>
            <Button variant="outline" fullWidth className="mt-4" onClick={() => setEditOpen(true)}>
              Modifica metodo di pagamento
            </Button>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Storico pagamenti</h2>
            <div className="space-y-3">
              {history.map((b) => {
                const p = paymentLabel(b.status);
                return (
                  <div key={b.id} className="flex items-center justify-between rounded-xl border border-navy-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink">{b.serviceTitle}</p>
                      <p className="text-xs text-body">
                        {b.consultantName} · {formatDate(b.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge tone={p.tone}>{p.label}</Badge>
                      <span className="w-20 text-right text-sm font-semibold text-ink">{formatCurrency(b.price)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifica metodo di pagamento"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Annulla
            </Button>
            <Button onClick={saveCard}>Salva carta</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="card-number">Numero carta</Label>
            <Input id="card-number" placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="card-exp">Scadenza</Label>
              <Input id="card-exp" placeholder="MM/AA" defaultValue="05/28" />
            </div>
            <div>
              <Label htmlFor="card-cvc">CVC</Label>
              <Input id="card-cvc" placeholder="123" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
