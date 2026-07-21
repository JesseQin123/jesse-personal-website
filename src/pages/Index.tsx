import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import PublicProofSection from "@/components/PublicProofSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <a
      href="#main-content"
      className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background focus:not-sr-only"
    >
      Skip to main content
    </a>
    <Navbar />
    <main id="main-content">
      <HeroSection />
      <CredibilitySection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <PublicProofSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
