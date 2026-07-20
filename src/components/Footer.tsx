import { ArrowUpRight } from "lucide-react";
import { primaryNavigation } from "@/data/site-navigation";
import logo from "@/assets/jq_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const resources = [
    { label: "Projects", href: "/projects" },
    { label: "AI Token Usage", href: "/ai-usage" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Teaching", href: "/teaching" },
  ];

  const publicWork = [
    { label: "Context Graph", href: "https://contextgraph.tech/" },
    { label: "Solo Unicorn Club", href: "https://www.solounicorn.club/" },
    { label: "Life in AGI", href: "https://www.lifeinagi.com/" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-md">
            <div className="mb-4 flex items-center gap-2">
              <img src={logo} alt="Jesse Qin logo" className="h-10 w-10 rounded-lg" />
              <span className="text-xl font-bold">Jesse Qin</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Staff-level AI systems builder working across enterprise infrastructure, ontology,
              context graphs, and agent workflows. Based in New York City.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            <FooterColumn title="Navigate" items={primaryNavigation.filter((item) => item.label !== "Contact")} />
            <FooterColumn title="Resources" items={resources} />
            <FooterColumn title="Public work" items={publicWork} external />
            <FooterColumn
              title="Connect"
              items={[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/jesseqin-phd/" },
                { label: "GitHub", href: "https://github.com/JesseQin123" },
                { label: "Email", href: "mailto:jesseqin.office@gmail.com" },
              ]}
              external
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground lg:flex-row">
          <p>© {currentYear} Jesse Qin. All rights reserved.</p>
          <p>AI systems · organizational context · human–AI collaboration</p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  items,
  external = false,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  external?: boolean;
}) => (
  <div>
    <h4 className="mb-4 font-semibold">{title}</h4>
    <ul className="space-y-3">
      {items.map((item) => {
        const opensExternally = external && item.href.startsWith("http");
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target={opensExternally ? "_blank" : undefined}
              rel={opensExternally ? "noopener noreferrer" : undefined}
              className="group flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
              {opensExternally && <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Footer;
