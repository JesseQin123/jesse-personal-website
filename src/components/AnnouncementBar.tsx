import { ArrowRight } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="gradient-bar py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm text-foreground">
        <span className="font-medium">📅 Limited Availability:</span>
        <span className="hidden sm:inline">Currently accepting 2 new consulting engagements for Q1 2025.</span>
        <a href="#contact" className="font-semibold underline underline-offset-2 hover:no-underline flex items-center gap-1">
          Book a call <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
