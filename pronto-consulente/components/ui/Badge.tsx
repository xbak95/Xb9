import { BadgeCheck, ShieldCheck, FileCheck2, Landmark, Crown, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationBadge } from "@/lib/types";

type Tone = "navy" | "gold" | "verified" | "neutral" | "danger";

const toneClasses: Record<Tone, string> = {
  navy: "bg-navy-50 text-navy-700 border-navy-100",
  gold: "bg-gold-50 text-gold-700 border-gold-200",
  verified: "bg-verified-50 text-verified-600 border-verified-50",
  neutral: "bg-muted text-body border-navy-100",
  danger: "bg-red-50 text-red-600 border-red-100",
};

export function Badge({
  tone = "neutral",
  icon,
  className,
  children,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

const badgeMeta: Record<VerificationBadge, { label: string; icon: React.ReactNode; tone: Tone }> = {
  identita_verificata: { label: "Identità verificata", icon: <BadgeCheck className="h-3.5 w-3.5" />, tone: "verified" },
  curriculum_verificato: { label: "CV verificato", icon: <FileCheck2 className="h-3.5 w-3.5" />, tone: "navy" },
  certificazioni_verificate: { label: "Certificazioni verificate", icon: <ShieldCheck className="h-3.5 w-3.5" />, tone: "navy" },
  partita_iva_verificata: { label: "P.IVA verificata", icon: <Landmark className="h-3.5 w-3.5" />, tone: "navy" },
  top_consultant: { label: "Top Consultant", icon: <Crown className="h-3.5 w-3.5" />, tone: "gold" },
  risposta_rapida: { label: "Risposta rapida", icon: <Zap className="h-3.5 w-3.5" />, tone: "verified" },
  consulente_premium: { label: "Consulente Premium", icon: <Award className="h-3.5 w-3.5" />, tone: "gold" },
};

export function VerificationBadgePill({ type, className }: { type: VerificationBadge; className?: string }) {
  const meta = badgeMeta[type];
  return (
    <Badge tone={meta.tone} icon={meta.icon} className={className}>
      {meta.label}
    </Badge>
  );
}

export { badgeMeta };
