import { ArrowRight } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="gradient-bar py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm text-foreground">
        <span className="font-medium">🚀 Introducing Nova 3:</span>
        <span className="hidden sm:inline">Our most advanced video foundation model yet. Built for enterprise scale.</span>
        <a href="#" className="font-semibold underline underline-offset-2 hover:no-underline flex items-center gap-1">
          Read more <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
