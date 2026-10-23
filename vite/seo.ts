import type { Plugin } from "vite";
import {
  SITE_URL,
  education,
  faqs,
  identity,
  milestones,
  organizations,
  profiles,
  projects,
  story,
} from "../src/data/identity";
import { voices } from "../src/features/lanyard-hero/voices";

// Build-time GEO: most AI crawlers don't run JavaScript, so the homepage ships its words, its
// structured data and its llms.txt as plain files. React replaces the static block on mount.

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type UsageSummary = { year: string; yearTokens: number; recentDaily: number; activeDays: number; days: number };

async function fetchUsage(): Promise<UsageSummary | null> {
  try {
    const response = await fetch(`${SITE_URL}/api/ai-usage`, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      machines: { days: { date: string; totals: { totalTokens: number } }[] }[];
    };
    const year = new Date().toISOString().slice(0, 4);
    const byDate = new Map<string, number>();
    for (const machine of data.machines)
      for (const day of machine.days)
        if (day.date.startsWith(year)) byDate.set(day.date, (byDate.get(day.date) ?? 0) + day.totals.totalTokens);
    const dates = [...byDate.keys()].sort();
    if (!dates.length) return null;
    const recent = dates.slice(-30);
    return {
      year,
      yearTokens: dates.reduce((sum, date) => sum + byDate.get(date)!, 0),
      recentDaily: recent.reduce((sum, date) => sum + byDate.get(date)!, 0) / recent.length,
      activeDays: dates.filter((date) => byDate.get(date)! > 0).length,
      days: dates.length,
    };
  } catch {
    return null;
  }
}

const tokens = (value: number) =>
  value >= 1e9 ? `${(value / 1e9).toFixed(1)} billion` : `${Math.round(value / 1e6)} million`;

const usageSentence = (usage: UsageSummary | null) =>
  usage
    ? `As of this build, Jesse has used ${tokens(usage.yearTokens)} AI tokens in ${usage.year}, about ${tokens(usage.recentDaily)} a day over the last 30 days, with AI in the loop on ${usage.activeDays} of ${usage.days} days.`
    : "Jesse's daily AI token usage is published live at jesseqin.me/ai-usage.";

const PERSON_ID = `${SITE_URL}/#person`;
const LAB_ID = `${SITE_URL}/#solo-unicorn-lab`;

function structuredData() {
  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: identity.name,
    alternateName: identity.alternateNames,
    givenName: identity.givenName,
    familyName: identity.familyName,
    description: identity.oneLiner,
    disambiguatingDescription: identity.disambiguation,
    url: `${SITE_URL}/`,
    image: identity.image,
    email: `mailto:${identity.email}`,
    jobTitle: "Founder",
    worksFor: { "@id": LAB_ID },
    alumniOf: education.map((school) => ({ "@type": "CollegeOrUniversity", name: school.name })),
    hasOccupation: [
      { "@type": "Occupation", name: `Founder, ${organizations.lab.name}` },
      { "@type": "Occupation", name: `${organizations.previous.role}, ${organizations.previous.name} (${organizations.previous.period})` },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: identity.location.locality,
      addressRegion: identity.location.region,
      addressCountry: identity.location.country,
    },
    knowsAbout: identity.knowsAbout,
    sameAs: Object.values(profiles),
  };
  const lab = {
    "@type": "Organization",
    "@id": LAB_ID,
    name: organizations.lab.name,
    url: organizations.lab.url,
    founder: { "@id": PERSON_ID },
    location: "New York, NY",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      lab,
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: `${identity.name} — ${identity.headline}`,
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: identity.name, publisher: { "@id": PERSON_ID } },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
      },
    ],
  };
}

function staticBody(usage: UsageSummary | null) {
  const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`;
  return `<main class="static-profile">
<header>
<h1>${esc(identity.name)}</h1>
<p>${esc(identity.headline)}</p>
<p>${esc(identity.oneLiner)}</p>
<p>${esc(identity.disambiguation)}</p>
</header>
<section aria-labelledby="static-story">
<h2 id="static-story">Going AI-native</h2>
<p>Jesse is rebuilding how he works and lives around AI, as a bet that one person with a team of AI agents can do what used to take a company.</p>
${story.map((chapter) => `<h3>${esc(chapter.title)}</h3>\n<p>${esc(chapter.text)}</p>`).join("\n")}
<p>${esc(usageSentence(usage))}</p>
<h3>Along the way</h3>
<ul>${milestones.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
</section>
<section aria-labelledby="static-projects">
<h2 id="static-projects">Projects</h2>
<ul>${projects.map((item) => `<li>${link(item.url, item.name)}: ${esc(item.summary)}</li>`).join("")}</ul>
</section>
<section aria-labelledby="static-background">
<h2 id="static-background">Background</h2>
<ul>
<li>${esc(organizations.lab.role)}, ${esc(organizations.lab.name)} (now)</li>
<li>${esc(organizations.previous.role)}, ${esc(organizations.previous.name)} (${esc(organizations.previous.period)})</li>
${education.map((school) => `<li>${esc(school.credential)}, ${esc(school.name)} (${esc(school.period)})</li>`).join("\n")}
</ul>
</section>
<section aria-labelledby="static-voices">
<h2 id="static-voices">The people building AI are saying it too</h2>
<p>Moments Jesse cut into the opening film for a Solo Unicorn event, each linked to its original source.</p>
<ul>${voices.map((voice) => `<li><blockquote cite="${esc(voice.href)}">“${esc(voice.quote)}”</blockquote> ${link(voice.href, `${voice.name}, ${voice.role} · ${voice.source}`)}</li>`).join("")}</ul>
</section>
<section aria-labelledby="static-faq">
<h2 id="static-faq">Questions people ask</h2>
${faqs.map((item) => `<h3>${esc(item.q)}</h3>\n<p>${esc(item.a)}</p>`).join("\n")}
</section>
<footer>
<p>Contact: ${link(`mailto:${identity.email}`, identity.email)} · ${link(profiles.linkedin, "LinkedIn")} · ${link(profiles.github, "GitHub")} · ${link(profiles.x, "X")} · ${link(profiles.medium, "Medium")}</p>
<p>${link("/llms.txt", "llms.txt")} · ${link("/ai-usage", "AI usage dashboard")}</p>
</footer>
</main>`;
}

function llmsTxt(full: boolean, usage: UsageSummary | null) {
  const lines = [
    `# ${identity.name}`,
    "",
    `> ${identity.oneLiner}`,
    "",
    `${identity.disambiguation} Also known as: ${identity.alternateNames.join(", ")}. Contact: ${identity.email}.`,
    "",
    "## Now",
    "",
    `- ${organizations.lab.role}, [${organizations.lab.name}](${organizations.lab.url}), ${identity.location.locality}`,
    `- ${organizations.club.role}, [${organizations.club.name}](${organizations.club.url}), a founder community in New York`,
    "",
    "## Profiles",
    "",
    `- [Website](${SITE_URL}/)`,
    `- [LinkedIn](${profiles.linkedin})`,
    `- [GitHub](${profiles.github})`,
    `- [X (@jesseqin_)](${profiles.x})`,
    `- [Medium](${profiles.medium})`,
    "",
    "## Projects",
    "",
    ...projects.map((item) => `- [${item.name}](${item.url}): ${item.summary}`),
    "",
    "## Background",
    "",
    `- ${organizations.previous.role}, [${organizations.previous.name}](${organizations.previous.url}) (${organizations.previous.period})`,
    ...education.map((school) => `- ${school.credential}, ${school.name} (${school.period})`),
  ];
  if (full) {
    lines.push(
      "",
      "## Story: going AI-native",
      "",
      "Jesse is rebuilding how he works and lives around AI, as a bet that one person with a team of AI agents can do what used to take a company.",
      "",
      ...story.flatMap((chapter) => [`### ${chapter.title}`, "", chapter.text, ""]),
      usageSentence(usage),
      "",
      "### Along the way",
      "",
      ...milestones.map((item) => `- ${item}`),
      "",
      "## Voices on the one-person company",
      "",
      ...voices.map((voice) => `- ${voice.name} (${voice.role}): “${voice.quote}” [${voice.source}](${voice.href})`),
      "",
      "## FAQ",
      "",
      ...faqs.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    );
  } else {
    lines.push("", "## Optional", "", `- [Full profile for AI agents](${SITE_URL}/llms-full.txt): story, live AI usage, milestones, FAQ`);
  }
  return lines.join("\n") + "\n";
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["/", "/ai-usage", "/projects"];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
}

export function seo(): Plugin {
  let usage: UsageSummary | null = null;
  return {
    name: "jesse-seo",
    apply: "build",
    async buildStart() {
      usage = await fetchUsage();
    },
    transformIndexHtml(html) {
      const ld = `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, "\\u003c")}</script>`;
      return html
        .replace("</head>", `    ${ld}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${staticBody(usage)}</div>`);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt(false, usage) });
      this.emitFile({ type: "asset", fileName: "llms-full.txt", source: llmsTxt(true, usage) });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap() });
    },
  };
}
