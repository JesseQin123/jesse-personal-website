import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MainHero from "@/components/MainHero";
import ExpandViewSection from "@/components/ExpandViewSection";
import TrustedBy from "@/components/TrustedBy";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <MainHero />
        <ExpandViewSection />
        <TrustedBy />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
