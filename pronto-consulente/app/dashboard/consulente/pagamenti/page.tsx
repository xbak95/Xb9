"use client";

import { useState } from "react";
import { Landmark, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";

const payoutHistory = [
  { id: "po-01", date: "2026-07-05", amount: 2210, reference: "BON-2026-0512" },
  { id: "po-02", date: "2026-06-05", amount: 1615, reference: "BON-2026-0447" },
  { id: "po-03", date: "2026-05-05", amount: 1980, reference: "BON-2026-0388" },
];

export default function PagamentiConsultentePage() {
  const { push } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  function saveIban() {
    push({ kind: "success", title: "Coordinate bancarie aggiornate" });
    setEditOpen(false);
  }

  return (
    <div>
      <PageHeader title="Pagamenti" description="Gestisci il metodo di incasso e consulta lo storico dei bonifici ricevuti." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Metodo di incasso</h2>
            <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-5">
              <Landmark className="h-6 w-6 text-navy" />
              <p className="mt-4 text-sm font-semibold text-ink">IT60 •••• •••• •••• 3456</p>
              <p className="mt-1 text-xs text-body">Intesa Sanpaolo — Alessandro Ferretti</p>
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-body">
              <ShieldCheck className="h-3.5 w-3.5 text-verified" /> I bonifici vengono elaborati il 5 di ogni mese.
            </p>
            <Button variant="outline" fullWidth className="mt-4" onClick={() => setEditOpen(true)}>
              Modifica IBAN
            </Button>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <h2 className="mb-4 text-lg font-bold text-navy">Storico bonifici</h2>
            <div className="space-y-3">
              {payoutHistory.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-navy-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{p.reference}</p>
                    <p className="text-xs text-body">{formatDate(p.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone="verified" icon={<CheckCircle2 className="h-3.5 w-3.5" />}>
                      Completato
                    </Badge>
                    <span className="w-24 text-right text-sm font-semibold text-ink">{formatCurrency(p.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifica coordinate bancarie"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Annulla
            </Button>
            <Button onClick={saveIban}>Salva</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" defaultValue="IT60 X054 2811 1010 0000 0123 456" />
          </div>
          <div>
            <Label htmlFor="bank">Istituto bancario</Label>
            <Input id="bank" defaultValue="Intesa Sanpaolo" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
