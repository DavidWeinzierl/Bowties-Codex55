"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const reviews = [
  { quote: "From the first dance to the final encore, the dance floor never emptied. They understood our crowd instantly.", by: "Anna & Lukas", type: "Wedding · Salzburg" },
  { quote: "Effortless to work with, exceptional on stage. The Bowties turned our company gala into the event everyone still talks about.", by: "Corporate client", type: "Annual gala · Vienna" },
  { quote: "The acoustic ceremony was beautiful, then the full band completely changed gear. It felt like two perfect bands in one day.", by: "Sophie & Max", type: "Wedding · Styria" },
  { quote: "Polished, warm and wildly energetic. Every generation was on the dance floor together.", by: "Marie & Daniel", type: "Wedding · Lake Wörthersee" },
] as const;

const crops = ["20% center", "38% center", "52% center", "65% center", "78% center", "92% center"];

export function Social() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const review = reviews[active];

  return (
    <section className="section-shell overflow-hidden bg-cream">
      <div className="page-grid items-end">
        <Reveal className="lg:col-span-8"><SectionHeading eyebrow="Words from the dance floor" title="They said it best." /></Reveal>
        <Reveal delay={0.12} className="lg:col-span-3 lg:col-start-10"><p className="text-sm leading-7 text-muted">Real nights. Real people. Very tired feet the morning after.</p></Reveal>
      </div>

      <Reveal className="mt-14 lg:mt-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-coral px-7 py-14 text-white sm:px-12 lg:px-20 lg:py-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Quote className="absolute right-8 top-8 text-white/15" size={90} strokeWidth={1} />
          <blockquote className="relative max-w-5xl">
            <p className="font-display text-[clamp(2.3rem,5.5vw,5.6rem)] leading-[1.02] tracking-[-.03em]">“{review.quote}”</p>
            <footer className="mt-10 flex flex-col gap-1 text-xs uppercase tracking-[.16em]"><strong>{review.by}</strong><span className="text-white/55">{review.type}</span></footer>
          </blockquote>
          <div className="mt-10 flex gap-2">
            {reviews.map((item, index) => <button type="button" key={item.by} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-white" : "w-4 bg-white/30"}`} aria-label={`Show review ${index + 1}`} />)}
          </div>
        </div>
      </Reveal>

      <div className="mt-20 flex items-end justify-between gap-8">
        <Reveal><p className="eyebrow text-coral">Backstage & beyond</p><h3 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Follow the noise.</h3></Reveal>
        <Reveal delay={0.1}><ButtonLink href="https://instagram.com" target="_blank" rel="noreferrer" variant="outline" className="hidden sm:inline-flex"><Camera size={15} /> Instagram</ButtonLink></Reveal>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {crops.map((position, index) => (
          <Reveal key={position} delay={index * 0.05} className="group relative aspect-square overflow-hidden rounded-xl bg-ink">
            <Image src="/images/bowties-hero.jpg" alt={`The Bowties live moment ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="scale-[1.55] object-cover transition duration-700 group-hover:scale-[1.68] group-hover:opacity-75" style={{ objectPosition: position }} />
            <span className="absolute inset-0 grid place-items-center bg-coral/0 text-white opacity-0 transition group-hover:bg-coral/20 group-hover:opacity-100"><Camera /></span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
