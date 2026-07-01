import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { repertoire } from "@/lib/data";

export const metadata: Metadata = {
  title: "Repertoire",
  description: "Explore The Bowties repertoire: 60s Rock 'n' Roll, 80s Dance & Disco, Modern Hits and Austropop.",
};

export default function RepertoirePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <header className="relative overflow-hidden bg-ink px-5 pb-20 pt-36 text-cream sm:px-8 lg:px-12 lg:pb-28 lg:pt-48">
        <div className="noise absolute inset-0 opacity-[.06]" />
        <div className="relative mx-auto max-w-[92rem]">
          <Reveal><Link href="/" className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.18em] text-cream/45 transition hover:text-cream"><ArrowLeft size={14} /> Back home</Link></Reveal>
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1fr_25rem]">
            <Reveal delay={0.06}>
              <p className="eyebrow text-gold">The songbook</p>
              <h1 className="mt-5 font-display text-[clamp(5rem,13vw,11rem)] leading-[.76] tracking-[-.055em]">Play it<br />again.</h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="max-w-md text-lg leading-8 text-cream/60">Four decades of dance-floor magnets, sing-along classics and homegrown favourites — shaped live around your crowd.</p>
              <ButtonLink href="/#contact" className="mt-7">Build your night</ButtonLink>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="overflow-hidden border-b border-ink/10 bg-coral py-4 text-white">
        <div className="flex min-w-max gap-8 text-[.65rem] font-bold uppercase tracking-[.2em]">
          {[...repertoire, ...repertoire].map((group, index) => <span key={`${group.genre}-${index}`} className="flex items-center gap-8">{group.genre}<span className="text-gold">✦</span></span>)}
        </div>
      </div>

      <section className="section-shell">
        <div className="space-y-24 lg:space-y-32">
          {repertoire.map((group, groupIndex) => (
            <Reveal key={group.genre}>
              <article className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
                <div>
                  <span className="text-xs tracking-[.18em] text-coral">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <p className="eyebrow mt-8 text-coral">{group.eyebrow}</p>
                  <h2 className="mt-4 max-w-md font-display text-5xl leading-[.92] sm:text-6xl">{group.genre}</h2>
                  <p className="mt-6 max-w-sm text-sm leading-7 text-muted">{group.description}</p>
                </div>
                <div className="divide-y divide-ink/10 border-y border-ink/10">
                  {group.songs.map(([song, artist], songIndex) => (
                    <div key={song} className="group grid grid-cols-[2.2rem_1fr] items-center gap-3 py-5 sm:grid-cols-[3rem_1fr_auto]">
                      <span className="text-xs text-ink/25">{String(songIndex + 1).padStart(2, "0")}</span>
                      <h3 className="font-display text-2xl transition group-hover:translate-x-1 group-hover:text-coral sm:text-3xl">{song}</h3>
                      <span className="col-start-2 text-xs text-muted sm:col-start-auto">{artist}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-coral px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <Reveal className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div><p className="eyebrow text-gold">Have a favourite?</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] sm:text-7xl">Tell us what needs to play.</h2></div>
          <ButtonLink href="/#contact" variant="light">Start an enquiry</ButtonLink>
        </Reveal>
      </section>

      <footer className="bg-ink px-5 py-8 text-cream sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between text-[.65rem] uppercase tracking-[.16em] text-cream/40"><span>© {new Date().getFullYear()} The Bowties</span><Link href="/" className="flex items-center gap-2 hover:text-cream">Home <ArrowUpRight size={13} /></Link></div>
      </footer>
    </main>
  );
}
