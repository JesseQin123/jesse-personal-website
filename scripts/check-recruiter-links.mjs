import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourceFiles = [
  "src/data/recruiter-profile.ts",
  "src/components/HeroSection.tsx",
  "src/components/ContactSection.tsx",
  "src/components/Footer.tsx",
  "src/components/TalksSection.tsx",
  "src/components/BuildingInPublicSection.tsx",
];

const linkPattern = /(?:https?:\/\/|mailto:)[^\s"'`<>)]+/g;
const discoveredLinks = new Set();
const requiredPublicAssets = ["public/resume/Jesse_Yubo_Qin_Resume.pdf"];

for (const file of sourceFiles) {
  const source = await readFile(resolve(file), "utf8");
  for (const link of source.match(linkPattern) ?? []) discoveredLinks.add(link);
}

const failures = [];
const externalLinks = [];

await Promise.all(requiredPublicAssets.map(async (asset) => {
  try {
    await access(resolve(asset));
  } catch {
    failures.push(`${asset} is missing`);
  }
}));

for (const link of discoveredLinks) {
  if (link.startsWith("mailto:")) {
    if (!/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(link)) failures.push(`${link} is not a valid email link`);
  } else {
    try {
      externalLinks.push(new URL(link).toString());
    } catch {
      failures.push(`${link} is not a valid public URL`);
    }
  }
}

if (process.env.LINK_CHECK_SKIP_NETWORK !== "1") {
  await Promise.all(externalLinks.map(async (link) => {
    try {
      const response = await fetch(link, {
        method: "HEAD",
        redirect: "follow",
        headers: { "user-agent": "JesseQin.me link checker" },
        signal: AbortSignal.timeout(10_000),
      });
      if (response.status >= 500) failures.push(`${link} returned ${response.status}`);
    } catch (error) {
      failures.push(`${link} could not be reached: ${error instanceof Error ? error.message : String(error)}`);
    }
  }));
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${discoveredLinks.size} recruiter-facing links.`);
}
