import type { LucideIcon } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive?: boolean };
  className?: string;
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-body">{label}</p>
            <p className="mt-2 font-heading text-2xl font-bold text-navy">{value}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <p className={cn("mt-3 text-xs font-semibold", trend.positive === false ? "text-red-600" : "text-verified-600")}>
            {trend.value}
          </p>
        )}
      </CardBody>
    </Card>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-body">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

const statusToneMap: Record<string, "verified" | "gold" | "danger" | "neutral" | "navy"> = {
  attivo: "verified",
  approvato: "verified",
  confermata: "verified",
  completata: "verified",
  completato: "verified",
  accettato: "verified",
  aperto: "gold",
  in_attesa: "gold",
  in_lavorazione: "gold",
  inviato: "gold",
  aperta: "gold",
  riprogrammata: "gold",
  sospeso: "danger",
  rifiutato: "danger",
  annullata: "danger",
  rimborsato: "danger",
  chiuso: "neutral",
  chiusa: "neutral",
  scaduto: "neutral",
  disiscritto: "neutral",
};

export function statusTone(status: string): "verified" | "gold" | "danger" | "neutral" | "navy" {
  return statusToneMap[status] ?? "navy";
}
