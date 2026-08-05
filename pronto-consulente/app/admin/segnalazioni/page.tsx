"use client";

import { useState } from "react";
import { Flag, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { PageHeader, statusTone } from "@/app/admin/_components/KpiCard";
import { reports as seedReports, type Report } from "@/data/admin-demo";

const typeLabels: Record<Report["reportedType"], string> = {
  consulente: "Consulente",
  cliente: "Cliente",
  recensione: "Recensione",
  servizio: "Servizio",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [detail, setDetail] = useState<Report | null>(null);
  const { push } = useToast();

  function closeReport(id: string) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "chiusa" } : r)));
    push({ kind: "success", title: "Segnalazione chiusa", description: "La segnalazione è stata archiviata." });
    setDetail(null);
  }

  const open = reports.filter((r) => r.status === "aperta");
  const closed = reports.filter((r) => r.status === "chiusa");

  return (
    <div>
      <PageHeader
        title="Segnalazioni"
        description={`${open.length} segnalazioni aperte da valutare, ${closed.length} già archiviate.`}
      />

      {reports.length === 0 ? (
        <EmptyState icon={Flag} title="Nessuna segnalazione" description="Non ci sono segnalazioni da moderare al momento." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Motivo</th>
                  <th className="px-5 py-3">Tipo</th>
                  <th className="px-5 py-3">Segnalante</th>
                  <th className="px-5 py-3">Segnalato</th>
                  <th className="px-5 py-3">Stato</th>
                  <th className="px-5 py-3 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3.5 font-medium text-ink">{r.reason}</td>
                    <td className="px-5 py-3.5 text-body">{typeLabels[r.reportedType]}</td>
                    <td className="px-5 py-3.5 text-body">{r.reporterName}</td>
                    <td className="px-5 py-3.5 text-body">{r.reportedName}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={statusTone(r.status)}>{r.status === "aperta" ? "Aperta" : "Chiusa"}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button variant="outline" size="sm" onClick={() => setDetail(r)}>
                        <Eye className="h-3.5 w-3.5" /> Dettaglio
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.reason ?? ""}
        description={detail ? `${formatDate(detail.date)} · ${typeLabels[detail.reportedType]}` : undefined}
        footer={
          detail?.status === "aperta" ? (
            <>
              <Button variant="outline" onClick={() => setDetail(null)}>
                Chiudi finestra
              </Button>
              <Button variant="primary" onClick={() => detail && closeReport(detail.id)}>
                Chiudi segnalazione
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setDetail(null)}>
              Chiudi finestra
            </Button>
          )
        }
      >
        {detail && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted p-3.5 text-xs">
              <div>
                <p className="font-semibold uppercase tracking-wide text-body">Segnalante</p>
                <p className="mt-0.5 text-ink">{detail.reporterName}</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-body">Segnalato</p>
                <p className="mt-0.5 text-ink">{detail.reportedName}</p>
              </div>
            </div>
            <p className="text-body">{detail.details}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
