import { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-800 active:bg-navy-950 shadow-sm",
  secondary: "bg-institutional text-white hover:bg-navy-700 shadow-sm",
  outline: "border border-navy-200 text-navy bg-white hover:bg-navy-50",
  ghost: "text-navy hover:bg-navy-50",
  gold: "bg-gold text-navy-900 hover:bg-gold-600 shadow-sm font-semibold",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-[3.25rem] px-7 text-base rounded-xl gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

function classes(variant: Variant, size: Size, fullWidth: boolean | undefined, className?: string) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, fullWidth, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={classes(variant, size, fullWidth, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);
Button.displayName = "Button";

export function ButtonLink({ variant = "primary", size = "md", fullWidth, className, children, href, ...props }: LinkProps) {
  return (
    <Link href={href} className={classes(variant, size, fullWidth, className)} {...props}>
      {children}
    </Link>
  );
}
