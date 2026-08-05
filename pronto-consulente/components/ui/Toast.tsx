"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "info" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
}

const ToastContext = createContext<{ push: (t: Omit<ToastItem, "id">) => void } | null>(null);

const kindStyles: Record<ToastKind, { icon: React.ReactNode; ring: string }> = {
  success: { icon: <CheckCircle2 className="h-5 w-5 text-verified" />, ring: "border-verified-50" },
  info: { icon: <Info className="h-5 w-5 text-institutional" />, ring: "border-navy-100" },
  error: { icon: <AlertTriangle className="h-5 w-5 text-red-600" />, ring: "border-red-100" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-xl border bg-white p-4 shadow-premium",
              kindStyles[t.kind].ring
            )}
          >
            {kindStyles[t.kind].icon}
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{t.title}</p>
              {t.description && <p className="mt-0.5 text-xs text-body">{t.description}</p>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              aria-label="Chiudi notifica"
              className="text-body hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve essere usato dentro <ToastProvider>");
  return ctx;
}
