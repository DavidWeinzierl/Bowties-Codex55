import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return <LegalPage title="Impressum"><p>Legal operator details, registered address, company registration and responsible contact must be inserted here before publication.</p><p>Contact: <a className="text-coral underline" href="mailto:booking@thebowties.at">booking@thebowties.at</a></p></LegalPage>;
}
