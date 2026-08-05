"use client";

import { useMemo, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Select, Input } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { clientBookings, consultantBookings } from "@/data/bookings";
import type { Booking, BookingStatus } from "@/lib/types";

const statusLabels: Record<BookingStatus, string> = {
  in_attesa: "In attesa",
  confermata: "Confermata",
  completata: "Completata",
  annullata: "Annullata",
  riprogrammata: "Riprogrammata",
};

// Unione delle prenotazioni lato cliente e lato consulente, deduplicata per id.
const allBookings: Booking[] = Array.from(
  new Map([...clientBookings, ...consultantBookings].map((b) => [b.id, b])).values()
);

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "tutte">("tutte");
  const [dateFrom, setDateFrom] = useState("");

  const filtered = useMemo(() => {
    return allBookings
      .filter((b) => statusFilter === "tutte" || b.status === statusFilter)
      .filter((b) => !dateFrom || b.date >= dateFrom)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [statusFilter, dateFrom]);

  return (
    <div>
      <PageHeader
        title="Prenotazioni"
        description={`${allBookings.length} prenotazioni registrate, utili per supporto clienti e controllo qualità del servizio.`}
      />

      <Card className="mb-5">
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "tutte")} className="sm:w-56">
            <option value="tutte">Tutti gli stati</option>
            <option value="in_attesa">In attesa</option>
            <option value="confermata">Confermata</option>
            <option value="completata">Completata</option>
            <option value="annullata">Annullata</option>
            <option value="riprogrammata">Riprogrammata</option>
          </Select>
          <div className="flex items-center gap-2 sm:w-64">
            <span className="shrink-0 text-xs text-body">A partire dal</span>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={CalendarCheck} title="Nessuna prenotazione trovata" description="Modifica i filtri per vedere altri risultati." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Consulente</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Servizio</th>
                  <th className="px-5 py-3">Data e ora</th>
                  <th className="px-5 py-3">Modalità</th>
                  <th className="px-5 py-3">Importo</th>
                  <th className="px-5 py-3">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={b.consultantAvatar} name={b.consultantName} size={28} />
                        <span className="font-medium text-ink">{b.consultantName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-body">{b.clientName}</td>
                    <td className="px-5 py-3.5 text-body">{b.serviceTitle}</td>
                    <td className="px-5 py-3.5 text-body">
                      {formatDate(b.date)} · {b.time}
                    </td>
                    <td className="px-5 py-3.5 text-body capitalize">{b.modality}</td>
                    <td className="px-5 py-3.5 text-body">{b.price === 0 ? "Gratuito" : formatCurrency(b.price)}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={statusTone(b.status)}>{statusLabels[b.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
