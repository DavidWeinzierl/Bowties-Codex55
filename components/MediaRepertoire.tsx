"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const songs = [
  ["I Wanna Dance with Somebody", "Whitney Houston"],
  ["Johnny B. Goode", "Chuck Berry"],
  ["As It Was", "Harry Styles"],
  ["Fürstenfeld", "STS"],
  ["Don't Start Now", "Dua Lipa"],
  ["Walking on Sunshine", "Katrina and the Waves"],
] as const;

export function MediaRepertoire() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <section id="media" className="section-shell bg-cream">
      <Reveal>
        <SectionHeading eyebrow="See. Hear. Believe." title="A glimpse of the night ahead." />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.65fr_.75fr] lg:gap-16">
        <Reveal className="relative aspect-video overflow-hidden rounded-[2rem] bg-ink shadow-2xl shadow-ink/10">
          <video
            ref={videoRef}
            className="size-full object-cover"
            poster="/images/bowties-hero.jpg"
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="The Bowties showreel placeholder"
          >
            <source src="/media/bowties-hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <button
            type="button"
            onClick={toggleVideo}
            className="absolute bottom-6 left-6 flex items-center gap-4 text-left text-cream sm:bottom-8 sm:left-8"
            aria-label={playing ? "Pause showreel" : "Play showreel"}
          >
            <span className="grid size-14 place-items-center rounded-full bg-coral shadow-lg transition-transform hover:scale-105 sm:size-16">{playing ? <Pause fill="currentColor" size={18} /> : <Play fill="currentColor" size={18} className="ml-1" />}</span>
            <span><span className="block text-xs font-bold uppercase tracking-[.18em]">Main showreel</span><span className="mt-1 block text-xs text-cream/55">A taste of The Bowties live</span></span>
          </button>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col justify-between">
          <div>
            <p className="eyebrow text-coral">From our setlist</p>
            <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {songs.map(([title, artist], index) => (
                <div key={title} className="group grid grid-cols-[2rem_1fr] gap-3 py-4">
                  <span className="text-xs text-ink/30">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-semibold text-ink">{title}<span className="mt-1 block text-xs font-normal text-muted">{artist}</span></p>
                </div>
              ))}
            </div>
          </div>
          <ButtonLink href="/repertoire" variant="outline" className="mt-8 self-start">View full repertoire</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
