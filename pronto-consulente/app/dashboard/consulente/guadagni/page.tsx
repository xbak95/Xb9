import { Wallet, TrendingUp, CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardBody } from "@/components/ui/Card";
import { BarMiniChart } from "@/components/ui/Chart";
import { formatCurrency, formatDate } from "@/lib/utils";
import { consultantBookings } from "@/data/bookings";

const COMMISSION_RATE = 0.15;

const monthlyEarnings = [
  { label: "Mar", value: 2100 },
  { label: "Apr", value: 1800 },
  { label: "Mag", value: 2600 },
  { label: "Giu", value: 900 },
  { label: "Lug", value: 1350 },
  { label: "Ago", value: 150 },
];

export default function GuadagniPage() {
  const completed = consultantBookings.filter((b) => b.status === "completata");
  const saldoDisponibile = completed.reduce((s, b) => s + b.price * (1 - COMMISSION_RATE), 0);

  return (
    <div>
      <PageHeader title="Guadagni" description="Riepilogo delle entrate generate sulla piattaforma." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard icon={Wallet} label="Saldo disponibile" value={formatCurrency(saldoDisponibile)} sublabel="Al netto della commissione del 15%" tone="verified" />
        <KpiCard icon={CalendarClock} label="Prossimo pagamento" value="12 ago 2026" sublabel={`${formatCurrency(saldoDisponibile)} in bonifico`} tone="navy" />
        <KpiCard icon={TrendingUp} label="Guadagni ultimi 6 mesi" value={formatCurrency(monthlyEarnings.reduce((s, m) => s + m.value, 0))} tone="gold" />
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-1 text-lg font-bold text-navy">Andamento guadagni</h2>
          <p className="mb-4 text-sm text-body">Importi lordi mensili</p>
          <BarMiniChart data={monthlyEarnings} />
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-4 text-lg font-bold text-navy">Transazioni recenti</h2>
          {completed.length === 0 ? (
            <p className="text-sm text-body">Nessuna consulenza completata di recente.</p>
          ) : (
            <div className="space-y-3">
              {completed.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-xl border border-navy-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{b.serviceTitle}</p>
                    <p className="text-xs text-body">
                      {b.clientName} · {formatDate(b.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">{formatCurrency(b.price)} lordi</p>
                    <p className="text-xs text-verified-600">{formatCurrency(b.price * (1 - COMMISSION_RATE))} netti</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
