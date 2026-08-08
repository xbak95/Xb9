"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, User, X } from "lucide-react";

import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#verifichiamo", label: "Cosa verifichiamo" },
  { href: "#per-chi", label: "Per chi" },
  { href: "#come-lavoriamo", label: "Come lavoriamo" },
  { href: "#contatti", label: "Contatti" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(23,19,16,0.06)]"
          : "bg-white/0"
      )}
    >
      <div className="container-x flex h-28 items-center gap-8">
        <Link href="#home" className="flex shrink-0 items-center" aria-label="Casa in Chiaro - Home">
          <Image
            src="/logo-compact.png"
            alt="Casa in Chiaro"
            width={336}
            height={88}
            priority
            className="h-20 w-auto shrink-0 sm:h-[88px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative whitespace-nowrap pb-1 text-[13px] font-bold tracking-wide uppercase transition-colors",
                i === 0
                  ? "text-brand-red after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-red"
                  : "text-ink hover:text-brand-red"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 whitespace-nowrap border-l border-ink/15 pl-5 lg:flex">
          <User className="size-5 shrink-0 text-brand-red" />
          <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-ink">
            Ingegnere
            <br />
            libero professionista
          </span>
        </div>

        <button
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink/8 bg-white lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-[15px] font-bold uppercase tracking-wide transition-colors",
                    i === 0 ? "text-brand-red" : "text-ink/75 hover:bg-cream hover:text-ink"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-ink/8 px-3 pt-4 text-xs font-bold uppercase tracking-wide text-ink">
                <User className="size-4 shrink-0 text-brand-red" />
                Ingegnere libero professionista
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
