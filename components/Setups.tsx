import { Drum, MicVocal, PartyPopper } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const setups = [
  {
    number: "01",
    title: "Acoustic Trio",
    lineup: "Cajon · Acoustic Guitar · Bass",
    copy: "Warm, close and beautifully understated. Perfect for ceremonies, intimate settings and effortless background atmosphere.",
    icon: MicVocal,
    featured: false,
  },
  {
    number: "02",
    title: "The Full 5-Piece",
    lineup: "Drums · Guitar · Bass · Keys · Vocals",
    copy: "The complete Bowties experience — a dynamic live show built to turn your celebration into one packed dance floor.",
    icon: Drum,
    featured: true,
  },
  {
    number: "03",
    title: "The 6-Piece Gala",
    lineup: "Full 5-Piece · Saxophone",
    copy: "Our most elevated lineup. A bold, premium sound designed for large rooms, black-tie nights and standout occasions.",
    icon: PartyPopper,
    featured: false,
  },
] as const;

export function Setups() {
  return (
    <section id="setups" className="section-shell bg-[#e9e4da]">
      <Reveal>
        <SectionHeading
          eyebrow="Book your lineup"
          title="One band. Three ways to make the room yours."
          text="From the quiet first note of a ceremony to the final song of the night, choose the setup that fits your moment."
        />
      </Reveal>

      <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
        {setups.map(({ number, title, lineup, copy, icon: Icon, featured }, index) => (
          <Reveal key={title} delay={index * 0.1} className="h-full">
            <article className={`group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[2rem] border p-7 transition-all duration-500 hover:-translate-y-2 sm:p-10 ${featured ? "border-ink bg-ink text-cream shadow-2xl shadow-ink/15" : "border-ink/10 bg-cream text-ink"}`}>
              {featured ? <span className="absolute right-6 top-6 rounded-full bg-coral px-4 py-2 text-[.6rem] font-bold uppercase tracking-[.18em] text-white">Most booked</span> : null}
              <span className={`text-xs tracking-[.2em] ${featured ? "text-gold" : "text-coral"}`}>{number}</span>
              <Icon size={42} strokeWidth={1.2} className={`mt-12 ${featured ? "text-gold" : "text-coral"}`} />
              <div className="mt-auto pt-16">
                <h3 className="font-display text-4xl leading-none sm:text-5xl">{title}</h3>
                <p className={`mt-5 text-[.65rem] font-bold uppercase tracking-[.16em] ${featured ? "text-gold" : "text-coral"}`}>{lineup}</p>
                <p className={`mt-5 text-sm leading-7 ${featured ? "text-cream/60" : "text-muted"}`}>{copy}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <ButtonLink href="#contact" variant="outline">Find your setup</ButtonLink>
      </Reveal>
    </section>
  );
}
