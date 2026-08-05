import { cn } from "@/lib/utils";

export function Card({
  className,
  hover = false,
  as: As = "div",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean; as?: any }) {
  return (
    <As
      className={cn(
        "rounded-2xl border border-navy-100 bg-white shadow-card transition-shadow duration-200",
        hover && "hover:-translate-y-0.5 hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 sm:p-6", className)} {...props} />;
}
