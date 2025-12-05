import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Products: ["Video Search", "Video Analysis", "Video Generation", "API"],
    Enterprise: ["Solutions", "Security", "Compliance", "Support"],
    Developers: ["Documentation", "API Reference", "SDKs", "Playground"],
    Company: ["About", "Blog", "Careers", "Contact"],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                <path d="M8 8L16 4L24 8V16L16 20L8 16V8Z" fill="currentColor"/>
                <path d="M8 16L16 20L24 16V24L16 28L8 24V16Z" fill="currentColor" fillOpacity="0.6"/>
              </svg>
              <span className="font-bold text-xl">VideoAI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              AI-powered video understanding at scale.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 VideoAI Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
