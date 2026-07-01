import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy"><p>This website processes enquiry data only to answer booking requests. Production analytics, cookie, hosting and retention details must be added here once the final service providers are selected.</p><p>For data requests, contact <a className="text-coral underline" href="mailto:booking@thebowties.at">booking@thebowties.at</a>.</p></LegalPage>;
}
