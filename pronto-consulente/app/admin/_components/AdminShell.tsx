"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { adminNavItems } from "@/app/admin/_lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-0.5">
        {adminNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" style={active ? { color: "#7F9BC8" } : undefined} />
                <span>{item.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#4C6FA8" }} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentLabel = adminNavItems.find((i) => isActive(pathname, i.href))?.label ?? "Area amministratore";

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar desktop */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-navy-950 lg:flex"
        aria-label="Navigazione amministratore"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
          <Logo variant="light" size={34} href="/admin" />
        </div>
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <ShieldAlert className="h-4 w-4" style={{ color: "#7F9BC8" }} />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Area interna · Admin</span>
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 px-4 py-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white/90"
          >
            <LogOut className="h-4 w-4" />
            Esci dall'area admin
          </button>
        </div>
      </aside>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-navy-950 shadow-premium">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <Logo variant="light" size={32} href="/admin" />
              <button
                aria-label="Chiudi menu"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenuto */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-navy-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Apri menu"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg border border-navy-100 p-2 text-navy lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-body">Pronto Consulente · Admin</p>
            <h1 className="text-base font-bold text-navy sm:text-lg">{currentLabel}</h1>
          </div>
        </header>
        <main id="main-content" className="container-px py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
