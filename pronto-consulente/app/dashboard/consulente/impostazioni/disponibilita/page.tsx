"use client";

import { useState } from "react";
import { Plane, Trash2, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { cn, formatDate } from "@/lib/utils";

interface DaySchedule {
  day: string;
  active: boolean;
  start: string;
  end: string;
}

const initialSchedule: DaySchedule[] = [
  { day: "Lunedì", active: true, start: "09:00", end: "18:00" },
  { day: "Martedì", active: true, start: "09:00", end: "18:00" },
  { day: "Mercoledì", active: true, start: "09:00", end: "18:00" },
  { day: "Giovedì", active: true, start: "09:00", end: "18:00" },
  { day: "Venerdì", active: true, start: "09:00", end: "16:00" },
  { day: "Sabato", active: false, start: "09:00", end: "13:00" },
  { day: "Domenica", active: false, start: "09:00", end: "13:00" },
];

interface BlockedPeriod {
  id: string;
  from: string;
  to: string;
  reason: string;
}

export default function ImpostazioniDisponibilitaPage() {
  const { push } = useToast();
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
  const [blocks, setBlocks] = useState<BlockedPeriod[]>([
    { id: "b-01", from: "2026-08-18", to: "2026-08-29", reason: "Ferie estive" },
  ]);
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newReason, setNewReason] = useState("");

  function updateDay(index: number, patch: Partial<DaySchedule>) {
    setSchedule((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }

  function saveSchedule() {
    push({ kind: "success", title: "Orari di disponibilità aggiornati" });
  }

  function addBlock() {
    if (!newFrom || !newTo) return;
    setBlocks((prev) => [
      ...prev,
      { id: `b-${Date.now()}`, from: newFrom, to: newTo, reason: newReason || "Non disponibile" },
    ]);
    push({ kind: "success", title: "Periodo bloccato aggiunto", description: "Non riceverai richieste di prenotazione in queste date." });
    setNewFrom("");
    setNewTo("");
    setNewReason("");
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div>
      <PageHeader title="Impostazioni disponibilità" description="Definisci gli orari ricorrenti in cui sei disponibile e blocca eventuali periodi di assenza." />

      <Card>
        <CardBody>
          <h2 className="mb-4 text-lg font-bold text-navy">Fasce orarie ricorrenti</h2>
          <div className="space-y-2.5">
            {schedule.map((d, i) => (
              <div
                key={d.day}
                className={cn(
                  "grid grid-cols-1 items-center gap-3 rounded-xl border px-4 py-3 sm:grid-cols-[140px_auto_1fr_1fr]",
                  d.active ? "border-navy-100 bg-white" : "border-navy-50 bg-muted/50"
                )}
              >
                <span className={cn("text-sm font-medium", d.active ? "text-ink" : "text-body")}>{d.day}</span>
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-body">
                  <input
                    type="checkbox"
                    checked={d.active}
                    onChange={(e) => updateDay(i, { active: e.target.checked })}
                    className="h-4 w-4 rounded border-navy-200 text-navy focus:ring-navy-200"
                  />
                  Disponibile
                </label>
                <Input type="time" value={d.start} disabled={!d.active} onChange={(e) => updateDay(i, { start: e.target.value })} />
                <Input type="time" value={d.end} disabled={!d.active} onChange={(e) => updateDay(i, { end: e.target.value })} />
              </div>
            ))}
          </div>
          <Button className="mt-5" onClick={saveSchedule}>
            Salva orari
          </Button>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-1 inline-flex items-center gap-2 text-lg font-bold text-navy">
            <Plane className="h-5 w-5" /> Periodi di ferie / assenza
          </h2>
          <p className="mb-4 text-sm text-body">In questi periodi non riceverai nuove richieste di prenotazione.</p>

          <div className="space-y-2.5">
            {blocks.length === 0 && <p className="text-sm text-body">Nessun periodo bloccato.</p>}
            {blocks.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl border border-navy-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">
                    {formatDate(b.from)} — {formatDate(b.to)}
                  </p>
                  <p className="text-xs text-body">{b.reason}</p>
                </div>
                <button onClick={() => removeBlock(b.id)} aria-label="Rimuovi periodo" className="text-body hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 border-t border-navy-50 pt-5 sm:grid-cols-[1fr_1fr_1.2fr_auto]">
            <div>
              <Label htmlFor="block-from">Dal</Label>
              <Input id="block-from" type="date" value={newFrom} onChange={(e) => setNewFrom(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="block-to">Al</Label>
              <Input id="block-to" type="date" value={newTo} onChange={(e) => setNewTo(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="block-reason">Motivo (opzionale)</Label>
              <Input id="block-reason" placeholder="Es. Ferie estive" value={newReason} onChange={(e) => setNewReason(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button type="button" variant="outline" fullWidth onClick={addBlock} disabled={!newFrom || !newTo}>
                <Plus className="h-4 w-4" /> Aggiungi
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
