import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  size = 14,
  showValue = false,
  reviewCount,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = clampFill(rating - i);
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star width={size} height={size} className="absolute inset-0 text-navy-100" fill="currentColor" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star width={size} height={size} className="text-gold-500" fill="currentColor" />
              </span>
            </span>
          );
        })}
      </span>
      {showValue && <span className="text-sm font-semibold text-ink">{rating.toFixed(1)}</span>}
      {typeof reviewCount === "number" && (
        <span className="text-sm text-body">({reviewCount} recensioni)</span>
      )}
    </span>
  );
}

function clampFill(v: number) {
  if (v >= 1) return 1;
  if (v <= 0) return 0;
  return v;
}
