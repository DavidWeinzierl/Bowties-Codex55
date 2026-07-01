import { NextResponse } from "next/server";
import { fetchPublicGigs } from "@/lib/calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const feedUrl = process.env.ICAL_FEED_URL;
  if (!feedUrl) return NextResponse.json({ gigs: [] });

  try {
    const gigs = await fetchPublicGigs(feedUrl);
    return NextResponse.json({ gigs }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } });
  } catch (error) {
    console.error("Calendar fetch failed", error);
    return NextResponse.json({ error: "Calendar unavailable" }, { status: 502 });
  }
}
