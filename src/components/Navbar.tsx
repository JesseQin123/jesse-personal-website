import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation } from "@/data/site-navigation";
import logo from "@/assets/jq_logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Jesse Qin home">
            <img src={logo} alt="Jesse Qin logo" className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold tracking-tight">Jesse Qin</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {primaryNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex">
            <Button variant="hero" size="default" asChild>
              <a href="mailto:jesseqin.office@gmail.com">
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {primaryNavigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 px-4">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href="mailto:jesseqin.office@gmail.com">
                    Start a conversation <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
