"use client";

import { useState } from "react";
import { ClipboardList, Wallet, Calendar, Building2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { Card, CardBody } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { quoteRequests as initialRequests } from "@/data/bookings";
import type { QuoteRequest } from "@/lib/types";

export default function RichiestePage() {
  const { push } = useToast();
  const [requests, setRequests] = useState<QuoteRequest[]>(initialRequests);
  const [cancelTarget, setCancelTarget] = useState<QuoteRequest | null>(null);

  function confirmCancel() {
    if (!cancelTarget) return;
    setRequests((prev) => prev.filter((r) => r.id !== cancelTarget.id));
    push({ kind: "success", title: "Richiesta annullata", description: "Il consulente non riceverà più notifiche su questa richiesta." });
    setCancelTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Le tue richieste"
        description="Richieste personalizzate inviate ai consulenti per ottenere un preventivo su misura."
        action={
          <ButtonLink href="/" variant="outline" size="sm">
            Nuova richiesta
          </ButtonLink>
        }
      />

      {requests.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Nessuna richiesta inviata"
          description="Quando invii una richiesta personalizzata a un consulente, la troverai qui."
        />
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardBody>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                        <Building2 className="h-4 w-4 text-navy-400" /> {r.categoryName}
                      </span>
                      <QuoteStatusBadge status={r.status} />
                    </div>
                    <p className="text-sm text-body">{r.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-body">
                      <span className="inline-flex items-center gap-1">
                        <Wallet className="h-3.5 w-3.5" /> Budget: {r.budget}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> Inviata il {formatDate(r.date)}
                      </span>
                      <span>
                        A: <span className="font-medium text-ink">{r.consultantName}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {r.status === "in_attesa" && (
                      <Button variant="danger" size="sm" onClick={() => setCancelTarget(r)}>
                        Annulla richiesta
                      </Button>
                    )}
                    {(r.status === "inviato" || r.status === "accettato") && (
                      <ButtonLink href="/dashboard/cliente/preventivi" variant="outline" size="sm">
                        Vedi preventivo
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={confirmCancel}
        title="Annullare questa richiesta?"
        description={cancelTarget ? `La richiesta a ${cancelTarget.consultantName} verrà rimossa.` : undefined}
        confirmLabel="Sì, annulla"
        danger
      />
    </div>
  );
}
