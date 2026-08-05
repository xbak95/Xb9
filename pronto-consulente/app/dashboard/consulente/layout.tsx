"use client";

import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  CalendarDays,
  MessageSquare,
  Briefcase,
  FileSignature,
  ShoppingBag,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  Star,
  BarChart3,
  Settings,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { ToastProvider } from "@/components/ui/Toast";
import { consultants } from "@/data/consultants";

const consultant = consultants[0];

const nav: DashboardNavItem[] = [
  { href: "/dashboard/consulente", label: "Panoramica", icon: LayoutDashboard },
  { href: "/dashboard/consulente/richieste", label: "Richieste", icon: Inbox },
  { href: "/dashboard/consulente/appuntamenti", label: "Appuntamenti", icon: CalendarCheck },
  { href: "/dashboard/consulente/calendario", label: "Calendario", icon: CalendarDays },
  { href: "/dashboard/consulente/messaggi", label: "Messaggi", icon: MessageSquare },
  { href: "/dashboard/consulente/servizi", label: "Servizi", icon: Briefcase },
  { href: "/dashboard/consulente/preventivi", label: "Preventivi", icon: FileSignature },
  { href: "/dashboard/consulente/ordini", label: "Ordini", icon: ShoppingBag },
  { href: "/dashboard/consulente/clienti", label: "Clienti", icon: Users },
  { href: "/dashboard/consulente/guadagni", label: "Guadagni", icon: Wallet },
  { href: "/dashboard/consulente/pagamenti", label: "Pagamenti", icon: CreditCard },
  { href: "/dashboard/consulente/fatture", label: "Fatture", icon: Receipt },
  { href: "/dashboard/consulente/recensioni", label: "Recensioni", icon: Star },
  { href: "/dashboard/consulente/statistiche", label: "Statistiche", icon: BarChart3 },
  {
    href: "/dashboard/consulente/impostazioni",
    label: "Impostazioni",
    icon: Settings,
    children: [
      { href: "/dashboard/consulente/impostazioni/profilo", label: "Profilo" },
      { href: "/dashboard/consulente/impostazioni/disponibilita", label: "Disponibilità" },
    ],
  },
];

export default function ConsulenteDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DashboardShell
        role="consulente"
        portalLabel="Area Consulente"
        userName={consultant.fullName}
        userAvatar={consultant.avatarUrl}
        nav={nav}
      >
        {children}
      </DashboardShell>
    </ToastProvider>
  );
}
