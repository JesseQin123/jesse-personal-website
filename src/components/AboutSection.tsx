import { ArrowUpRight, MapPin } from "lucide-react";

const AboutSection = () => (
  <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16 lg:py-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark">About</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-brand-dark" /> New York City
          </div>
        </div>
        <div>
          <h2 id="about-heading" className="max-w-4xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            I build at the intersection of enterprise AI, machine-readable knowledge,
            and the way people and agents make decisions together.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            My path runs from distributed systems and knowledge discovery through ontology,
            enterprise AI infrastructure, context graphs, and agent workflows. Public research,
            open-source work, teaching, and founder communities remain part of the practice—but
            the through-line is shipping useful systems under real constraints.
          </p>
          <a
            href="https://jesse-qin.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-dark underline decoration-brand-dark/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Read Jesse&apos;s writing <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
