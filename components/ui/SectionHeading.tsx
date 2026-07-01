export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`eyebrow ${light ? "text-gold" : "text-coral"}`}>{eyebrow}</p>
      <h2 className={`mt-5 font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl ${light ? "text-cream" : "text-ink"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-6 max-w-2xl text-lg leading-8 ${light ? "text-cream/65" : "text-muted"}`}>{text}</p> : null}
    </div>
  );
}
