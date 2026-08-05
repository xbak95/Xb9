import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import { AdminShell } from "@/app/admin/_components/AdminShell";

export const metadata: Metadata = {
  title: "Area amministratore",
  description: "Pannello di controllo interno per la gestione di Pronto Consulente.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}
