import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-muted/60 px-6 py-14 text-center", className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-body">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
