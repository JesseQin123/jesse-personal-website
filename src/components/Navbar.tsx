import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Products", hasDropdown: true },
    { label: "Enterprise", hasDropdown: true },
    { label: "Research", hasDropdown: false },
    { label: "Developers", hasDropdown: true },
    { label: "Company", hasDropdown: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <path d="M8 8L16 4L24 8V16L16 20L8 16V8Z" fill="currentColor"/>
              <path d="M8 16L16 20L24 16V24L16 28L8 24V16Z" fill="currentColor" fillOpacity="0.6"/>
            </svg>
            <span className="font-bold text-xl tracking-tight">VideoAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
              EN <ChevronDown className="w-4 h-4" />
            </button>
            <Button variant="hero" size="default">
              Playground <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button variant="heroOutline" size="default">
              Talk to Sales <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="hero" size="lg" className="w-full">
                  Playground <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button variant="heroOutline" size="lg" className="w-full">
                  Talk to Sales <ArrowUpRight className="w-4 h-4" />
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
