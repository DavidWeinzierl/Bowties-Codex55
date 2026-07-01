"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  ["About", "#about"],
  ["Setups", "#setups"],
  ["Media", "#media"],
  ["Dates", "#dates"],
  ["Contact", "#contact"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid || open ? "bg-ink/95 shadow-2xl shadow-black/10 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <Link href="/" className="relative z-[70] font-display text-2xl tracking-[-.03em] text-cream">
          The Bowties<span className="text-coral">.</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={pathname === "/" ? href : `/${href}`} className="nav-link text-xs font-semibold uppercase tracking-[.16em] text-cream/75 transition hover:text-cream">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href={pathname === "/" ? "#contact" : "/#contact"} className="min-h-10 px-5 py-2">
            Book us
          </ButtonLink>
        </div>

        <button
          type="button"
          className="relative z-[70] grid size-11 place-items-center rounded-full border border-white/20 text-cream lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      </header>

      <div className={`fixed inset-0 z-40 grid bg-ink px-7 pt-28 transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="flex flex-col items-start gap-3">
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={pathname === "/" ? href : `/${href}`}
              onClick={() => setOpen(false)}
              className="font-display text-[clamp(2.75rem,13vw,5rem)] leading-none text-cream transition hover:text-coral"
              style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="self-end border-t border-white/10 py-8 text-xs uppercase tracking-[.18em] text-cream/50">
          Austria · Available across Europe
        </div>
      </div>
    </>
  );
}
