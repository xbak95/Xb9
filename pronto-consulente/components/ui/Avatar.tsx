import Image from "next/image";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export function Avatar({
  src,
  name,
  size = 48,
  className,
  ring = false,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-100 text-navy-700 font-semibold",
        ring && "ring-2 ring-white shadow-sm",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}
