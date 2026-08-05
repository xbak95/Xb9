import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  LayoutGrid,
  Briefcase,
  Star,
  Flag,
  CalendarCheck,
  Wallet,
  Crown,
  BarChart3,
  LifeBuoy,
  FileText,
  Ticket,
  Mail,
  History,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Panoramica", icon: LayoutDashboard },
  { href: "/admin/utenti", label: "Utenti", icon: Users },
  { href: "/admin/verifica-consulenti", label: "Verifica consulenti", icon: ShieldCheck },
  { href: "/admin/categorie", label: "Categorie", icon: LayoutGrid },
  { href: "/admin/servizi", label: "Servizi", icon: Briefcase },
  { href: "/admin/recensioni", label: "Recensioni", icon: Star },
  { href: "/admin/segnalazioni", label: "Segnalazioni", icon: Flag },
  { href: "/admin/prenotazioni", label: "Prenotazioni", icon: CalendarCheck },
  { href: "/admin/pagamenti", label: "Pagamenti e commissioni", icon: Wallet },
  { href: "/admin/abbonamenti", label: "Abbonamenti", icon: Crown },
  { href: "/admin/statistiche", label: "Statistiche", icon: BarChart3 },
  { href: "/admin/ticket", label: "Ticket assistenza", icon: LifeBuoy },
  { href: "/admin/contenuti", label: "Contenuti", icon: FileText },
  { href: "/admin/coupon", label: "Coupon", icon: Ticket },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/log", label: "Log attività", icon: History },
];
