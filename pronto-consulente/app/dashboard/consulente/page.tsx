import { Inbox, CalendarCheck, Wallet, TrendingUp, MessageSquare, Star, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardBody } from "@/components/ui/Card";
import { BarMiniChart, DonutChart } from "@/components/ui/Chart";
import { consultants } from "@/data/consultants";
import { consultantBookings } from "@/data/bookings";
import { formatCurrency } from "@/lib/utils";

const TODAY = new Date("2026-08-05T00:00:00Z");
const consultant = consultants[0];

export default function ConsulenteDashboardPage() {
  const richiesteInAttesa = consultantBookings.filter((b) => b.status === "in_attesa").length;

  const inSevenDays = new Date(TODAY);
  inSevenDays.setDate(TODAY.getDate() + 7);
  const appuntamentiSettimana = consultantBookings.filter(
    (b) => b.status === "confermata" && new Date(b.date) >= TODAY && new Date(b.date) <= inSevenDays
  ).length;

  const guadagniConfermatiAgosto = consultantBookings
    .filter((b) => b.status === "confermata" && b.date.startsWith("2026-08"))
    .reduce((s, b) => s + b.price, 0);
  const inAttesaConfermaAgosto = consultantBookings
    .filter((b) => b.status === "in_attesa" && b.date.startsWith("2026-08"))
    .reduce((s, b) => s + b.price, 0);

  const guadagniMensili = [
    { label: "Mar", value: 2100 },
    { label: "Apr", value: 1800 },
    { label: "Mag", value: 2600 },
    { label: "Giu", value: 900 },
    { label: "Lug", value: 1350 },
    { label: "Ago", value: guadagniConfermatiAgosto },
  ];

  const serviceCounts = new Map<string, number>();
  consultantBookings.forEach((b) => serviceCounts.set(b.serviceTitle, (serviceCounts.get(b.serviceTitle) ?? 0) + 1));
  const donutColors = ["#124A8A", "#C89B4A", "#2E9D67", "#7F9BC8"];
  const donutSegments = Array.from(serviceCounts.entries()).map(([label, value], i) => ({
    label,
    value,
    color: donutColors[i % donutColors.length],
  }));

  const attivita = [
    { icon: Inbox, text: "Nuova richiesta di preventivo da Enrico Bassi", date: "02 agosto 2026" },
    { icon: CalendarCheck, text: "Prenotazione confermata con Silvia Bruno", date: "05 agosto 2026" },
    { icon: Star, text: "Recensione a 5 stelle da Marco Villa", date: "12 giugno 2026" },
    { icon: MessageSquare, text: "2 messaggi non letti da Silvia Bruno", date: "05 agosto 2026" },
    { icon: CheckCircle2, text: "Pratica completata per Tommaso Ricci (1.200€)", date: "02 luglio 2026" },
  ];

  return (
    <div>
      <PageHeader
        title={`Bentornato, ${consultant.fullName.split(" ")[0]}`}
        description="Ecco come sta andando la tua attività su Pronto Consulente."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Inbox} label="Richieste in attesa" value={String(richiesteInAttesa)} tone="gold" />
        <KpiCard icon={CalendarCheck} label="Appuntamenti (7 giorni)" value={String(appuntamentiSettimana)} tone="navy" />
        <KpiCard
          icon={Wallet}
          label="Guadagni confermati — Agosto"
          value={formatCurrency(guadagniConfermatiAgosto)}
          sublabel={inAttesaConfermaAgosto > 0 ? `${formatCurrency(inAttesaConfermaAgosto)} in attesa di conferma` : undefined}
          tone="verified"
        />
        <KpiCard
          icon={TrendingUp}
          label="Tasso di conversione"
          value={`${consultant.conversionRate}%`}
          trend={{ value: "+2,1% vs mese scorso", positive: true }}
          tone="navy"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <h2 className="mb-1 text-lg font-bold text-navy">Guadagni ultimi 6 mesi</h2>
            <p className="mb-4 text-sm text-body">Importi lordi da consulenze completate e confermate</p>
            <BarMiniChart data={guadagniMensili} />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="mb-1 text-lg font-bold text-navy">Distribuzione servizi</h2>
            <p className="mb-4 text-sm text-body">Per numero di prenotazioni</p>
            <div className="flex items-center gap-5">
              <DonutChart segments={donutSegments} size={120} strokeWidth={14} />
              <ul className="space-y-2 text-xs">
                {donutSegments.map((s) => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-body">{s.label}</span>
                    <span className="font-semibold text-ink">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-4 text-lg font-bold text-navy">Attività recente</h2>
          <ul className="space-y-3">
            {attivita.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
                  <a.icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-ink">{a.text}</p>
                  <p className="text-xs text-body">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
