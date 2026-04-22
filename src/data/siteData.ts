export type LogoEntry =
  | { type: "image"; src: string; alt: string; scale?: number }
  | { type: "text"; text: string; sub?: string; alt: string; scale?: number };

export const LOGOS: LogoEntry[] = [
  { type: "image", src: "/client-logos/AAPPTEC-logo.png", alt: "AAPPTEC" },
  { type: "image", src: "/client-logos/faccia_brutto-logo_brandlogos.net_lg7fu-512x216.png", alt: "Faccia Brutto" },
  { type: "image", src: "/client-logos/Coextro-b.png", alt: "Coextro" },
  { type: "image", src: "/client-logos/hiab-corporation-logo-1024x341.png", alt: "Hiab Corporation" },
  { type: "image", src: "/client-logos/sultan-athletic.png", alt: "Sultan Athletic" },
  { type: "image", src: "/client-logos/SIDIA_Brandmark.png", alt: "SIDIA" },
  { type: "image", src: "/client-logos/WESCO_Logo.png", alt: "WESCO International" },
  { type: "image", src: "/client-logos/signet-logo.avif", alt: "Signet" },
  { type: "image", src: "/client-logos/NORLHA_Tibetan_logo.avif", alt: "Norlha" },
  { type: "image", src: "/client-logos/ZSJ_logo_3f401257-835a-41ba-bda1-c02108d9b08e.avif", alt: "ZSJ" },
  { type: "image", src: "/client-logos/brg_logo.png", alt: "BRG" },
  { type: "image", src: "/client-logos/mutimer_no_bg_clean.png", alt: "Mutimer" },
  { type: "image", src: "/client-logos/mesoblast-limited-logo-512x68.png", alt: "Mesoblast" },
  { type: "image", src: "/client-logos/propertybox.webp", alt: "PropertyBox", scale: 1.5 },
  { type: "image", src: "/client-logos/universidad-nacional-de-colombia-vector-logo.png", alt: "Universidad Nacional de Colombia" },
  { type: "image", src: "/client-logos/yokogawa-electric-logo-1024x155.png", alt: "Yokogawa Electric" },
];

export const LOGOS_TRIPLED = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export const HEADLINE_WORDS = ["Gain traction.", "Get sales.", "Grow your business."];

export const SCROLL_TICKER_WORDS = [
  "growth",
  "acquisition",
  "conversion",
  "retention",
  "systems",
  "automation",
  "scale",
  "intelligence"
];

export const CAMPAIGNS = [
  { src: "/campaigns/emails/email_01.webp", alt: "Email campaign design" },
  { src: "/campaigns/emails/email_02.webp", alt: "Email lifecycle campaign" },
  { src: "/campaigns/emails/email_03.webp", alt: "Retention email design" },
  { src: "/campaigns/emails/email_04.webp", alt: "Promotional email campaign" },
  { src: "/campaigns/emails/email_05.webp", alt: "Email flow design" },
  { src: "/campaigns/emails/email_06.webp", alt: "Newsletter campaign design" },
  { src: "/campaigns/emails/email_07.webp", alt: "Welcome series email" },
  { src: "/campaigns/emails/email_08.webp", alt: "Transactional email design" },
  { src: "/campaigns/emails/email_09.webp", alt: "Engagement email campaign" },
  { src: "/campaigns/emails/email_10.webp", alt: "Drip email sequence" },
  { src: "/campaigns/emails/email_11.webp", alt: "Re-engagement email" },
  { src: "/campaigns/emails/email_12.webp", alt: "Loyalty email campaign" },
  { src: "/campaigns/emails/email_13.webp", alt: "Flash sale email" },
  { src: "/campaigns/emails/email_14.webp", alt: "Cart recovery email" },
  { src: "/campaigns/emails/email_15.webp", alt: "Product recommendation email" },
  { src: "/campaigns/emails/email_16.png", alt: "Campaign screenshot" },
  { src: "/campaigns/emails/email_17.png", alt: "Email campaign screenshot" },
  { src: "/campaigns/emails/email_18.png", alt: "Lifecycle email screenshot" },
  { src: "/campaigns/emails/email_19.png", alt: "Retention campaign screenshot" },
  { src: "/campaigns/emails/email_20.png", alt: "Marketing email screenshot" },
  { src: "/campaigns/emails/email_21.png", alt: "Branded email screenshot" },
  { src: "/campaigns/emails/email_22.png", alt: "Promotional campaign screenshot" },
];

export const TRAIL_IMAGES = [
  "/trail-images/trail_01.jpg",
  "/trail-images/trail_02.jpg",
  "/trail-images/trail_03.jpg",
  "/trail-images/trail_04.jpg",
  "/trail-images/trail_05.jpg",
  "/trail-images/trail_06.jpg",
  "/trail-images/trail_07.jpg",
  "/trail-images/trail_08.jpg",
  "/trail-images/trail_09.jpg",
  "/trail-images/trail_10.jpg",
];

export const CASE_STUDIES = [
  {
    id: 0,
    title: "Mutimer",
    subtitle: "How We Helped Mutimer Add $1M ARR In Just 6 Months",
    description: "A data-driven Klaviyo email system that converted a 10K subscriber list into A$1M+ in revenue — 52% of all brand revenue attributed to email.",
    href: "/case-study/Multimer",
    image: "/case-study/mutimer/mutimer-street.png",
    metric: "$1M",
    metricLabel: "ARR in 6 Months",
    category: "Fashion",
    tags: "Email Strategy • Klaviyo • Retention"
  },
  {
    id: 4,
    title: "Signet Sunday",
    subtitle: "How We Helped Signet Sunday Sell 1,200 Units in 2 Hours",
    description: "A coordinated campaign across email, SMS, and launch strategy created a high-intensity demand spike—driving rapid sell-through while strengthening brand equity.",
    href: "/case-study/signet",
    image: "/case-study/signet/Signet sunday quarter zip sweater.webp",
    metric: "$120K",
    metricLabel: "Sold out in 2 Hours",
    category: "Streetwear",
    tags: "Launch Strategy • Hype • Conversion"
  },
  {
    id: 1,
    title: "Scotland Titles",
    subtitle: "$887K Added Revenue in 3 Quarters",
    description: "Rebuilding the acquisition and conversion engine for Scotland Titles, scaling their performance to $887K in growth while lifting ROAS by 73%.",
    href: "/case-study/scotlandtitles",
    image: "/case-study/scotlandtitles/hero.png",
    metric: "$887K",
    metricLabel: "Growth in 3 Quarters",
    category: "Ecommerce / Gifting",
    tags: "Paid Media • ROAS Scaling • CRO"
  },
  {
    id: 2,
    title: "Moxie Pest Control",
    subtitle: "Predictable $1.2M Growth in 12 Months",
    description: "A comprehensive lead acquisition system that transformed Moxie Pest Control’s growth—shifting demand into a predictable $1.2M revenue engine through high-efficiency paid search and conversion paths.",
    href: "/case-study/moxiepest",
    image: "/case-study/moxie/hero-van.webp",
    metric: "$1.2M",
    metricLabel: "Growth in 12 Months",
    category: "Home Services",
    tags: "Paid Media • Funnel Scaling • CRO"
  },
  {
    id: 3,
    title: "Rent Buy It",
    subtitle: "$640K Projected Growth in 9 Months",
    description: "Successfully scaled Rent Buy It’s revenue by $640K while implementing a qualification system that reduced lead costs by 42% and increased volume 10x.",
    href: "/case-study/rentbuyit",
    image: "/case-study/rentbuyit/hero-car.png",
    imageFit: "contain" as const,
    imageBg: "#f0f0f0",
    metric: "$640K",
    metricLabel: "Growth in 9 Months",
    category: "Auto / Car Rental",
    tags: "Paid Search • Qualification • Funnels"
  }
];

export const SERVICES = [
  { title: "Ads", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-1-2.jpg", desc: "Data-driven performance marketing to maximize ROI." },
  { title: "AI SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-8.jpg", desc: "Optimizing content to be cited, mentioned, or recommended by ChatGPT, Claude, Perplexity, and Google's AI Overviews." },
  { title: "SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-3-2.jpg", desc: "Technical and content-driven strategies to dominate search." },
  { title: "Email Strategy", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-2.jpg", desc: "High-converting lifecycle campaigns and newsletters." },
  { title: "P/R", img: "/pr-flower-2.jpeg", desc: "Strategic communications to build authority and trust." },
  { title: "Brand Strategy", img: "/flower-brand-strategy.jpeg", desc: "Positioning and identity to make your business unforgettable." },
];

export const ARC_SAGITTA = 40;
export const CENTER_SCALE_BOOST = 0.08;

// Motion Constants
export const MOTION_EASING = 0.08;
export const MOTION_DAMPING = 0.95;
export const MOTION_BASE_SPEED = 0.56;
export const MOTION_SCROLL_MULT = 0.098;
export const MOTION_INTRO_INJECT = 0.6;
