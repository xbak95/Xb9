import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";

export function KpiCard({
  icon: Icon,
  label,
  value,
  sublabel,
  trend,
  tone = "navy",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  trend?: { value: string; positive: boolean };
  tone?: "navy" | "gold" | "verified";
}) {
  const toneClasses = {
    navy: "bg-navy-50 text-navy-700",
    gold: "bg-gold-50 text-gold-700",
    verified: "bg-verified-50 text-verified-600",
  } as const;

  return (
    <Card>
      <CardBody className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneClasses[tone])}>
            <Icon className="h-5 w-5" />
          </span>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                trend.positive ? "text-verified-600" : "text-red-600"
              )}
            >
              {trend.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {trend.value}
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-navy">{value}</p>
          <p className="mt-0.5 text-sm text-body">{label}</p>
          {sublabel && <p className="mt-1 text-xs text-body/80">{sublabel}</p>}
        </div>
      </CardBody>
    </Card>
  );
}
