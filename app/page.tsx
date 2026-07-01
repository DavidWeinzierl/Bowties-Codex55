import { About } from "@/components/About";
import { FooterContact } from "@/components/FooterContact";
import { GigsCalendar } from "@/components/GigsCalendar";
import { Hero } from "@/components/Hero";
import { MediaRepertoire } from "@/components/MediaRepertoire";
import { Members } from "@/components/Members";
import { Navbar } from "@/components/Navbar";
import { Setups } from "@/components/Setups";
import { Social } from "@/components/Social";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Members />
      <Setups />
      <MediaRepertoire />
      <GigsCalendar />
      <Social />
      <FooterContact />
    </main>
  );
}
