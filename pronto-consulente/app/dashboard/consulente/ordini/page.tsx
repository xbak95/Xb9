import { ShoppingBag, Calendar } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { OrderStatusBadge, type OrderFulfillment } from "@/components/dashboard/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";
import type { BookingStatus } from "@/lib/types";

function fulfillmentFor(status: BookingStatus): OrderFulfillment | "annullato" {
  switch (status) {
    case "completata":
      return "consegnato";
    case "confermata":
    case "riprogrammata":
      return "in_corso";
    case "in_attesa":
      return "da_avviare";
    case "annullata":
      return "annullato";
  }
}

export default function OrdiniPage() {
  const orders = consultantBookings.filter((b) => b.price > 0);

  return (
    <div>
      <PageHeader title="Ordini" description="Servizi a prezzo fisso acquistati dai clienti e il relativo stato di evasione." />

      {orders.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Nessun ordine" description="Gli ordini a prezzo fisso appariranno qui." />
      ) : (
        <Card>
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-navy-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-body sm:grid">
            <span>Servizio</span>
            <span>Cliente</span>
            <span>Data</span>
            <span>Importo</span>
            <span className="text-right">Stato evasione</span>
          </div>
          <div className="divide-y divide-navy-50">
            {orders.map((b) => {
              const fulfillment = fulfillmentFor(b.status);
              return (
                <div key={b.id} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                  <span className="text-sm font-semibold text-ink">{b.serviceTitle}</span>
                  <span className="text-sm text-body">{b.clientName}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-body">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(b.date)}
                  </span>
                  <span className="text-sm font-semibold text-navy">{formatCurrency(b.price)}</span>
                  <div className="sm:text-right">
                    {fulfillment === "annullato" ? <Badge tone="danger">Annullato</Badge> : <OrderStatusBadge status={fulfillment} />}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
