"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#verifichiamo", label: "Servizi" },
  { href: "#come-lavoriamo", label: "Come lavoriamo" },
  { href: "#per-chi", label: "Per chi" },
  { href: "#faq", label: "FAQ" },
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
      <div className="container-x flex h-28 items-center justify-between">
        <Link href="#home" className="flex items-center" aria-label="Casa in Chiaro - Home">
          <Image
            src="/logo-compact.png"
            alt="Casa in Chiaro"
            width={336}
            height={88}
            priority
            className="h-20 w-auto sm:h-[88px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[14.5px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="hidden items-center gap-2 whitespace-nowrap border-r border-ink/10 pr-5 text-right text-xs leading-tight text-ink/55 xl:flex">
            <User className="size-4 shrink-0 text-brand-red" />
            <span>
              Ingegnere
              <br />
              libero professionista
            </span>
          </div>
          <Button asChild size="sm">
            <a href="#contatti">Richiedi una verifica</a>
          </Button>
        </div>

        <button
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink/75 transition-colors hover:bg-cream hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full" onClick={() => setOpen(false)}>
                <a href="#contatti">Richiedi una verifica</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
