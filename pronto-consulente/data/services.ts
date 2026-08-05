import { consultants } from "./consultants";
import type { ServiceOffering } from "@/lib/types";

export interface ServiceWithConsultant extends ServiceOffering {
  consultantName: string;
  consultantSlug: string;
  consultantAvatar: string;
  consultantVerified: boolean;
}

export const allServices: ServiceWithConsultant[] = consultants.flatMap((c) =>
  c.services.map((s) => ({
    ...s,
    consultantName: c.fullName,
    consultantSlug: c.slug,
    consultantAvatar: c.avatarUrl,
    consultantVerified: c.badges.includes("identita_verificata"),
  }))
);

export const featuredServiceIds = [
  "s-03-1", // Revisione contratto
  "s-01-1", // Analisi preliminare bando
  "s-02-1", // Consulenza HSE 60 min
  "s-05-1", // Audit LinkedIn
  "s-06-1", // Valutazione GDPR
  "s-10-1", // Revisione business plan
];

export const featuredServices = featuredServiceIds
  .map((id) => allServices.find((s) => s.id === id))
  .filter((s): s is ServiceWithConsultant => Boolean(s));
