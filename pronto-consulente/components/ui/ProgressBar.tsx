import { cn } from "@/lib/utils";

export function ProgressBar({ value, className, tone = "navy" }: { value: number; className?: string; tone?: "navy" | "gold" }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-navy-50", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", tone === "navy" ? "bg-navy" : "bg-gold")}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i < step ? "bg-gold" : i === step ? "bg-navy" : "bg-navy-100"
          )}
        />
      ))}
    </div>
  );
}
