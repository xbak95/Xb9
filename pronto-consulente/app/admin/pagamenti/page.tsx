import { Wallet, Percent, TrendingUp, RotateCcw } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BarMiniChart } from "@/components/ui/Chart";
import { formatCurrency, formatDate } from "@/lib/utils";
import { KpiCard, PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { transactions, monthlyRevenue } from "@/data/admin-demo";

export const metadata = { title: "Pagamenti e commissioni" };

const statusLabels: Record<string, string> = {
  completato: "Completato",
  in_attesa: "In attesa",
  rimborsato: "Rimborsato",
};

export default function AdminPaymentsPage() {
  const totalGmv = transactions.reduce((s, t) => s + t.amount, 0);
  const totalCommission = transactions.reduce((s, t) => s + (t.amount * t.commissionRate) / 100, 0);
  const refunded = transactions.filter((t) => t.status === "rimborsato").length;

  return (
    <div>
      <PageHeader
        title="Pagamenti e commissioni"
        description="Riepilogo del transato sulla piattaforma e delle commissioni trattenute per servizio prenotato."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Transato (storico visualizzato)" value={formatCurrency(totalGmv)} icon={Wallet} />
        <KpiCard label="Commissioni trattenute" value={formatCurrency(totalCommission)} icon={Percent} />
        <KpiCard label="Transazioni rimborsate" value={refunded.toString()} icon={RotateCcw} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Incassi mensili</h3>
            <p className="mt-1 text-sm text-body">Valore lordo delle prenotazioni completate, ultimi 6 mesi.</p>
            <BarMiniChart data={monthlyRevenue} className="mt-6" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-navy-700" />
              <h3 className="font-heading text-base font-semibold text-navy">Commissione piattaforma</h3>
            </div>
            <p className="text-sm text-body">
              La percentuale di commissione varia in base al piano di abbonamento del consulente (Base, Professional, Premium).
              La struttura definitiva delle commissioni è <strong>ancora da definire</strong>, coerentemente con i piani descritti
              nella sezione Abbonamenti.
            </p>
            <p className="mt-3 text-xs text-body">
              Nei dati demo qui sotto la commissione varia indicativamente tra il 10% e il 15% a titolo puramente illustrativo.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Consulente</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Servizio</th>
                <th className="px-5 py-3">Importo</th>
                <th className="px-5 py-3">Commissione</th>
                <th className="px-5 py-3">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="px-5 py-3.5 text-body">{formatDate(t.date)}</td>
                  <td className="px-5 py-3.5 font-medium text-ink">{t.consultantName}</td>
                  <td className="px-5 py-3.5 text-body">{t.clientName}</td>
                  <td className="px-5 py-3.5 text-body">{t.serviceTitle}</td>
                  <td className="px-5 py-3.5 text-body">{formatCurrency(t.amount)}</td>
                  <td className="px-5 py-3.5 text-body">
                    {t.commissionRate}% · {formatCurrency((t.amount * t.commissionRate) / 100)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone(t.status)}>{statusLabels[t.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
