import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red/40 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-red text-white shadow-[0_8px_24px_-8px_rgba(215,25,32,0.55)] hover:bg-brand-red-dark hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(215,25,32,0.6)] active:translate-y-0",
        secondary:
          "bg-white text-ink border border-ink/12 hover:border-ink/25 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        accent:
          "bg-brand-yellow text-ink shadow-[0_8px_24px_-8px_rgba(244,197,66,0.6)] hover:brightness-[1.03] hover:-translate-y-0.5",
        ghost: "text-ink hover:bg-ink/5",
        link: "text-brand-red underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
