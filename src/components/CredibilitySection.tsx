import { recruiterFacts } from "@/data/recruiter-profile";
import enterpriseDeploymentIcon from "@/assets/brand/icons/inverse/enterprise-deployment.png";
import curatedToolboxIcon from "@/assets/brand/icons/inverse/curated-toolbox.png";
import ontologyModelIcon from "@/assets/brand/icons/inverse/ontology-semantic-model.png";
import researchToProductIcon from "@/assets/brand/icons/inverse/research-to-product.png";

const signals = [
  {
    iconSrc: enterpriseDeploymentIcon,
    label: "Current role",
    value: `${recruiterFacts.currentRole.title} at ${recruiterFacts.currentRole.organization}`,
    detail: `${recruiterFacts.currentRole.period} · ${recruiterFacts.currentRole.summary}`,
  },
  {
    iconSrc: curatedToolboxIcon,
    label: "Open-source proof",
    value: `${recruiterFacts.toolbox.repositoryCount} repositories organized across ${recruiterFacts.toolbox.categoryCount} categories`,
    detail: `Solo Unicorn Toolbox · ${recruiterFacts.toolbox.summary.toLowerCase()} · verified ${recruiterFacts.toolbox.verificationDate}`,
  },
  {
    iconSrc: ontologyModelIcon,
    label: "Education",
    value: `${recruiterFacts.education.phd.organization} PhD · ${recruiterFacts.education.masters.organization} MSBAi`,
    detail: `${recruiterFacts.education.phd.period} · ${recruiterFacts.education.masters.period}`,
  },
  {
    iconSrc: researchToProductIcon,
    label: "Public speaking",
    value: `Presented at ${recruiterFacts.conference.title}`,
    detail: `${recruiterFacts.conference.date} · ${recruiterFacts.conference.location}`,
  },
];

const CredibilitySection = () => (
  <section aria-labelledby="proof-heading" className="bg-foreground py-12 text-background lg:py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <p id="proof-heading" className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
          Proof at a glance
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-background/15" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <article key={signal.label} className="border-l border-background/15 pl-5">
            <img
              src={signal.iconSrc}
              alt=""
              aria-hidden="true"
              className="mb-5 h-7 w-7 object-contain"
            />
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-background/50">
              {signal.label}
            </p>
            <p className="leading-relaxed text-background/90">{signal.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-background/55">{signal.detail}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CredibilitySection;
