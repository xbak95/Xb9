import { Users, TrendingUp, Percent, Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { BarMiniChart, LineMiniChart, DonutChart } from "@/components/ui/Chart";
import { KpiCard, PageHeader } from "@/app/admin/_components/KpiCard";
import { monthlyNewUsers, monthlyRevenue, categoryDemandDonut, platformKpis } from "@/data/admin-demo";
import { categories } from "@/data/categories";

export const metadata = { title: "Statistiche" };

const topCategoriesByDemand = [...categories].sort((a, b) => b.consultantCount - a.consultantCount).slice(0, 6);

export default function AdminStatsPage() {
  const conversionSeries = [9.8, 10.4, 11.1, 12.6, 13.9, 14.7];

  return (
    <div>
      <PageHeader
        title="Statistiche"
        description="Vista analitica estesa su crescita, domanda per categoria e performance media della piattaforma."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Nuovi utenti (mese)" value={monthlyNewUsers.at(-1)?.value.toString() ?? "0"} icon={Users} />
        <KpiCard label="Crescita GMV" value={`+${platformKpis.growthRatePct}%`} icon={TrendingUp} />
        <KpiCard label="Conversione media" value={`${conversionSeries.at(-1)}%`} icon={Percent} />
        <KpiCard label="Rating medio consulenti" value="4.8 / 5" icon={Star} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Crescita utenti registrati</h3>
            <p className="mt-1 text-sm text-body">Nuove registrazioni mensili, ultimi 6 mesi.</p>
            <BarMiniChart data={monthlyNewUsers} className="mt-6" />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Tasso di conversione medio</h3>
            <p className="mt-1 text-sm text-body">Percentuale di visite ai profili consulente che si trasformano in prenotazione.</p>
            <div className="mt-6 h-24">
              <LineMiniChart data={conversionSeries} color="#124A8A" className="h-full w-full" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-body">
              <span>Mar</span>
              <span>Ago</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Fatturato transato</h3>
            <p className="mt-1 text-sm text-body">Valore lordo prenotazioni completate.</p>
            <BarMiniChart data={monthlyRevenue} className="mt-6" />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-heading text-base font-semibold text-navy">Categorie più richieste</h3>
            <p className="mt-1 text-sm text-body">Numero di consulenti attivi per categoria (proxy della domanda).</p>
            <div className="mt-5 flex items-center gap-5">
              <DonutChart segments={categoryDemandDonut} size={110} strokeWidth={13} />
              <ul className="flex-1 space-y-1.5 text-xs">
                {topCategoriesByDemand.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-2">
                    <span className="text-body">{c.name}</span>
                    <span className="font-medium text-ink">{c.consultantCount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
