/** Single place to edit Tobi's public identity, contact, and portfolio copy. */

export const SITE = {
  name: "Tobi",
  handle: "ox_tobiiii",
  title: "Tobi — Web3 Creator | Community | Content",
  description:
    "Web3 creator, content creator, community contributor and community manager active in Web3 since 2021.",
  headline: "Building, Creating & Contributing in Web3",
  availability: "OPEN FOR WORK",
  availabilityNote: "OPEN TO OPPORTUNITIES",
  avatar: "/avatar.jpg",
  identities: [
    "Web3 Creator",
    "Content Creator",
    "Community Manager",
    "Web3 Intern",
    "Community Contributor",
  ],
  tagline: "Web3 Creator • Content Creator • Community Manager",
  heroBody: `Active in Web3 since 2021 — creating content, contributing to communities, supporting projects, and growing through Crypto Twitter.

I'm open to Web3 internships, creator roles, community management, content opportunities, ambassador programs and project collaborations.

If you're building something interesting and need someone who can create, communicate and consistently show up — let's work together.`,
  aboutTitle: "Who is Tobi?",
  about: `I've been exploring Web3 since 2021, starting from simply following ecosystems and learning from the community.

Over time, I became more active in Crypto Twitter, content creation, community activities and project collaborations.

Today, I'm focused on creating useful content, helping communities grow, supporting Web3 projects and finding opportunities where I can contribute consistently.`,
  contact: {
    x: {
      label: "X / Twitter",
      handle: "ox_tobiiii",
      href: "https://x.com/ox_tobiiii",
      cta: "Message on X",
      hint: "Message me on X",
    },
    telegram: {
      label: "Telegram",
      handle: "@ox_tobiiii",
      href: "https://t.me/ox_tobiiii",
      cta: "Message on Telegram",
      hint: "Send me a Telegram message",
    },
    discord: {
      label: "Discord",
      handle: "ox_tobiiii",
      href: null as string | null,
      cta: "Copy Discord",
      hint: "Username — copy to clipboard",
    },
    email: {
      label: "Email",
      handle: "oxtobiiii@gmail.com",
      href: "mailto:oxtobiiii@gmail.com",
      cta: "Send Email",
      hint: "Send me an email",
    },
  },
  hireRoles: [
    "Web3 Creator",
    "Content Creator",
    "Community Manager",
    "Web3 Intern",
    "Community Contributor",
    "Ambassador",
    "Collaboration",
    "Other",
  ] as const,
  lookingFor: [
    "Web3 Internship",
    "Content Creator",
    "Community Manager",
    "Community Contributor",
    "Ambassador",
    "Project Collaboration",
  ],
  timeline: [
    { year: "2021", title: "Entered Web3", text: "Started exploring Web3 ecosystems and learning from the community." },
    { year: "2022–2024", title: "Learning & Exploring", text: "Learning ecosystems, communities and Crypto Twitter." },
    { year: "2025–2026", title: "Content & contribution", text: "More active in content, community contribution and project collaborations." },
    { year: "Now", title: "Open for work", text: "Open for Web3 internships, creator roles, community opportunities and collaborations." },
  ],
  journey: [
    { year: "2021", title: "Entered Web3", text: "Started learning about different Web3 ecosystems and communities." },
    { year: "Learning", title: "Learning & Exploring", text: "Followed ecosystems, rooms, and the unglamorous work of actually reading the threads." },
    { year: "CT", title: "Content & CT", text: "Became more active in Crypto Twitter and Web3 content." },
    { year: "Community", title: "Community Contribution", text: "Started contributing to communities and project activities." },
    { year: "Creator", title: "Creator / Contributor", text: "Focused more on content, collaboration and ecosystem contribution." },
    { year: "Now", title: "Open for work", text: "Available for Web3 internships, creator roles, community management and collaborations." },
  ],
  services: [
    {
      n: "01",
      title: "Web3 Content Creator",
      blurb: "Useful CT posts that sound like a person, not a press release.",
      points: [
        "X / Crypto Twitter content",
        "Project-related posts",
        "Educational content",
        "Campaign content",
        "Community-focused content",
        "CT engagement",
      ],
    },
    {
      n: "02",
      title: "Community Manager",
      blurb: "Show up in the room, keep the signal high, talk like a human.",
      points: [
        "Discord / Telegram community support",
        "Community engagement",
        "Member communication",
        "Community activities",
        "Feedback collection",
        "Community growth support",
      ],
    },
    {
      n: "03",
      title: "Web3 Intern",
      blurb: "Research, assistance, and consistent follow-through.",
      points: [
        "Web3 research",
        "Project research",
        "Community support",
        "Content assistance",
        "Campaign assistance",
        "Ecosystem research",
      ],
    },
    {
      n: "04",
      title: "Community Contributor",
      blurb: "Participate, ship small things, make the room better.",
      points: [
        "Project contribution",
        "Community participation",
        "Content contribution",
        "Event / campaign support",
        "Ecosystem activities",
      ],
    },
    {
      n: "05",
      title: "Ambassador / Creator",
      blurb: "Longer-term presence: content, campaigns, awareness.",
      points: [
        "Long-term project contribution",
        "Social content",
        "Community engagement",
        "Campaign promotion",
        "Ecosystem awareness",
      ],
    },
    {
      n: "06",
      title: "Collaboration & Growth",
      blurb: "CT outreach and collabs that actually go somewhere.",
      points: [
        "Community collaborations",
        "CT outreach",
        "Creator collaborations",
        "Campaign support",
        "Project visibility",
      ],
    },
  ],
  projects: [
    {
      name: "Crypto Twitter",
      category: "Content",
      role: "Creator",
      contribution: "Ongoing CT presence — posts, engagement, and community conversations since getting serious on the timeline.",
      href: "https://x.com/ox_tobiiii",
      status: "Active",
    },
    {
      name: "Community rooms",
      category: "Community",
      role: "Contributor",
      contribution: "Showing up in Discord / Telegram spaces, supporting conversations, and helping rooms stay useful.",
      href: "https://t.me/ox_tobiiii",
      status: "Active",
    },
    {
      name: "Ecosystem research",
      category: "Ecosystem",
      role: "Intern / researcher",
      contribution: "Learning ecosystems, tracking campaigns, and writing clearly about what is actually happening.",
      href: "#services",
      status: "Ongoing",
    },
  ],
  heroCredLine:
    "Ambassador @ BestChange & Action Model · Official KOL @ Bitget Wallet",
  // EDIT THIS: swap in /assets/obito-fight.webm when you have the file.
  fightVideo: "/assets/obito-fight.webm",
  fightPoster: "/assets/dog-bg.jpg",
  ambassadors: [
    {
      name: "BestChange",
      handle: "bestchangeeng",
      href: "https://x.com/bestchangeeng",
      role: "Ambassador",
      summary: "Representing BestChange as an active ambassador.",
      logo: "/assets/partners/bestchange.jpg",
    },
    {
      name: "Action Model",
      handle: "ActionModelAI",
      href: "https://x.com/ActionModelAI",
      role: "Ambassador",
      summary: "Representing Action Model as an active ambassador.",
      logo: "/assets/partners/action-model.jpg",
    },
  ],
  kol: {
    name: "Bitget Wallet",
    handle: "BitgetWallet",
    href: "https://x.com/BitgetWallet",
    role: "Official KOL of Bitget Wallet",
    summary: "Official KOL of Bitget Wallet.",
    logo: "/assets/partners/bitget-wallet.jpg",
  },
  proof: [
    {
      project: "Action Model",
      excerpt: "Your everyday clicks can train community-owned AI — train it, earn it, own it. NeoSoul campaign breakdown.",
      views: "7.6K",
      likes: "72",
      replies: "52",
      href: "https://x.com/ox_tobiiii/status/2097496137603432783",
    },
    {
      project: "CT",
      excerpt: "Most hyped mints on CT that day — zecfrogs, Zeckers, zaddrnet, zentinels. Real-time mint coverage.",
      views: "5.2K",
      likes: "48",
      replies: "18",
      href: "https://x.com/ox_tobiiii/status/2101946032070516917",
    },
    {
      project: "ActionFi",
      excerpt: "Weekend 2x points on SIXR daily tasks — $100K pool, top 200 leaderboard. Simple campaign update.",
      views: "3.2K",
      likes: "30",
      replies: "28",
      href: "https://x.com/ox_tobiiii/status/2096076254135128066",
    },
    {
      project: "Action Model",
      excerpt: "Action Model marketplace in plain English — AI workflows, $LAM burns, and how creators get paid.",
      views: "2.1K",
      likes: "38",
      replies: "24",
      href: "https://x.com/ox_tobiiii/status/2097860326205395121",
    },
    {
      project: "ActionFi",
      excerpt: "Congrats to 40 ActionFi lottery winners. Stay consistent — NeoSoul + SIXR still live.",
      views: "1.8K",
      likes: "44",
      replies: "28",
      href: "https://x.com/ox_tobiiii/status/2096931947817881644",
    },
    {
      project: "ActionFi",
      excerpt: "ActionFi x SIXR guide: $100K pool, $LAM farming, no empty like/follow tasks — real product usage.",
      views: "1.7K",
      likes: "47",
      replies: "37",
      href: "https://x.com/ox_tobiiii/status/2095693778971664391",
    },
  ],
  statsNote: "Last 7 days · from X Analytics",
  stats: [
    {
      label: "Followers",
      value: 15400,
      format: "compact" as const,
      note: "12.2K verified",
    },
    {
      label: "Impressions",
      value: 181000,
      format: "compact" as const,
      note: "+178%",
      tone: "up" as const,
    },
    {
      label: "Engagements",
      value: 12900,
      format: "compact" as const,
      note: "+105%",
      tone: "up" as const,
    },
    {
      label: "Engagement rate",
      value: 7.1,
      format: "percent" as const,
      note: "Last 7 days",
    },
  ],
  ecosystems: [
    "Arbitrum",
    "Aptos",
    "Sui",
    "LayerZero",
    "zkSync",
    "Linea",
    "Berachain",
    "Monad",
    "RedStone",
    "Ethereum",
    "Solana",
    "Base",
  ],
  contactRoles: [
    "Ambassador",
    "KOL",
    "Community Manager",
    "Content Creator",
    "Web3 Intern",
    "Collaboration",
  ] as const,
  formspree: "https://formspree.io/f/xxxxxxxx", // EDIT THIS
  wallet: "Add ENS / wallet", // EDIT THIS
  mediaKit: "/media-kit.pdf", // EDIT THIS
} as const;

export type HireRole = (typeof SITE.hireRoles)[number];

export const DEFAULT_FEATURED = [
  { id: "x", label: "View X Profile", href: SITE.contact.x.href, external: true },
  { id: "work", label: "Explore My Work", href: "#proof", external: false },
];
