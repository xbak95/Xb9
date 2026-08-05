import { CalendarCheck, ClipboardList, FileSignature, Heart, ArrowRight, Clock, MessageSquare, Star, Video } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { BookingStatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { BarMiniChart } from "@/components/ui/Chart";
import { clientBookings, quoteRequests } from "@/data/bookings";
import { formatCurrency, formatDate } from "@/lib/utils";

const TODAY = new Date("2026-08-05T00:00:00Z");

export default function ClienteDashboardPage() {
  const prenotazioniAttive = clientBookings.filter((b) =>
    ["in_attesa", "confermata", "riprogrammata"].includes(b.status)
  ).length;

  const richiesteInCorso = quoteRequests.filter((q) => q.status === "in_attesa" || q.status === "inviato").length;
  const preventiviRicevuti = quoteRequests.filter((q) => typeof q.amount === "number").length;
  const consulentiPreferiti = 4;

  const prossimoAppuntamento = clientBookings
    .filter((b) => b.status === "confermata" && new Date(b.date) >= TODAY)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];

  const spesaMensile = [
    { label: "Mar", value: 60 },
    { label: "Apr", value: 140 },
    { label: "Mag", value: 95 },
    { label: "Giu", value: 90 },
    { label: "Lug", value: 400 },
    { label: "Ago", value: 0 },
  ];

  const attivita = [
    {
      icon: CalendarCheck,
      text: `Prenotazione confermata con ${clientBookings[0].consultantName}`,
      date: "04 agosto 2026",
    },
    {
      icon: FileSignature,
      text: "Hai ricevuto un preventivo da Luca Pellegrini (750€)",
      date: "28 luglio 2026",
    },
    {
      icon: Star,
      text: "Hai lasciato una recensione ad Avv. Marco Rinaldi",
      date: "16 luglio 2026",
    },
    {
      icon: MessageSquare,
      text: "Nuovo messaggio da Alessandro Ferretti",
      date: "05 agosto 2026",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Bentornato, Marco"
        description="Ecco un riepilogo delle tue attività su Pronto Consulente."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={CalendarCheck} label="Prenotazioni attive" value={String(prenotazioniAttive)} tone="navy" />
        <KpiCard icon={ClipboardList} label="Richieste in corso" value={String(richiesteInCorso)} tone="gold" />
        <KpiCard icon={FileSignature} label="Preventivi ricevuti" value={String(preventiviRicevuti)} tone="verified" />
        <KpiCard icon={Heart} label="Consulenti preferiti" value={String(consulentiPreferiti)} tone="navy" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">Prossimo appuntamento</h2>
              <ButtonLink href="/dashboard/cliente/prenotazioni" variant="ghost" size="sm">
                Vedi tutte <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            {prossimoAppuntamento ? (
              <div className="flex flex-col gap-4 rounded-xl border border-navy-100 bg-navy-50/40 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar src={prossimoAppuntamento.consultantAvatar} name={prossimoAppuntamento.consultantName} size={52} ring />
                  <div>
                    <p className="font-semibold text-ink">{prossimoAppuntamento.consultantName}</p>
                    <p className="text-sm text-body">{prossimoAppuntamento.serviceTitle}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-body">
                      <span className="inline-flex items-center gap-1">
                        <CalendarCheck className="h-3.5 w-3.5" /> {formatDate(prossimoAppuntamento.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {prossimoAppuntamento.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Video className="h-3.5 w-3.5" /> {prossimoAppuntamento.modality}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookingStatusBadge status={prossimoAppuntamento.status} />
                  <span className="text-sm font-semibold text-navy">{formatCurrency(prossimoAppuntamento.price)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-body">Nessun appuntamento confermato in programma.</p>
            )}

            <h3 className="mb-3 mt-6 text-sm font-semibold text-navy">Attività recente</h3>
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

        <Card>
          <CardBody>
            <h2 className="mb-1 text-lg font-bold text-navy">Spesa mensile</h2>
            <p className="mb-4 text-sm text-body">Ultimi 6 mesi</p>
            <BarMiniChart data={spesaMensile} />
            <p className="mt-4 text-xs text-body">
              Totale periodo: <span className="font-semibold text-ink">{formatCurrency(spesaMensile.reduce((s, d) => s + d.value, 0))}</span>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
