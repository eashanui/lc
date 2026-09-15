import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.8rem] font-medium tracking-[0.18em] uppercase rounded-sm select-none";

type Variant = "gold" | "outline" | "outline-dark";

const variants: Record<Variant, string> = {
  gold: "btn-gold",
  outline: "btn-outline-gold",
  "outline-dark": "btn-outline-gold-dark",
};

export function ButtonLink({
  variant = "gold",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}

export function Button({
  variant = "gold",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], "disabled:opacity-70 disabled:cursor-not-allowed", className)} {...props} />;
}
