import { cn } from "@/lib/utils";

export function Label({ className, required, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-navy-800", className)} {...props}>
      {props.children}
      {required && <span className="ml-0.5 text-gold-600">*</span>}
    </label>
  );
}

export function Input({ className, invalid, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink placeholder:text-body/70",
        "focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100",
        invalid ? "border-red-400" : "border-navy-100",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, invalid, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-body/70",
        "focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100",
        invalid ? "border-red-400" : "border-navy-100",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full appearance-none rounded-xl border border-navy-100 bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235F6773%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat px-3.5 pr-9 text-sm text-ink",
        "focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Checkbox({ className, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2.5 text-sm text-ink", className)}>
      <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-navy-200 text-navy focus:ring-navy-200" {...props} />
      {label}
    </label>
  );
}

export function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-body">{children}</p>;
}

export function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-red-600">{children}</p>;
}
