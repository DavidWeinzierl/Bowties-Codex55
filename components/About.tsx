import { Building2, Disc3, Heart, Mic2, Music2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const genres = [
  { icon: Disc3, title: "60s Rock 'n' Roll", number: "01" },
  { icon: Sparkles, title: "80s Dance & Disco", number: "02" },
  { icon: Mic2, title: "Modern Hits", number: "03" },
  { icon: Music2, title: "Austropop", number: "04" },
] as const;

const events = ["Weddings", "Birthdays", "Company celebrations", "Galas", "Proms"];

export function About() {
  return (
    <section id="about" className="section-shell overflow-hidden bg-cream">
      <div className="page-grid">
        <Reveal className="lg:col-span-7">
          <SectionHeading
            eyebrow="Your night, turned all the way up"
            title="A full dance floor is the only plan."
            text="Based in Austria and built for big moments, The Bowties pair musical precision with the kind of live energy that pulls every generation into the room."
          />
        </Reveal>
        <Reveal delay={0.15} className="flex items-end lg:col-span-4 lg:col-start-9">
          <p className="border-l border-coral/40 pl-6 text-base leading-7 text-muted">
            Five musicians. One instinct: read the room, catch the moment, and keep it moving until nobody wants the night to end.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid overflow-hidden rounded-[2rem] border border-ink/10 bg-white sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {genres.map(({ icon: Icon, title, number }, index) => (
          <Reveal key={title} delay={index * 0.07} className="h-full">
            <div className="group flex min-h-60 h-full flex-col justify-between border-b border-r border-ink/10 p-7 transition-colors duration-500 hover:bg-ink sm:p-9">
              <div className="flex items-center justify-between">
                <Icon size={21} className="text-coral transition-colors group-hover:text-gold" />
                <span className="text-xs tracking-[.18em] text-ink/30 group-hover:text-cream/30">{number}</span>
              </div>
              <h3 className="max-w-[10rem] font-display text-3xl leading-none text-ink transition-colors group-hover:text-cream">{title}</h3>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-ink/10 py-7">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-coral"><Heart size={15} /> Made for</span>
        {events.map((event) => <span key={event} className="text-sm font-semibold text-ink/70">{event}</span>)}
        <Building2 size={17} className="ml-auto hidden text-ink/30 sm:block" />
      </Reveal>
    </section>
  );
}
