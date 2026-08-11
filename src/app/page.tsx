import { Navigation } from "@/components/ui/Navigation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { MembersSection } from "@/components/sections/Members";
import { GuestbookSection } from "@/components/sections/Guestbook";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <SectionReveal>
        <AboutSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <MembersSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <GuestbookSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ContactSection />
      </SectionReveal>
      <Footer />
      <BackToTop />
    </main>
  );
}
