import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { AnimatedWaveDivider } from "@/components/animations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        {/* Animated wave transition to dark section */}
        <div className="relative -mb-1">
          <AnimatedWaveDivider color="hsl(20, 10%, 10%)" className="h-16 md:h-24" />
        </div>
        <CredibilitySection />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
