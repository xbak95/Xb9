"use client";

import { useState } from "react";
import { LifeBuoy, Send, X } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea, Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { supportTickets as seed, type SupportTicket } from "@/data/admin-demo";

const priorityTone: Record<SupportTicket["priority"], "danger" | "gold" | "neutral"> = {
  alta: "danger",
  media: "gold",
  bassa: "neutral",
};

const priorityLabels: Record<SupportTicket["priority"], string> = { alta: "Alta", media: "Media", bassa: "Bassa" };
const statusLabels: Record<SupportTicket["status"], string> = { aperto: "Aperto", in_lavorazione: "In lavorazione", chiuso: "Chiuso" };

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(seed);
  const [statusFilter, setStatusFilter] = useState<SupportTicket["status"] | "tutti">("tutti");
  const [selectedId, setSelectedId] = useState<string | null>(seed[0]?.id ?? null);
  const [reply, setReply] = useState("");
  const { push } = useToast();

  const filtered = tickets.filter((t) => statusFilter === "tutti" || t.status === statusFilter);
  const selected = tickets.find((t) => t.id === selectedId) ?? null;

  function sendReply() {
    if (!selected || !reply.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? {
              ...t,
              status: "in_lavorazione",
              messages: [...t.messages, { sender: "assistenza", text: reply.trim(), date: "2026-08-05" }],
            }
          : t
      )
    );
    setReply("");
    push({ kind: "success", title: "Risposta inviata", description: "Il cliente riceverà una notifica via email." });
  }

  function closeTicket(id: string) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: "chiuso" } : t)));
    push({ kind: "info", title: "Ticket chiuso" });
  }

  return (
    <div>
      <PageHeader
        title="Ticket assistenza"
        description={`${tickets.filter((t) => t.status !== "chiuso").length} ticket aperti o in lavorazione su ${tickets.length} totali.`}
      />

      <div className="mb-5">
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as SupportTicket["status"] | "tutti")} className="sm:w-56">
          <option value="tutti">Tutti gli stati</option>
          <option value="aperto">Aperto</option>
          <option value="in_lavorazione">In lavorazione</option>
          <option value="chiuso">Chiuso</option>
        </Select>
      </div>

      {tickets.length === 0 ? (
        <EmptyState icon={LifeBuoy} title="Nessun ticket" description="Non ci sono richieste di assistenza al momento." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          <Card className="lg:max-h-[640px] lg:overflow-y-auto">
            <ul className="divide-y divide-navy-50">
              {filtered.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setSelectedId(t.id)}
                    className={`w-full px-5 py-3.5 text-left transition-colors ${selected?.id === t.id ? "bg-navy-50" : "hover:bg-muted/60"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{t.subject}</p>
                      <Badge tone={priorityTone[t.priority]}>{priorityLabels[t.priority]}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-body">{t.clientName} · {formatDate(t.date)}</p>
                    <Badge tone={statusTone(t.status)} className="mt-2">
                      {statusLabels[t.status]}
                    </Badge>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-5 py-6 text-center text-sm text-body">Nessun ticket con questo stato.</li>}
            </ul>
          </Card>

          <Card>
            <CardBody>
              {!selected ? (
                <p className="text-sm text-body">Seleziona un ticket per vederne il dettaglio.</p>
              ) : (
                <div>
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-navy">{selected.subject}</h3>
                      <p className="mt-0.5 text-sm text-body">{selected.clientName} · {formatDate(selected.date)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={priorityTone[selected.priority]}>{priorityLabels[selected.priority]}</Badge>
                      <Badge tone={statusTone(selected.status)}>{statusLabels[selected.status]}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-xl border border-navy-100 bg-muted/40 p-4">
                    {selected.messages.map((m, i) => (
                      <div key={i} className={`flex ${m.sender === "assistenza" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                            m.sender === "assistenza" ? "bg-navy text-white" : "bg-white text-ink shadow-card"
                          }`}
                        >
                          <p>{m.text}</p>
                          <p className={`mt-1 text-[11px] ${m.sender === "assistenza" ? "text-white/60" : "text-body"}`}>
                            {m.sender === "assistenza" ? "Assistenza" : selected.clientName} · {formatDate(m.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selected.status !== "chiuso" && (
                    <div className="mt-4">
                      <Textarea rows={3} placeholder="Scrivi una risposta al cliente…" value={reply} onChange={(e) => setReply(e.target.value)} />
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" onClick={sendReply} disabled={!reply.trim()}>
                          <Send className="h-3.5 w-3.5" /> Invia risposta
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => closeTicket(selected.id)}>
                          <X className="h-3.5 w-3.5" /> Chiudi ticket
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
