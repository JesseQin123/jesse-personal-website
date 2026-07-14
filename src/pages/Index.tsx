import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import IdeasSection from "@/components/IdeasSection";
import JourneySection from "@/components/JourneySection";
import TalksSection from "@/components/TalksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <HeroSection />
      <CredibilitySection />
      <SelectedWorkSection />
      <IdeasSection />
      <JourneySection />
      <TalksSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
