"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/app/admin/_components/KpiCard";
import { activityLog, type ActivityLogType } from "@/data/admin-demo";

const typeLabels: Record<ActivityLogType, string> = {
  utente: "Utenti",
  consulente: "Consulenti",
  contenuto: "Contenuti",
  coupon: "Coupon",
  recensione: "Recensioni",
  pagamento: "Pagamenti",
  categoria: "Categorie",
  servizio: "Servizi",
};

const typeTone: Record<ActivityLogType, "navy" | "gold" | "verified" | "neutral" | "danger"> = {
  utente: "navy",
  consulente: "gold",
  contenuto: "neutral",
  coupon: "gold",
  recensione: "danger",
  pagamento: "verified",
  categoria: "navy",
  servizio: "neutral",
};

export default function AdminActivityLogPage() {
  const [typeFilter, setTypeFilter] = useState<ActivityLogType | "tutti">("tutti");

  const filtered = useMemo(
    () => activityLog.filter((e) => typeFilter === "tutti" || e.type === typeFilter),
    [typeFilter]
  );

  return (
    <div>
      <PageHeader
        title="Log attività"
        description="Registro delle azioni amministrative eseguite sulla piattaforma, per tracciabilità e audit interno."
      />

      <div className="mb-5">
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as ActivityLogType | "tutti")} className="sm:w-64">
          <option value="tutti">Tutti i tipi di evento</option>
          {Object.entries(typeLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={History} title="Nessun evento trovato" description="Modifica il filtro per vedere altri eventi." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3">Amministratore</th>
                  <th className="px-5 py-3">Azione</th>
                  <th className="px-5 py-3">Oggetto</th>
                  <th className="px-5 py-3">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td className="px-5 py-3.5 whitespace-nowrap text-body">{e.date}</td>
                    <td className="px-5 py-3.5 font-medium text-ink">{e.actor}</td>
                    <td className="px-5 py-3.5 text-body">{e.action}</td>
                    <td className="px-5 py-3.5 text-body">{e.target}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={typeTone[e.type]}>{typeLabels[e.type]}</Badge>
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
