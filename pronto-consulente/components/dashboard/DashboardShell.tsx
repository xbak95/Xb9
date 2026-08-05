"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { Menu, X, LogOut, ArrowLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { useToast } from "@/components/ui/Toast";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: { href: string; label: string }[];
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard/cliente" || href === "/dashboard/consulente") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({ item, pathname, onNavigate }: { item: DashboardNavItem; pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(isActive(pathname, item.href));
  const Icon = item.icon;
  const active = isActive(pathname, item.href) && !item.children;
  const groupActive = item.children ? item.children.some((c) => isActive(pathname, c.href)) : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
            groupActive ? "bg-navy-50 text-navy" : "text-navy-700 hover:bg-navy-50/70"
          )}
        >
          <Icon className="h-[18px] w-[18px] shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="ml-[26px] mt-1 flex flex-col gap-0.5 border-l border-navy-100 pl-4">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(pathname, child.href) ? "font-semibold text-gold-700" : "text-body hover:text-navy"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
        active ? "bg-navy text-white shadow-sm" : "text-navy-700 hover:bg-navy-50/70"
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {item.label}
    </Link>
  );
}

function SidebarContent({ nav, pathname, onNavigate }: { nav: DashboardNavItem[]; pathname: string; onNavigate: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-navy-100 px-5 py-5">
        <Logo size={34} />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {nav.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="border-t border-navy-100 p-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-body hover:bg-navy-50/70 hover:text-navy"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
          Torna al sito
        </Link>
      </div>
    </div>
  );
}

export function DashboardShell({
  role,
  portalLabel,
  userName,
  userAvatar,
  nav,
  children,
}: {
  role: "cliente" | "consulente";
  portalLabel: string;
  userName: string;
  userAvatar?: string;
  nav: DashboardNavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { push } = useToast();

  const handleLogout = () => {
    push({ kind: "info", title: "Disconnesso", description: "Sessione demo terminata. In produzione verresti reindirizzato al login." });
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-navy-100 bg-white lg:block">
        <SidebarContent nav={nav} pathname={pathname} onNavigate={() => {}} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] animate-fade-up bg-white shadow-premium">
            <div className="flex items-center justify-between border-b border-navy-100 px-4 py-4">
              <Logo size={30} />
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Chiudi menu"
                className="rounded-lg p-1.5 text-body hover:bg-muted hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-0.5 overflow-y-auto px-3 py-4">
              {nav.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
              ))}
            </nav>
            <div className="border-t border-navy-100 p-4">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-body hover:bg-navy-50/70 hover:text-navy"
              >
                <ArrowLeft className="h-[18px] w-[18px]" />
                Torna al sito
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-navy-100 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Apri menu"
              className="rounded-lg p-2 text-navy hover:bg-navy-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="hidden text-sm font-semibold text-navy sm:inline">{portalLabel}</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-navy-50 hover:text-navy sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al sito
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Esci"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Esci</span>
            </button>
            <div className="flex items-center gap-2.5 border-l border-navy-100 pl-2.5 sm:pl-3">
              <Avatar src={userAvatar} name={userName} size={36} />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-ink">{userName}</p>
                <p className="text-xs capitalize text-body">{role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
