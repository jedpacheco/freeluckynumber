import { articles } from "../data/articlesData.js";

export const SITE_URL = "https://freeluckynumber.com";
const SITE = "LuckyVibe Daily";

export const staticMeta = {
  "/": {
    title: "LuckyVibe Daily: Birthday, Name and Daily Lucky Number Tools",
    description: "Free, fun lucky number tools: find your birthday lucky number, name number and daily lucky number, plus a decision wheel, odds explainer and honest articles."
  },
  "/daily": {
    title: `Daily Lucky Number, Color and Message | ${SITE}`,
    description: "Get today's lucky number, lucky color and a short positive message. A light daily ritual for fun, with an explanation of how the number is made."
  },
  "/generators": {
    title: `Lucky Generators and Calculators | ${SITE}`,
    description: "All LuckyVibe Daily tools in one place: birthday and name number calculators, the decision wheel, the lucky egg and a random lottery number generator."
  },
  "/odds": {
    title: `Simple Odds Calculator: See Probability Visually | ${SITE}`,
    description: "Type in a number of chances and possible outcomes to see the odds as a percentage and a visual meter. Plain-English help on what odds really mean."
  },
  "/articles": {
    title: `Articles on Lucky Numbers, Numerology and Odds | ${SITE}`,
    description: "Read plain-English articles on life path numbers, lucky numbers around the world, angel numbers, superstitions and the real math behind lottery odds."
  },
  "/about": {
    title: `About Us | ${SITE}`,
    description: "What LuckyVibe Daily is, why we built it, how our tools work and the honest approach we take to luck, numerology and lottery odds."
  },
  "/contact": {
    title: `Contact Us | ${SITE}`,
    description: "How to get in touch with LuckyVibe Daily for questions, corrections, feedback or privacy requests."
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE}`,
    description: "How LuckyVibe Daily handles your information, including cookies, Google AdSense advertising, third-party vendors and your choices."
  },
  "/terms": {
    title: `Terms of Use | ${SITE}`,
    description: "The terms for using LuckyVibe Daily, an entertainment website with lucky number tools and articles."
  },
  "/tools/birthday-lucky-number": {
    title: `Birthday Lucky Number Calculator | ${SITE}`,
    description: "Enter your birth date to get a lucky number, color and day. Learn how the digit-sum method works and how it relates to the numerology life path number."
  },
  "/tools/lucky-name-calculator": {
    title: `Lucky Name Number Calculator | ${SITE}`,
    description: "Turn any name into a lucky number using letter values. See how name numerology works, with examples and a short FAQ."
  },
  "/tools/random-decision-picker": {
    title: `Random Decision Picker Wheel | ${SITE}`,
    description: "Add your options and spin the wheel to pick one at random. Good for dinner, movie night, chores and other small choices."
  },
  "/tools/lottery-number-generator": {
    title: `Random Lottery Number Generator (For Fun) | ${SITE}`,
    description: "Generate random number sets in popular U.S. lottery formats. Honest notes on odds: random picks never improve your chances of winning."
  },
  "/tools/lucky-egg-reveal": {
    title: `Crack the Lucky Egg | ${SITE}`,
    description: "Tap the egg to crack it open and reveal a lucky phrase. A small, fun pick-me-up with a little history of luck rituals."
  },
  "/tools/lucky-wish-jar": {
    title: `Lucky Wish Jar | ${SITE}`,
    description: "Crack the lucky egg and save a wish. A playful tool from LuckyVibe Daily.",
    canonical: "/tools/lucky-egg-reveal"
  },
  "/tools/lucky-goal-board": {
    title: `Lucky Goal Board | ${SITE}`,
    description: "Crack the lucky egg and reveal a phrase for your goals. A playful tool from LuckyVibe Daily.",
    canonical: "/tools/lucky-egg-reveal"
  }
};

export const notFoundMeta = {
  title: `Page Not Found | ${SITE}`,
  description: "The page you were looking for could not be found on LuckyVibe Daily.",
  canonical: "/404"
};

export function getMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (staticMeta[path]) return { canonical: path, ...staticMeta[path] };
  const m = path.match(/^\/articles\/([^/]+)$/);
  if (m) {
    const a = articles.find((x) => x.slug === m[1]);
    if (a) {
      return {
        title: `${a.seoTitle || a.title} | ${SITE}`,
        description: a.description || a.summary,
        canonical: path
      };
    }
  }
  return notFoundMeta;
}

// Every route to prerender. Duplicate egg routes are rendered but kept out of the sitemap.
export const sitemapExclude = ["/tools/lucky-wish-jar", "/tools/lucky-goal-board"];
export function allRoutes() {
  return [...Object.keys(staticMeta), ...articles.map((a) => `/articles/${a.slug}`)];
}
