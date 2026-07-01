"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, ChevronDown, Mail, Music2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contactSchema, eventTypes, type ContactFormData } from "@/lib/contact-schema";

const faqs = [
  { question: "Do you bring your own PA and lighting?", answer: "Yes. We can provide a professional sound and lighting package sized to your venue and guest count. We coordinate all technical details directly with the location." },
  { question: "How long do you play?", answer: "A typical evening includes up to three live sets, planned around dinner, speeches and your preferred finish time. We tailor the exact schedule to the flow of your event." },
  { question: "How far do you travel?", answer: "We are based in Austria and regularly travel throughout the country and neighbouring European regions. Tell us where the party is — we will work out the rest." },
  { question: "Can we choose songs?", answer: "Absolutely. We shape the set around your guests and welcome favourites from our repertoire. Special requests can often be arranged with enough lead time." },
] as const;

const inputClass = "mt-2 min-h-13 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral focus:ring-4 focus:ring-coral/10";

export function FooterContact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [serverState, setServerState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactFormData) {
    setServerState("sending");
    try {
      const emailTo = "booking@thebowties.at";
      const subject = `Booking Enquiry: ${data.eventType} · ${data.eventDate}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nDate: ${data.eventDate}\nEvent: ${data.eventType}\n\nMessage:\n${data.message}`;

      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      // Provide a brief delay for a premium loading state feel before success
      await new Promise((resolve) => setTimeout(resolve, 800));

      setServerState("success");
      reset();
    } catch {
      setServerState("error");
    }
  }

  return (
    <>
      <section id="contact" className="section-shell bg-[#e9e4da]">
        <div className="page-grid gap-y-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-coral">Good to know</p>
            <h2 className="mt-5 font-display text-5xl leading-[.95] text-ink sm:text-6xl">Before you ask.</h2>
            <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left font-semibold text-ink" aria-expanded={open}>
                      {faq.question}<ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                    <div aria-hidden={!open} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden"><p className="pb-6 pr-8 text-sm leading-7 text-muted">{faq.answer}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[2rem] bg-cream p-6 shadow-2xl shadow-ink/10 sm:p-10 lg:p-12">
              <p className="eyebrow text-coral">Quick enquiry</p>
              <h3 className="mt-4 font-display text-4xl leading-none text-ink sm:text-5xl">Tell us about the date.</h3>
              <form className="mt-9 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Field label="Your name" error={errors.name?.message}>
                  <input {...register("name")} className={inputClass} autoComplete="name" placeholder="Name" />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input {...register("email")} className={inputClass} type="email" autoComplete="email" placeholder="you@example.com" />
                </Field>
                <Field label="Event date" error={errors.eventDate?.message}>
                  <input {...register("eventDate")} className={inputClass} type="date" min={new Date().toISOString().slice(0, 10)} />
                </Field>
                <Field label="Event type" error={errors.eventType?.message}>
                  <select {...register("eventType")} className={inputClass} defaultValue="">
                    <option value="" disabled>Select one</option>
                    {eventTypes.map((type) => <option value={type} key={type}>{type}</option>)}
                  </select>
                </Field>
                <Field label="Your message" error={errors.message?.message} className="sm:col-span-2">
                  <textarea {...register("message")} className={`${inputClass} min-h-36 resize-y`} placeholder="Venue, guest count, ideas — give us the picture." />
                </Field>
                <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" disabled={serverState === "sending"} className="w-full sm:w-auto">{serverState === "sending" ? "Sending…" : "Send enquiry"}</Button>
                  <p className={`text-xs ${serverState === "error" ? "text-red-700" : "text-muted"}`} role="status">
                    {serverState === "success" ? "Received. We’ll be in touch shortly." : serverState === "error" ? "Message failed. Email us directly." : "Usually replies within 48 hours."}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-8 pt-24 text-cream sm:px-8 lg:px-12 lg:pt-32">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-12 border-b border-cream/10 pb-20 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-gold">Your date starts here</p>
              <a href="mailto:booking@thebowties.at" className="mt-5 block max-w-6xl font-display text-[clamp(3.6rem,9vw,9rem)] leading-[.85] tracking-[-.055em] transition-colors hover:text-coral">Let’s make<br />it a night.</a>
            </div>
            <div className="flex gap-3">
              <a href="mailto:booking@thebowties.at" className="grid size-12 place-items-center rounded-full border border-cream/15 transition hover:border-coral hover:bg-coral" aria-label="Email The Bowties"><Mail size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-full border border-cream/15 transition hover:border-coral hover:bg-coral" aria-label="The Bowties on Instagram"><Camera size={18} /></a>
              <a href="/repertoire" className="grid size-12 place-items-center rounded-full border border-cream/15 transition hover:border-coral hover:bg-coral" aria-label="View repertoire"><Music2 size={18} /></a>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 pt-8 text-[.65rem] uppercase tracking-[.16em] text-cream/35 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} The Bowties</p>
            <div className="flex gap-6 sm:ml-auto"><Link href="/impressum" className="hover:text-cream">Impressum</Link><Link href="/privacy" className="hover:text-cream">Privacy</Link></div>
          </div>
        </div>
      </footer>
    </>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block text-xs font-bold uppercase tracking-[.12em] text-ink/70 ${className}`}>
      {label}
      {children}
      {error ? <span className="mt-1.5 block normal-case tracking-normal text-red-700">{error}</span> : null}
    </label>
  );
}
