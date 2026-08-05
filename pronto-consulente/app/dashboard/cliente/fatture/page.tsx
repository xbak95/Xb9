"use client";

import { Receipt, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Invoice {
  id: string;
  number: string;
  consultantName: string;
  serviceTitle: string;
  date: string;
  amount: number;
}

const invoices: Invoice[] = [
  { id: "inv-01", number: "FT-2026-0143", consultantName: "Avv. Marco Rinaldi", serviceTitle: "Revisione contratto", date: "2026-07-14", amount: 120 },
  { id: "inv-02", number: "FT-2026-0098", consultantName: "Chiara Bellini", serviceTitle: "Consulenza HSE di 60 minuti", date: "2026-06-30", amount: 90 },
  { id: "inv-03", number: "FT-2026-0087", consultantName: "Valentina De Luca", serviceTitle: "Sopralluogo tecnico pre-acquisto", date: "2026-07-10", amount: 280 },
];

export default function FatturePage() {
  const { push } = useToast();

  function download(number: string) {
    push({ kind: "success", title: "Fattura scaricata", description: `${number}.pdf (demo).` });
  }

  return (
    <div>
      <PageHeader title="Fatture" description="Fatture emesse per le consulenze completate." />

      {invoices.length === 0 ? (
        <EmptyState icon={Receipt} title="Nessuna fattura" description="Le fatture appariranno qui dopo il completamento di una consulenza." />
      ) : (
        <Card>
          <div className="hidden grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-4 border-b border-navy-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body sm:grid">
            <span>Numero</span>
            <span>Servizio</span>
            <span>Consulente</span>
            <span>Importo</span>
            <span className="text-right">Azioni</span>
          </div>
          <div className="divide-y divide-navy-50">
            {invoices.map((inv) => (
              <div key={inv.id} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-[1fr_1.5fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                <span className="text-sm font-semibold text-ink">{inv.number}</span>
                <div>
                  <p className="text-sm text-ink">{inv.serviceTitle}</p>
                  <p className="text-xs text-body">{formatDate(inv.date)}</p>
                </div>
                <span className="text-sm text-body">{inv.consultantName}</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(inv.amount)}</span>
                <div className="sm:text-right">
                  <Button variant="outline" size="sm" onClick={() => download(inv.number)}>
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
