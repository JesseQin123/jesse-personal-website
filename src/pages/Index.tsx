import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedInSection from "@/components/FeaturedInSection";
import AboutSection from "@/components/AboutSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CredibilitySection from "@/components/CredibilitySection";
import ServicesSection from "@/components/ServicesSection";
import InsightsSection from "@/components/InsightsSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedInSection />
        <AboutSection />
        <CaseStudiesSection />
        <CredibilitySection />
        <ServicesSection />
        <InsightsSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
