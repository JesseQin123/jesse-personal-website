import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Logo & Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">JQ</span>
              </div>
              <span className="font-bold text-xl">Dr. Jesse Qin</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI Strategy Advisor & Fractional CTO based in New York City. 
              Helping enterprises navigate the AI landscape with 12+ years of expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
              <ul className="space-y-3">
                {["About", "Case Studies", "Services", "Pricing", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-3">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Twitter/X", href: "https://twitter.com" },
                  { label: "Email", href: "mailto:jesse@example.com" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dr. Jesse Qin. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Based in New York City
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
