import { Users, Briefcase, CalendarCheck, Wallet, TrendingUp, ShieldCheck, Flag, Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BarMiniChart, DonutChart } from "@/components/ui/Chart";
import { formatCurrency, formatDate } from "@/lib/utils";
import { KpiCard, PageHeader } from "@/app/admin/_components/KpiCard";
import {
  platformKpis,
  monthlyRevenue,
  categoryDemandDonut,
  verificationQueue,
  reports,
  activityLog,
} from "@/data/admin-demo";

export const metadata = { title: "Panoramica" };

export default function AdminOverviewPage() {
  const pendingVerifications = verificationQueue.filter((v) => v.status === "in_attesa");
  const openReports = reports.filter((r) => r.status === "aperta");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Panoramica piattaforma"
        description="Indicatori chiave di Pronto Consulente aggiornati al 5 agosto 2026."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="Utenti totali" value={platformKpis.totalUsers.toLocaleString("it-IT")} icon={Users} />
        <KpiCard label="Consulenti attivi" value={platformKpis.activeConsultants.toLocaleString("it-IT")} icon={Briefcase} />
        <KpiCard label="Prenotazioni del mese" value={platformKpis.bookingsThisMonth.toString()} icon={CalendarCheck} />
        <KpiCard label="GMV del mese" value={formatCurrency(platformKpis.gmvThisMonth)} icon={Wallet} />
        <KpiCard
          label="Crescita mensile"
          value={`+${platformKpis.growthRatePct}%`}
          icon={TrendingUp}
          trend={{ value: "rispetto al mese precedente", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Fatturato transato (ultimi 6 mesi)</h3>
            <p className="mt-1 text-sm text-body">Valore lordo delle prenotazioni completate sulla piattaforma.</p>
            <BarMiniChart data={monthlyRevenue} className="mt-6" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Domanda per categoria</h3>
            <p className="mt-1 text-sm text-body">Distribuzione dei consulenti attivi per macro-categoria.</p>
            <div className="mt-5 flex items-center gap-5">
              <DonutChart segments={categoryDemandDonut} size={120} strokeWidth={14} />
              <ul className="flex-1 space-y-1.5 text-xs">
                {categoryDemandDonut.map((seg) => (
                  <li key={seg.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="flex-1 text-body">{seg.label}</span>
                    <span className="font-medium text-ink">{seg.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-base font-semibold text-navy">Consulenti in attesa di verifica</h3>
              <Badge tone="gold" icon={<ShieldCheck className="h-3.5 w-3.5" />}>
                {pendingVerifications.length} in coda
              </Badge>
            </div>
            <ul className="space-y-3">
              {pendingVerifications.slice(0, 4).map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-3 rounded-xl border border-navy-100 px-3.5 py-2.5">
                  <div>
                    <p className="text-sm font-semibold text-ink">{v.consultantName}</p>
                    <p className="text-xs text-body">{v.categoryName} · candidatura del {formatDate(v.submittedDate)}</p>
                  </div>
                  <Badge tone="neutral">{v.documents.length} documenti</Badge>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-base font-semibold text-navy">Attività recenti da moderare</h3>
              <Badge tone="danger" icon={<Flag className="h-3.5 w-3.5" />}>
                {openReports.length} aperte
              </Badge>
            </div>
            <ul className="space-y-3">
              {openReports.slice(0, 4).map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-navy-100 px-3.5 py-2.5">
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.reason}</p>
                    <p className="text-xs text-body">Segnalato da {r.reporterName} · {formatDate(r.date)}</p>
                  </div>
                  <Star className="h-4 w-4 shrink-0 text-gold-500" />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <h3 className="mb-4 font-heading text-base font-semibold text-navy">Ultime azioni amministrative</h3>
          <ul className="divide-y divide-navy-50">
            {activityLog.slice(0, 6).map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="text-ink">
                  <span className="font-semibold">{entry.actor}</span> {entry.action.toLowerCase()}{" "}
                  <span className="font-medium text-navy-700">{entry.target}</span>
                </span>
                <span className="shrink-0 text-xs text-body">{entry.date}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
