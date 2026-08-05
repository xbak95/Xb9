"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  defaultTab,
  className,
}: {
  tabs: { id: string; label: string; content: React.ReactNode; badge?: number }[];
  defaultTab?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-navy-100 pb-px">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
              active === t.id ? "text-navy" : "text-body hover:text-navy-700"
            )}
          >
            {t.label}
            {typeof t.badge === "number" && t.badge > 0 && (
              <span className="rounded-full bg-navy-50 px-1.5 py-0.5 text-[11px] font-semibold text-navy">{t.badge}</span>
            )}
            {active === t.id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />}
          </button>
        ))}
      </div>
      <div className="pt-6">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
