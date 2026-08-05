import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  FileSignature,
  MessageSquare,
  Heart,
  FolderOpen,
  CreditCard,
  Receipt,
  Star,
  Settings,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { ToastProvider } from "@/components/ui/Toast";

const nav: DashboardNavItem[] = [
  { href: "/dashboard/cliente", label: "Panoramica", icon: LayoutDashboard },
  { href: "/dashboard/cliente/prenotazioni", label: "Prenotazioni", icon: CalendarCheck },
  { href: "/dashboard/cliente/richieste", label: "Richieste", icon: ClipboardList },
  { href: "/dashboard/cliente/preventivi", label: "Preventivi", icon: FileSignature },
  { href: "/dashboard/cliente/messaggi", label: "Messaggi", icon: MessageSquare },
  { href: "/dashboard/cliente/preferiti", label: "Preferiti", icon: Heart },
  { href: "/dashboard/cliente/documenti", label: "Documenti", icon: FolderOpen },
  { href: "/dashboard/cliente/pagamenti", label: "Pagamenti", icon: CreditCard },
  { href: "/dashboard/cliente/fatture", label: "Fatture", icon: Receipt },
  { href: "/dashboard/cliente/recensioni", label: "Recensioni", icon: Star },
  { href: "/dashboard/cliente/impostazioni", label: "Impostazioni", icon: Settings },
];

export default function ClienteDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DashboardShell
        role="cliente"
        portalLabel="Area Cliente"
        userName="Marco Bianchi"
        userAvatar="https://i.pravatar.cc/300?img=68"
        nav={nav}
      >
        {children}
      </DashboardShell>
    </ToastProvider>
  );
}
