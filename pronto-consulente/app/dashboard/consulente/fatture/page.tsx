"use client";

import { Receipt, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";

export default function FattureConsulentePage() {
  const { push } = useToast();
  const invoiced = consultantBookings.filter((b) => b.price > 0 && (b.status === "completata" || b.status === "confermata"));

  function download(id: string) {
    push({ kind: "success", title: "Fattura scaricata", description: `FT-2026-${id.toUpperCase()}.pdf (demo).` });
  }

  return (
    <div>
      <PageHeader title="Fatture emesse" description="Le fatture generate per i servizi venduti ai tuoi clienti." />

      {invoiced.length === 0 ? (
        <EmptyState icon={Receipt} title="Nessuna fattura" description="Le fatture emesse ai clienti appariranno qui." />
      ) : (
        <Card>
          <div className="hidden grid-cols-[1fr_1.4fr_1fr_1fr_auto] gap-4 border-b border-navy-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body sm:grid">
            <span>Numero</span>
            <span>Servizio</span>
            <span>Cliente</span>
            <span>Importo</span>
            <span className="text-right">Azioni</span>
          </div>
          <div className="divide-y divide-navy-50">
            {invoiced.map((b) => (
              <div key={b.id} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-[1fr_1.4fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                <span className="text-sm font-semibold text-ink">FT-2026-{b.id.toUpperCase()}</span>
                <div>
                  <p className="text-sm text-ink">{b.serviceTitle}</p>
                  <p className="text-xs text-body">{formatDate(b.date)}</p>
                </div>
                <span className="text-sm text-body">{b.clientName}</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(b.price)}</span>
                <div className="sm:text-right">
                  <Button variant="outline" size="sm" onClick={() => download(b.id)}>
                    <Download className="h-4 w-4" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
