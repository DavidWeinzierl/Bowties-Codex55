import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { members } from "@/lib/data";

export function Members() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="section-shell bg-ink text-cream">
      <div className="page-grid items-end">
        <Reveal className="lg:col-span-8">
          <SectionHeading eyebrow="Meet the band" title="Five people. One pulse." light />
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-3 lg:col-start-10">
          <p className="text-sm leading-7 text-cream/55">No backing-track theatre. Just real players, real chemistry, and a set shaped around your crowd.</p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-6 lg:mt-20 lg:grid-cols-10">
        {members.map((member, index) => (
          <Reveal
            key={member.name}
            delay={index * 0.08}
            className={`group relative min-h-[21rem] overflow-hidden rounded-[1.5rem] bg-cream/5 md:col-span-2 lg:min-h-[34rem] ${index === 3 ? "md:col-start-2 lg:col-start-auto" : ""} ${index === 4 ? "col-span-2 md:col-span-2" : "lg:col-span-2"}`}
          >
            <Image
              src={`${basePath}/images/bowties-hero.jpg`}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="scale-[1.9] object-cover saturate-[.75] transition duration-700 group-hover:scale-[2.02] group-hover:saturate-100"
              style={{ objectPosition: member.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 transition-transform duration-500 group-hover:translate-y-0 sm:p-7">
              <p className="font-display text-3xl">{member.name}</p>
              <p className="mt-2 text-[.64rem] font-bold uppercase tracking-[.16em] text-gold opacity-70 transition-opacity group-hover:opacity-100">{member.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
