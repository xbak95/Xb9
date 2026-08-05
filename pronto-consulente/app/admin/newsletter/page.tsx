"use client";

import { useState } from "react";
import { Mail, Send, MousePointerClick, Eye, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { KpiCard, PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { newsletterSubscribers, newsletterStats } from "@/data/admin-demo";

export default function AdminNewsletterPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { push } = useToast();

  function sendCampaign() {
    if (!subject.trim() || !body.trim()) return;
    push({
      kind: "success",
      title: "Invio programmato",
      description: `La newsletter "${subject}" verrà inviata a ${newsletterStats.activeSubscribers} iscritti attivi (demo, invio non reale).`,
    });
    setSubject("");
    setBody("");
  }

  return (
    <div>
      <PageHeader title="Newsletter" description="Gestisci gli iscritti e componi un nuovo invio (demo, nessuna email reale viene spedita)." />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Iscritti totali" value={newsletterStats.totalSubscribers.toString()} icon={Users} />
        <KpiCard label="Iscritti attivi" value={newsletterStats.activeSubscribers.toString()} icon={Mail} />
        <KpiCard label="Tasso apertura (ultima campagna)" value={`${newsletterStats.lastCampaignOpenRate}%`} icon={Eye} />
        <KpiCard label="Tasso click (ultima campagna)" value={`${newsletterStats.lastCampaignClickRate}%`} icon={MousePointerClick} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardBody>
            <h3 className="mb-4 font-heading text-base font-semibold text-navy">Iscritti</h3>
            <div className="max-h-[420px] overflow-y-auto">
              <ul className="divide-y divide-navy-50">
                {newsletterSubscribers.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-ink">{s.name}</p>
                      <p className="text-xs text-body">{s.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge tone={statusTone(s.status)}>{s.status === "attivo" ? "Attivo" : "Disiscritto"}</Badge>
                      <p className="mt-1 text-[11px] text-body">Dal {formatDate(s.subscribedDate)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="mb-4 font-heading text-base font-semibold text-navy">Componi nuovo invio</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nl-subject" required>
                  Oggetto
                </Label>
                <Input id="nl-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Es. Le novità di agosto su Pronto Consulente" />
              </div>
              <div>
                <Label htmlFor="nl-body" required>
                  Contenuto
                </Label>
                <Textarea id="nl-body" rows={7} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Scrivi il testo della newsletter…" />
              </div>
              <Button onClick={sendCampaign} disabled={!subject.trim() || !body.trim()}>
                <Send className="h-4 w-4" /> Invia a {newsletterStats.activeSubscribers} iscritti
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-navy-100 bg-muted/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-body">Performance media storica</p>
              <div className="mt-2 flex gap-6 text-sm">
                <span className="text-body">
                  Apertura: <strong className="text-ink">{newsletterStats.averageOpenRate}%</strong>
                </span>
                <span className="text-body">
                  Click: <strong className="text-ink">{newsletterStats.averageClickRate}%</strong>
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
