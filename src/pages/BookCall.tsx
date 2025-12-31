import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookCall = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Schedule a Discovery Call
            </h1>
            <p className="text-lg text-muted-foreground">
              Book a 15-minute call to discuss your AI challenges and explore how I can help.
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="max-w-4xl mx-auto">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/jesseqin-office/30min"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>

          {/* Back to Home Button */}
          <div className="max-w-4xl mx-auto text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookCall;
