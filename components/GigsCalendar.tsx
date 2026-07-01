"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import type { PublicGig } from "@/lib/calendar";

function formatGigDate(value: string) {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date),
    year: new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(date),
  };
}

export function GigsCalendar() {
  const [gigs, setGigs] = useState<PublicGig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/calendar", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Calendar unavailable");
        return response.json() as Promise<{ gigs: PublicGig[] }>;
      })
      .then((data) => setGigs(data.gigs))
      .catch((requestError: Error) => {
        if (requestError.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="dates" className="section-shell bg-ink text-cream">
      <div className="page-grid items-end">
        <Reveal className="lg:col-span-8">
          <SectionHeading eyebrow="Catch us live" title="Public dates." light />
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-10">
          <p className="text-sm leading-7 text-cream/55">Most of our calendar is private. These are the nights you can walk in and join the party.</p>
        </Reveal>
      </div>

      <Reveal className="mt-14 overflow-hidden rounded-[2rem] border border-cream/10 lg:mt-20">
        {loading ? (
          <div className="divide-y divide-cream/10">
            {[0, 1, 2].map((item) => <div key={item} className="grid grid-cols-[5rem_1fr] gap-6 p-6 sm:p-8"><span className="h-16 animate-pulse rounded-xl bg-white/5" /><span className="my-auto h-5 max-w-xl animate-pulse rounded-full bg-white/5" /></div>)}
          </div>
        ) : gigs.length ? (
          <div className="divide-y divide-cream/10">
            {gigs.map((gig) => {
              const date = formatGigDate(gig.start);
              return (
                <article key={gig.id} className="group grid gap-5 p-6 transition-colors hover:bg-white/[.035] sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-8">
                  <div className="flex items-end gap-2 sm:block">
                    <span className="font-display text-5xl leading-none text-gold">{date.day}</span>
                    <span className="text-[.62rem] font-bold uppercase tracking-[.16em] text-cream/45 sm:mt-2 sm:block">{date.month} {date.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl">{gig.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-cream/50"><MapPin size={13} />{gig.location}</p>
                  </div>
                  <ButtonLink href="#contact" variant="outline" className="self-start text-cream sm:self-auto">Enquire</ButtonLink>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 py-14 text-center">
            <CalendarDays size={34} strokeWidth={1.3} className="text-gold" />
            <h3 className="mt-7 font-display text-4xl">Private nights. Open dates.</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-cream/55">
              {error ? "Live dates are taking a quick intermission." : "We are currently busy playing private events. Contact us to secure your date."}
            </p>
            <ButtonLink href="#contact" className="mt-7">Check your date</ButtonLink>
          </div>
        )}
      </Reveal>
    </section>
  );
}
