"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { categories, topCategorySlugs } from "@/data/categories";

const navLinks = [
  { href: "/ricerca", label: "Trova un consulente" },
  { href: "/categorie", label: "Categorie", hasMenu: true },
  { href: "/come-funziona", label: "Come funziona" },
  { href: "/per-consulenti", label: "Per i consulenti" },
  { href: "/prezzi", label: "Prezzi" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const topCategories = categories.filter((c) => topCategorySlugs.includes(c.slug));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-200",
        scrolled ? "border-navy-100 bg-white/95 shadow-sm backdrop-blur" : "border-transparent bg-white"
      )}
    >
      <div className="container-px flex h-[4.5rem] items-center justify-between py-3.5">
        <Logo size={38} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigazione principale">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {categoriesOpen && (
                  <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-navy-100 bg-white p-3 shadow-premium">
                      {topCategories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/ricerca?categoria=${c.slug}`}
                          className="rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-navy-50"
                        >
                          <span className="font-medium text-navy-800">{c.name}</span>
                          <span className="block text-xs text-body">{c.consultantCount} consulenti</span>
                        </Link>
                      ))}
                      <Link
                        href="/categorie"
                        className="col-span-2 mt-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-institutional hover:bg-navy-50"
                      >
                        Vedi tutte le categorie →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Accedi
          </ButtonLink>
          <ButtonLink href="/registrati" variant="primary" size="sm">
            Registrati
          </ButtonLink>
        </div>

        <button
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white px-4 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col" aria-label="Navigazione mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-navy-800 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-navy-100 pt-4">
            <ButtonLink href="/login" variant="outline" fullWidth>
              Accedi
            </ButtonLink>
            <ButtonLink href="/registrati" variant="primary" fullWidth>
              Registrati
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
