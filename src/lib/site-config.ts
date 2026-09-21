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
} as const;

export type HireRole = (typeof SITE.hireRoles)[number];

export const DEFAULT_FEATURED = [
  { id: "x", label: "View X Profile", href: SITE.contact.x.href, external: true },
  { id: "work", label: "Explore My Work", href: "#work", external: false },
];
