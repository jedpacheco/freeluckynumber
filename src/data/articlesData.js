import b_0 from "../content/articles/how-random-number-generators-work.txt?raw";
import b_1 from "../content/articles/fun-ways-to-pick-lucky-numbers.txt?raw";
import b_2 from "../content/articles/why-decision-wheels-are-fun.txt?raw";
import b_3 from "../content/articles/understanding-odds-in-simple-terms.txt?raw";
import { longArticles } from "./longArticles.js";

const shortArticles = [
  {
    slug: "how-random-number-generators-work",
    title: "How Random Number Generators Work",
    summary: "A simple explanation of how digital tools can generate unpredictable numbers.",
    content: [
      "Random number generators are tools that create numbers without asking the user to choose them manually. In entertainment tools, they are often used for games, drawings, practice activities, or quick decisions.",
      "On this site, random numbers are created using JavaScript. The result is meant to be fun and interactive, not a prediction or a guarantee.",
      "A good random tool should be simple, clear, and honest about what it does. LuckyVibe Daily keeps these tools focused on entertainment and learning."
    ]
  },
  {
    slug: "fun-ways-to-pick-lucky-numbers",
    title: "Fun Ways to Pick Lucky Numbers",
    summary: "Creative ways visitors can choose numbers for games, parties, or personal fun.",
    content: [
      "People often choose numbers based on birthdays, favorite dates, meaningful places, or completely random picks.",
      "A lucky number can be a fun way to personalize a game or decision, but it should not be treated as a promise of winning anything.",
      "The best way to enjoy lucky numbers is to see them as entertainment and a creative way to add excitement to the day."
    ]
  },
  {
    slug: "why-decision-wheels-are-fun",
    title: "Why Decision Wheels Are Fun",
    summary: "Why spinning a wheel makes simple choices more exciting and shareable.",
    content: [
      "Decision wheels are fun because they turn a simple choice into a small experience. Instead of just seeing an instant result, the user gets suspense, motion, and a reveal.",
      "They work well for light decisions like what to eat, what movie to watch, where to go, or which activity to try next.",
      "A decision wheel should be used for low-risk choices. Important personal, medical, legal, or financial decisions should not be left to a random tool."
    ]
  },
  {
    slug: "understanding-odds-in-simple-terms",
    title: "Understanding Odds in Simple Terms",
    summary: "A beginner-friendly look at odds and probability.",
    content: [
      "Odds describe how likely something is to happen compared with other possible outcomes. For example, if there is one winning item among one hundred options, the chance is one out of one hundred.",
      "Seeing odds visually can help people understand why rare events are hard to predict.",
      "The odds tools on this site are educational and simplified. They are not gambling advice or financial advice."
    ]
  }
];

// Short original articles get a category so the Articles page can group them.
shortArticles.forEach((a) => { a.category = a.category || (a.slug.includes("odds") || a.slug.includes("random") ? "odds" : "tools"); });

const expandedBodies = {
  "how-random-number-generators-work": b_0,
  "fun-ways-to-pick-lucky-numbers": b_1,
  "why-decision-wheels-are-fun": b_2,
  "understanding-odds-in-simple-terms": b_3,
};
shortArticles.forEach((a) => { if (expandedBodies[a.slug]) a.body = expandedBodies[a.slug]; });

export const articles = [...longArticles, ...shortArticles];
