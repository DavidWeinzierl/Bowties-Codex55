import ical, { type CalendarComponent } from "node-ical";

export type PublicGig = {
  id: string;
  title: string;
  location: string;
  start: string;
};

function textValue(value: unknown, fallback = "") {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "val" in value && typeof value.val === "string") return value.val;
  return fallback;
}

export async function fetchPublicGigs(feedUrl: string): Promise<PublicGig[]> {
  const response = await fetch(feedUrl, { next: { revalidate: 900 } });
  if (!response.ok) throw new Error(`Calendar request failed: ${response.status}`);

  const parsed = ical.sync.parseICS(await response.text());
  const now = new Date();

  return Object.values(parsed)
    .filter((entry): entry is CalendarComponent & { type: "VEVENT"; start: Date } => {
      if (!entry || entry.type !== "VEVENT" || !(entry.start instanceof Date)) return false;
      const hidden = textValue(entry.summary).toLowerCase().includes("private");
      return entry.start >= now && !hidden;
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 8)
    .map((entry, index) => ({
      id: textValue(entry.uid, `${entry.start.toISOString()}-${index}`),
      title: textValue(entry.summary, "Live with The Bowties"),
      location: textValue(entry.location, "Austria"),
      start: entry.start.toISOString(),
    }));
}

export function formatGigDate(value: string) {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date),
    year: new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(date),
  };
}
