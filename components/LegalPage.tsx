import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cream px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-coral"><ArrowLeft size={14} /> Home</Link>
        <h1 className="mt-16 font-display text-6xl text-ink sm:text-7xl">{title}</h1>
        <div className="mt-12 space-y-7 text-sm leading-7 text-muted">{children}</div>
      </div>
    </main>
  );
}
