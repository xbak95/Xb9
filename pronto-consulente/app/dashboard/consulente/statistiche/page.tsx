import { Eye, Clock, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardBody } from "@/components/ui/Card";
import { LineMiniChart } from "@/components/ui/Chart";
import { consultants } from "@/data/consultants";

const consultant = consultants[0];

const monthlyViews = [
  { label: "Mar", value: 320 },
  { label: "Apr", value: 410 },
  { label: "Mag", value: 380 },
  { label: "Giu", value: 450 },
  { label: "Lug", value: 510 },
  { label: "Ago", value: 490 },
];

export default function StatistichePage() {
  return (
    <div>
      <PageHeader title="Statistiche" description="Come si sta comportando il tuo profilo pubblico su Pronto Consulente." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Eye} label="Visualizzazioni profilo" value={consultant.profileViews.toLocaleString("it-IT")} sublabel="Totali da sempre" tone="navy" />
        <KpiCard icon={Clock} label="Tempo medio di risposta" value={`${consultant.avgResponseTimeHours} h`} sublabel="Su tutte le richieste" tone="verified" />
        <KpiCard icon={TrendingUp} label="Tasso di conversione" value={`${consultant.conversionRate}%`} sublabel="Visite → prenotazioni" tone="gold" />
        <KpiCard icon={Users} label="Consulenze completate" value={consultant.completedConsultations.toLocaleString("it-IT")} sublabel="Totali da sempre" tone="navy" />
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-1 text-lg font-bold text-navy">Andamento visualizzazioni</h2>
          <p className="mb-5 text-sm text-body">Ultimi 6 mesi</p>
          <LineMiniChart data={monthlyViews.map((m) => m.value)} className="h-40 w-full" color="#124A8A" />
          <div className="mt-3 flex justify-between text-[11px] text-body">
            {monthlyViews.map((m) => (
              <span key={m.label}>{m.label}</span>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
