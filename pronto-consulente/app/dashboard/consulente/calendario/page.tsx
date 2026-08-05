"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { consultants } from "@/data/consultants";

const TIME_SLOTS = ["09:00", "10:30", "14:00", "16:30"];
const consultant = consultants[0];

function dayLabel(iso: string) {
  return new Intl.DateTimeFormat("it-IT", { weekday: "short", day: "2-digit", month: "short" }).format(new Date(iso));
}

export default function CalendarioPage() {
  const { push } = useToast();
  const initial = useMemo(() => {
    const map = new Map<string, Set<string>>();
    consultant.availability.forEach((day) => map.set(day.date, new Set(day.times)));
    return map;
  }, []);
  const [availability, setAvailability] = useState<Map<string, Set<string>>>(initial);

  function toggle(date: string, time: string) {
    setAvailability((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(date) ?? []);
      if (set.has(time)) {
        set.delete(time);
      } else {
        set.add(time);
      }
      next.set(date, set);
      return next;
    });
  }

  function save() {
    push({ kind: "success", title: "Disponibilità aggiornata", description: "Le modifiche al calendario sono state salvate." });
  }

  const dates = consultant.availability.map((d) => d.date);

  return (
    <div>
      <PageHeader
        title="Calendario disponibilità"
        description="Attiva o disattiva le fasce orarie in cui sei disponibile per nuove prenotazioni."
      />

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="w-24 text-left text-xs font-semibold uppercase tracking-wide text-body">Orario</th>
                  {dates.map((date) => (
                    <th key={date} className="text-center text-xs font-semibold uppercase tracking-wide text-body">
                      {dayLabel(date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((time) => (
                  <tr key={time}>
                    <td className="text-sm font-medium text-ink">{time}</td>
                    {dates.map((date) => {
                      const available = availability.get(date)?.has(time) ?? false;
                      return (
                        <td key={date}>
                          <button
                            onClick={() => toggle(date, time)}
                            className={cn(
                              "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border text-xs font-medium transition-colors",
                              available
                                ? "border-verified-50 bg-verified-50 text-verified-600 hover:bg-verified-50/70"
                                : "border-navy-100 bg-muted text-body hover:border-navy-200"
                            )}
                          >
                            {available ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                            {available ? "Libero" : "Occupato"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy-50 pt-5">
            <div className="flex items-center gap-4 text-xs text-body">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-verified-50 ring-1 ring-verified-600" /> Disponibile
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted ring-1 ring-navy-200" /> Non disponibile
              </span>
            </div>
            <button
              onClick={save}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-navy px-5 text-sm font-medium text-white hover:bg-navy-800"
            >
              <CalendarDays className="h-4 w-4" /> Salva disponibilità
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
