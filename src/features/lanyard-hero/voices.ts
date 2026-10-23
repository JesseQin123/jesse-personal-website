// Quotes and timestamps come from the Solo Unicorn opener source list
// (博客剪辑/0911_SoloUnicorn_NEC开场片/out/素材与出处清单.md). Stills are frames
// from the same original videos.
export type Voice = {
  id: string;
  name: string;
  role: string;
  quote: string;
  source: string;
  /** YouTube video id; when present the clip plays in place at `start` seconds. */
  youtubeId?: string;
  start?: number;
  href: string;
  translated?: boolean;
  counterpoint?: boolean;
};

const yt = (id: string, start: number) => `https://www.youtube.com/watch?v=${id}&t=${start}s`;

export const voices: Voice[] = [
  {
    id: "sam",
    name: "Sam Altman",
    role: "CEO, OpenAI",
    quote: "…a little betting pool for when the first one-person billion-dollar company will get started.",
    source: "The Rundown AI, 2025",
    youtubeId: "zwnVUiwObl8",
    start: 331,
    href: yt("zwnVUiwObl8", 331),
  },
  {
    id: "dario",
    name: "Dario Amodei",
    role: "CEO, Anthropic",
    quote: "Asked when the first billion-dollar company with one human employee will appear: “2026.”",
    source: "Code with Claude, 2025",
    youtubeId: "EvtPBaaykdo",
    start: 5633,
    href: yt("EvtPBaaykdo", 5633),
  },
  {
    id: "greg",
    name: "Greg Brockman",
    role: "President, OpenAI",
    quote: "We're going to see solopreneurs, single-person companies that are billion-dollar businesses, and that is already starting to happen.",
    source: "LinkedIn News",
    href: "https://www.linkedin.com/posts/linkedin-news_could-one-person-build-the-next-billion-dollar-activity-7488295531903905792-_Md7",
  },
  {
    id: "chesky",
    name: "Brian Chesky",
    role: "CEO, Airbnb",
    quote: "I do think a one-person company could be a billion-dollar company.",
    source: "Yahoo Finance, 2026",
    href: "https://finance.yahoo.com/video/airbnb-ceo-why-ai-best-100000572.html",
  },
  {
    id: "elon",
    name: "Elon Musk",
    role: "CEO, Tesla & SpaceX",
    quote: "It's just going to be like one-person company.",
    source: "Moonshots #220, 2026",
    youtubeId: "RSNuB9pj9P8",
    start: 2570,
    href: yt("RSNuB9pj9P8", 2570),
  },
  {
    id: "garry",
    name: "Garry Tan",
    role: "President & CEO, Y Combinator",
    quote: "That lab can become a one-person company, and that could be you.",
    source: "Stanford CS153, 2026",
    youtubeId: "Lri2LNYtERM",
    start: 2820,
    href: yt("Lri2LNYtERM", 2820),
  },
  {
    id: "ng",
    name: "Andrew Ng",
    role: "Founder, DeepLearning.AI",
    quote: "Sometimes some of my one-person teams with support around them are my fastest moving teams.",
    source: "Imagination in Action, 2026",
    youtubeId: "8Q9sJYk41sA",
    start: 545,
    href: yt("8Q9sJYk41sA", 545),
  },
  {
    id: "jensen",
    name: "Jensen Huang",
    role: "CEO, NVIDIA",
    quote: "The IT department of every company is going to be the HR department of AI agents in the future.",
    source: "CES 2025 keynote",
    youtubeId: "k82RwXqZHY8",
    start: 2412,
    href: yt("k82RwXqZHY8", 2412),
  },
  {
    id: "son",
    name: "Masayoshi Son",
    role: "CEO, SoftBank Group",
    quote: "The first company in the world to grow a billion agents inside itself, self-replicating and self-evolving.",
    source: "TV Tokyo WBS, 2025",
    youtubeId: "PgbBZ0nwM7Q",
    start: 0,
    href: yt("PgbBZ0nwM7Q", 0),
    translated: true,
  },
  {
    id: "robin",
    name: "Robin Li",
    role: "CEO, Baidu",
    quote: "From people dividing work among people, to mixed teams of people and agents: a super-organization.",
    source: "Baidu Create, 2026",
    youtubeId: "1ZsaXovruZ4",
    start: 137,
    href: yt("1ZsaXovruZ4", 137),
    translated: true,
  },
  {
    id: "demis",
    name: "Demis Hassabis",
    role: "CEO, Google DeepMind",
    quote: "We would actually probably see people in this room operating a thousand X.",
    source: "Y Combinator, 2026",
    youtubeId: "JNyuX1zoOgU",
    start: 1080,
    href: yt("JNyuX1zoOgU", 1080),
  },
  {
    id: "zuck",
    name: "Mark Zuckerberg",
    role: "CEO, Meta",
    quote: "…a 10,000-person organization… in the future, almost everyone is going to have that.",
    source: "This Past Weekend, 2025",
    youtubeId: "zbfOkhrgxH0",
    start: 5390,
    href: yt("zbfOkhrgxH0", 5390),
  },
  {
    id: "aravind",
    name: "Aravind Srinivas",
    role: "CEO, Perplexity",
    quote: "Have a computer go and run your ad campaigns… integrate with Stripe.",
    source: "All-In Podcast, 2026",
    youtubeId: "-JBhTBu9ZbA",
    start: 3500,
    href: yt("-JBhTBu9ZbA", 3500),
  },
  {
    id: "wong",
    name: "Lawrence Wong",
    role: "Prime Minister of Singapore",
    quote: "These are workflows that used to require entire teams. Now a single person with AI agents can do all of that.",
    source: "May Day Rally, 2026",
    youtubeId: "eiLXIe9Ox2w",
    start: 937,
    href: yt("eiLXIe9Ox2w", 937),
  },
  {
    id: "bessent",
    name: "Scott Bessent",
    role: "U.S. Secretary of the Treasury",
    quote: "…the one, the two, the three-person company that would have taken critical mass, 15 or 20 people.",
    source: "G20 remarks, 2026",
    youtubeId: "zXLWPd9r7QI",
    start: 1875,
    href: yt("zXLWPd9r7QI", 1875),
  },
  {
    id: "kuo",
    name: "Kuo Zhang",
    role: "President, Alibaba.com",
    quote: "One person now can operate like a 10-person or 100-person company.",
    source: "Yahoo Finance, 2026",
    href: "https://finance.yahoo.com/video/alibabacom-president-how-small-businesses-win-online-100000967.html",
  },
  {
    id: "kaifu",
    name: "Kai-Fu Lee",
    role: "Founder, Sinovation Ventures & 01.AI",
    quote: "This would have been a team of probably 20 people, but now it's one person.",
    source: "Bloomberg, 2026",
    youtubeId: "fVS1PY32pTc",
    start: 672,
    href: yt("fVS1PY32pTc", 672),
  },
  {
    id: "pwc",
    name: "Dan Priest",
    role: "Chief AI Officer, PwC US",
    quote: "It's really hard for one person to see everything across their business, all the controls…",
    source: "Nicholas Thompson, 2026",
    youtubeId: "8B6fDlXBqkw",
    start: 300,
    href: yt("8B6fDlXBqkw", 300),
    counterpoint: true,
  },
];
