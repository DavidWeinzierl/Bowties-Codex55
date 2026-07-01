"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink" aria-labelledby="hero-title">
      <Image
        src={`${basePath}/images/bowties-hero.jpg`}
        alt="The Bowties performing live on an atmospheric event stage"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <video
        className="absolute inset-0 hidden size-full object-cover object-[68%_center] motion-reduce:hidden sm:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${basePath}/images/bowties-hero.jpg`}
        aria-hidden="true"
      >
        <source src={`${basePath}/media/bowties-hero-loop.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,18,.94)_0%,rgba(12,18,18,.7)_38%,rgba(12,18,18,.16)_75%),linear-gradient(0deg,rgba(12,18,18,.68)_0%,transparent_48%)]" />
      <div className="absolute inset-0 opacity-[.08] noise" />

      <div className="relative mx-auto w-full max-w-[92rem] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="eyebrow text-gold"
        >
          Live music · Made in Austria
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-5xl font-display text-[clamp(5rem,15vw,12rem)] leading-[.72] tracking-[-.065em] text-cream"
        >
          The<br />Bowties<span className="text-coral">.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="max-w-md text-lg leading-7 text-cream/80 sm:text-xl">
              The soundtrack to your unforgettable event.
            </p>
            <ButtonLink href="#contact" className="mt-7">Check availability</ButtonLink>
          </div>
          <a href="#about" className="hidden items-center gap-4 text-xs font-bold uppercase tracking-[.18em] text-cream/60 transition hover:text-cream sm:flex">
            Scroll to feel it <ArrowDownRight size={18} />
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-[8%] hidden h-36 w-px bg-gradient-to-b from-transparent via-gold/50 to-gold lg:block" />
    </section>
  );
}
