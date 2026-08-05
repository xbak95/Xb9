"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 max-h-[90vh] w-full animate-fade-up overflow-y-auto rounded-t-2xl bg-white p-6 shadow-premium sm:rounded-2xl sm:p-7",
          sizes[size]
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-navy">
              {title}
            </h2>
            {description && <p className="mt-1 text-sm text-body">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="rounded-lg p-1.5 text-body hover:bg-muted hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">{footer}</div>}
      </div>
    </div>
  );
}
