"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/lib/types";

export function Accordion({ items, className }: { items: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-card", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${item.question.length}-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy hover:bg-navy-50/50 sm:px-6 sm:py-5"
              >
                {item.question}
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-body transition-transform duration-200", isOpen && "rotate-180 text-navy")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className="px-5 pb-5 text-sm text-body sm:px-6"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
