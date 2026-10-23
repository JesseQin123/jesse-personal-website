import LanyardHero from "@/features/lanyard-hero/LanyardHero";
import HomeClosing from "@/features/lanyard-hero/HomeClosing";
import AiNativeStory from "@/features/lanyard-hero/AiNativeStory";
import VoicesWall from "@/features/lanyard-hero/VoicesWall";

const Index = () => (
  <div className="min-h-screen bg-white">
    <main id="main-content">
      <LanyardHero />
      <AiNativeStory />
      <VoicesWall />
      <HomeClosing />
    </main>
  </div>
);

export default Index;
