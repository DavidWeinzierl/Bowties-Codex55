import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary:
    "bg-coral text-white hover:bg-[#a43e31] shadow-[0_14px_34px_rgba(191,73,56,.24)]",
  light: "bg-cream text-ink hover:bg-white",
  outline: "border border-current bg-transparent hover:bg-ink hover:text-cream",
} as const;

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-[.72rem] font-bold uppercase tracking-[.2em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral";

type Variant = keyof typeof styles;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
