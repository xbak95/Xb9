"use client";

import { useState } from "react";
import { FileText, MapPin, CalendarClock, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Label, Textarea } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { verificationQueue as seed, type VerificationRequest } from "@/data/admin-demo";

export default function VerificationQueuePage() {
  const [queue, setQueue] = useState<VerificationRequest[]>(seed);
  const [rejecting, setRejecting] = useState<VerificationRequest | null>(null);
  const [reason, setReason] = useState("");
  const { push } = useToast();

  const pending = queue.filter((v) => v.status === "in_attesa");

  function approve(v: VerificationRequest) {
    setQueue((prev) => prev.map((item) => (item.id === v.id ? { ...item, status: "approvato" } : item)));
    push({ kind: "success", title: "Consulente approvato", description: `${v.consultantName} è ora verificato sulla piattaforma.` });
  }

  function confirmReject() {
    if (!rejecting) return;
    setQueue((prev) => prev.map((item) => (item.id === rejecting.id ? { ...item, status: "rifiutato" } : item)));
    push({
      kind: "error",
      title: "Candidatura rifiutata",
      description: `${rejecting.consultantName} è stato notificato con la motivazione indicata.`,
    });
    setRejecting(null);
    setReason("");
  }

  return (
    <div>
      <PageHeader
        title="Verifica consulenti"
        description="Controlla identità, curriculum e certificazioni caricati dai consulenti prima di approvarne il profilo pubblico."
      />

      {pending.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="Nessuna candidatura in attesa" description="Tutte le richieste di verifica sono state gestite." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {pending.map((v) => (
            <Card key={v.id}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <Avatar src={`https://i.pravatar.cc/120?img=${v.avatarSeed}`} name={v.consultantName} size={52} />
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-navy">{v.consultantName}</h3>
                    <p className="text-sm text-body">{v.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-body">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {v.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock className="h-3.5 w-3.5" /> Candidatura del {formatDate(v.submittedDate)}
                      </span>
                    </div>
                  </div>
                  <Badge tone="gold">{v.categoryName}</Badge>
                </div>

                <div className="mt-4 space-y-2 rounded-xl border border-navy-100 bg-muted/50 p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-body">Documenti da controllare</p>
                  <ul className="space-y-1.5">
                    {v.documents.map((doc) => (
                      <li key={doc.name} className="flex items-center gap-2 text-sm text-ink">
                        <FileText className="h-4 w-4 shrink-0 text-navy-600" />
                        <span className="flex-1">{doc.name}</span>
                        <Badge tone="neutral" className="shrink-0">{doc.type}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex gap-2.5">
                  <Button variant="primary" size="sm" fullWidth onClick={() => approve(v)}>
                    <CheckCircle2 className="h-4 w-4" /> Approva
                  </Button>
                  <Button variant="danger" size="sm" fullWidth onClick={() => setRejecting(v)}>
                    <XCircle className="h-4 w-4" /> Rifiuta
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(rejecting)}
        onClose={() => {
          setRejecting(null);
          setReason("");
        }}
        title="Motiva il rifiuto"
        description={rejecting ? `Candidatura di ${rejecting.consultantName}` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setRejecting(null)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={confirmReject} disabled={!reason.trim()}>
              Conferma rifiuto
            </Button>
          </>
        }
      >
        <Label htmlFor="reject-reason" required>
          Motivazione (visibile al consulente)
        </Label>
        <Textarea
          id="reject-reason"
          rows={4}
          placeholder="Es. documento d'identità non leggibile, certificazione non verificabile presso l'ente…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}
