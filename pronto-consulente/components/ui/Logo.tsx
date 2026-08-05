import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark" | "light";
  showTagline?: boolean;
  size?: number;
  className?: string;
  href?: string;
}

/** Monogramma "PC" con freccia/bussola oro, coerente con l'identità di brand fornita. */
export function LogoMark({ size = 44, light = false }: { size?: number; light?: boolean }) {
  const navy = light ? "#FFFFFF" : "#071A3D";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="10"
        y="46"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="42"
        fontWeight="700"
        fill={navy}
      >
        P
      </text>
      <text
        x="26"
        y="46"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="600"
        fill={navy}
        opacity="0.92"
      >
        C
      </text>
      <path d="M35 27 L47 21 L41 33 L38 30 Z" fill="#C89B4A" />
    </svg>
  );
}

export function Logo({ variant = "full", showTagline = false, size = 40, className, href = "/" }: LogoProps) {
  const light = variant === "light";
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} light={light} />
      {variant !== "mark" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading text-[1.05rem] font-bold tracking-tight sm:text-lg",
              light ? "text-white" : "text-navy"
            )}
          >
            Pronto <span className={light ? "text-gold-200" : "text-gold-600"}>Consulente</span>
          </span>
          {showTagline && (
            <span
              className={cn(
                "mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
                light ? "text-white/70" : "text-body"
              )}
            >
              La consulenza giusta. Subito.
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Pronto Consulente — torna alla home" className="shrink-0">
      {content}
    </Link>
  );
}
