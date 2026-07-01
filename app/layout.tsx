import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thebowties.at"),
  title: { default: "The Bowties | Austrian Wedding & Event Band", template: "%s | The Bowties" },
  description: "Premium live music for weddings, galas and events across Austria and Europe. The Bowties bring the soundtrack — you bring the night.",
  keywords: ["wedding band Austria", "event band Austria", "live band Vienna", "The Bowties"],
  openGraph: {
    title: "The Bowties — Live music for unforgettable events",
    description: "A premium Austrian wedding and event band built for full dance floors.",
    type: "website",
    locale: "en_AT",
    images: [{ url: "/images/bowties-hero.jpg", width: 1672, height: 941, alt: "The Bowties live" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#111918", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
