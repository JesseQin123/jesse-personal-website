import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { publicLinks } from "@/components/profile/public-profile";
import { recruiterFacts } from "@/data/recruiter-profile";
import { buildUsageModel } from "@/features/ai-usage/data";
import { useAiUsage } from "@/features/ai-usage/useAiUsage";

const formatTokens = (value: number) =>
  value >= 1e9 ? `${(value / 1e9).toFixed(1)}B` : value >= 1e6 ? `${Math.round(value / 1e6)}M` : value.toLocaleString();

function StoryLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group mt-6 inline-flex items-center gap-1.5 text-[16px] text-[#080808] underline decoration-[#8A8792]/50 underline-offset-[3px] transition-colors hover:decoration-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 text-[#FF6815] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function Chapter({ index, label, title, children }: { index: string; label: string; title: string; children: ReactNode }) {
  return (
    <li className="grid gap-4 border-b border-[#ECEAF0] py-12 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-10 sm:py-16">
      <p className="text-[15px] text-[#8A8792]">
        <span className="tabular-nums">{index}</span> · {label}
      </p>
      <div className="max-w-[44rem]">
        <h3 className="text-[32px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[44px]">{title}</h3>
        <div className="mt-5 text-[17px] leading-[1.6] text-[#5B5864]">{children}</div>
      </div>
    </li>
  );
}

function UsageStats() {
  const { data, isError } = useAiUsage();
  if (isError) return null;
  const model = data ? buildUsageModel(data) : null;
  const recent = model?.daily.slice(-30) ?? [];
  const recentAverage = recent.length ? recent.reduce((sum, day) => sum + day.totalTokens, 0) / recent.length : 0;
  const activeDays = model?.daily.filter((day) => day.totalTokens > 0).length ?? 0;

  const stats = [
    { value: model ? formatTokens(model.yearTotals.totalTokens) : "—", label: `tokens so far in ${model?.reportingYear ?? "this year"}` },
    { value: model ? formatTokens(recentAverage) : "—", label: "a day, over the last 30 days" },
    { value: model ? `${activeDays}/${model.daily.length}` : "—", label: "days this year with AI in the loop" },
  ];

  return (
    <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-[#ECEAF0] pt-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-[36px] font-medium leading-none tracking-[-0.02em] text-[#080808] tabular-nums sm:text-[44px]">
            {stat.value}
          </dd>
          <dd className="mt-2 text-[14px] leading-snug text-[#8A8792]">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

const milestones = [
  {
    text: `Presented at ${recruiterFacts.conference.title}, ${recruiterFacts.conference.location}.`,
    href: "https://www.knowledgegraph.tech/",
  },
  {
    text: `Sorted ${recruiterFacts.toolbox.repositoryCount} open-source AI projects into the bilingual Solo Unicorn Toolbox, synced every week.`,
    href: publicLinks.toolbox,
  },
  {
    text: "Published Context Graph, a public thesis on the kind of context AI agents can actually act on.",
    href: publicLinks.contextGraph,
  },
];

const AiNativeStory = () => (
  <section id="story" aria-labelledby="story-heading" className="bg-white pt-24 font-hero text-[#080808] sm:pt-32">
    <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-10">
    <p className="text-[16px] text-[#8A8792]">Going AI-native</p>
    <h2 id="story-heading" className="mt-3 max-w-[46rem] text-[40px] font-medium leading-[1.02] tracking-[-0.025em] sm:text-[64px]">
      I&apos;m rebuilding how I work and live around AI.
    </h2>
    <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.6] text-[#5B5864]">
      Not as a job title. As a bet that one person with a team of AI agents can do what used to take a company.
      Here is the trail so far.
    </p>

    <ol className="mt-14 border-t border-[#ECEAF0]">
      <Chapter index="01" label="The question" title="Life in AGI">
        <p>
          Before I built anything, I started writing. What happens to work, learning, creativity and agency once AI
          is good enough to do most of what we do? Life in AGI is where I keep asking.
        </p>
        <StoryLink href={publicLinks.lifeInAgi}>Read Life in AGI</StoryLink>
      </Chapter>

      <Chapter index="02" label="Every day" title="Living with AI, measured">
        <p>
          I don&apos;t only write about it. AI is in how I work and how I live, every day. These numbers come straight
          from my own machines and refresh daily.
        </p>
        <UsageStats />
        <StoryLink href="/ai-usage">See the live dashboard</StoryLink>
      </Chapter>

      <Chapter index="03" label="The bet" title="Solo Unicorn Lab & Club">
        <p>
          I believe the one-person company is real. Solo Unicorn Lab is where I build toward it, and Solo Unicorn Club
          is where founders in New York try it together.
        </p>
        <StoryLink href={publicLinks.soloUnicorn}>Visit Solo Unicorn</StoryLink>
      </Chapter>

      <Chapter index="04" label="Along the way" title="Things I made happen">
        <ul className="space-y-4">
          {milestones.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#080808] decoration-[#8A8792]/50 underline-offset-[3px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.text}
                <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-px text-[#FF6815]" />
              </a>
            </li>
          ))}
        </ul>
      </Chapter>
    </ol>
    </div>
  </section>
);

export default AiNativeStory;
