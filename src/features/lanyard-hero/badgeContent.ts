import { recruiterFacts } from "@/data/recruiter-profile";

export const HERO_FONT = "Newsreader";

export const badgeContent = {
  firstName: "Jesse",
  lastName: "Qin",
  accent: "#FF6815",
  currentlyLabel: "Currently",
  currently: "Founder @ Solo Unicorn Lab",
  previouslyLabel: "Previously",
  pills: [
    { label: recruiterFacts.currentRole.organization, color: "#111111" },
    { label: "Rutgers PhD", color: "#CC0033" },
    { label: "NYU Stern", color: "#57068C" },
  ],
  backLine: "jesseqin.me",
} as const;

export const aboutExperience = [
  {
    period: "Now",
    organization: "Solo Unicorn Lab",
    role: "Founder",
  },
  {
    period: "2025 – 2026",
    organization: recruiterFacts.currentRole.organization,
    role: "Senior MTS",
  },
  {
    period: "2024 – 2025",
    organization: recruiterFacts.education.masters.organization,
    role: recruiterFacts.education.masters.title,
  },
  {
    period: "2016 – 2021",
    organization: recruiterFacts.education.phd.organization,
    role: "PhD, Computer Eng.",
  },
] as const;
