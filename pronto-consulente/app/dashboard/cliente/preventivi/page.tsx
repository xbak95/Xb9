"use client";

import { useState } from "react";
import { FileSignature, Calendar, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { quoteRequests as initialRequests } from "@/data/bookings";
import type { QuoteRequest } from "@/lib/types";

export default function PreventiviClientePage() {
  const { push } = useToast();
  const [requests, setRequests] = useState<QuoteRequest[]>(initialRequests);
  const [rejectTarget, setRejectTarget] = useState<QuoteRequest | null>(null);

  const withAmount = requests.filter((r) => typeof r.amount === "number");
  const pending = requests.filter((r) => typeof r.amount !== "number");

  function accept(id: string) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "accettato" } : r)));
    push({ kind: "success", title: "Preventivo accettato", description: "Il consulente ti contatterà per fissare l'appuntamento." });
  }

  function confirmReject() {
    if (!rejectTarget) return;
    setRequests((prev) => prev.map((r) => (r.id === rejectTarget.id ? { ...r, status: "rifiutato" } : r)));
    push({ kind: "info", title: "Preventivo rifiutato" });
    setRejectTarget(null);
  }

  return (
    <div>
      <PageHeader title="Preventivi ricevuti" description="Valuta i preventivi personalizzati inviati dai consulenti." />

      {withAmount.length === 0 && pending.length === 0 ? (
        <EmptyState icon={FileSignature} title="Nessun preventivo" description="Non hai ancora ricevuto preventivi." />
      ) : (
        <div className="space-y-4">
          {withAmount.map((r) => (
            <Card key={r.id} className={r.status === "accettato" ? "border-verified-50 bg-verified-50/30" : undefined}>
              <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{r.consultantName}</p>
                    <QuoteStatusBadge status={r.status} />
                  </div>
                  <p className="text-sm text-body">{r.description}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-body">
                    <Calendar className="h-3.5 w-3.5" /> Ricevuto il {formatDate(r.date)} · {r.categoryName}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <span className="text-xl font-bold text-navy">{formatCurrency(r.amount!)}</span>
                  {r.status === "inviato" && (
                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" onClick={() => setRejectTarget(r)}>
                        Rifiuta
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => accept(r.id)}>
                        Accetta
                      </Button>
                    </div>
                  )}
                  {r.status === "accettato" && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-verified-600">
                      <CheckCircle2 className="h-4 w-4" /> Accettato
                    </span>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}

          {pending.map((r) => (
            <Card key={r.id} className="opacity-80">
              <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-semibold text-ink">{r.consultantName}</p>
                    <QuoteStatusBadge status={r.status} />
                  </div>
                  <p className="text-sm text-body">Preventivo non ancora inviato dal consulente per: {r.description}</p>
                </div>
                <span className="shrink-0 text-sm text-body">Budget indicativo: {r.budget}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
        title="Rifiutare il preventivo?"
        description={rejectTarget ? `Il preventivo di ${rejectTarget.consultantName} verrà rifiutato.` : undefined}
        confirmLabel="Rifiuta"
        danger
      />
    </div>
  );
}
