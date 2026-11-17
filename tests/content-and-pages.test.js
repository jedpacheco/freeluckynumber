import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function knownRoutes() {
  const app = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
  const routes = new Set(
    [...app.matchAll(/path="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((route) => route !== "*" && !route.includes(":"))
  );
  const data = [
    fs.readFileSync(path.join(root, "src/data/longArticles.js"), "utf8"),
    fs.readFileSync(path.join(root, "src/data/articlesData.js"), "utf8")
  ].join("\n");
  for (const match of data.matchAll(/slug"?\s*:\s*"([^"]+)"/g)) {
    routes.add(`/articles/${match[1]}`);
  }
  return routes;
}

function internalLinks(text) {
  return [...text.matchAll(/\]\((\/[^)\s]+)\)/g)].map((match) => match[1]);
}

const NEW_ARTICLES = [
  {
    slug: "what-your-personal-year-number-means-for-2027",
    title: "Personal Year Number for 2027: Meaning and How to Calculate It | LuckyVibe Daily",
    description: "How to calculate your numerology personal year number for 2027 from your birth month and day, with a worked example and what each year is traditionally said to mean.",
    phrase: /personal year for 2027 is 4/
  },
  {
    slug: "why-lucky-rituals-feel-good",
    title: "Why Lucky Rituals Feel Good, Even When They Don't Change the Odds | LuckyVibe Daily",
    description: "An honest look at why lucky numbers, charms and little rituals can still feel meaningful, even though they don't change the odds of a random event.",
    phrase: /illusion of control/
  },
  {
    slug: "lucky-jersey-numbers",
    title: "Lucky Jersey Numbers: Why Athletes and Fans Get Attached | LuckyVibe Daily",
    description: "Why players pick certain jersey numbers, why some numbers get retired, and why a favorite number can feel lucky without changing how the game works.",
    phrase: /Jackie Robinson/
  }
];

test("article and guide links point at routes the app actually renders", () => {
  const routes = knownRoutes();
  assert.ok(routes.has("/methodology"));
  assert.ok(routes.has("/daily"));
  const files = walk(path.join(root, "src/content")).filter((file) => file.endsWith(".txt"));
  const missing = [];
  for (const file of files) {
    for (const link of internalLinks(fs.readFileSync(file, "utf8"))) {
      if (!routes.has(link)) missing.push(`${path.relative(root, file)} -> ${link}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("new articles are listed, dated, and linked from the pages their frontmatter names", () => {
  const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
  const listing = fs.readFileSync(path.join(root, "src/pages/ArticlesPage.jsx"), "utf8");
  assert.match(listing, /articles\.filter\(\(a\) => a\.category === g\.id\)/);
  const rituals = fs.readFileSync(path.join(root, "src/content/articles/why-lucky-rituals-feel-good.txt"), "utf8");
  const jersey = fs.readFileSync(path.join(root, "src/content/articles/lucky-jersey-numbers.txt"), "utf8");
  assert.match(rituals, /\/articles\/lucky-jersey-numbers/);
  assert.match(jersey, /\/articles\/why-lucky-rituals-feel-good/);
  assert.equal(rituals.includes("draft-for-review"), false);
  assert.equal(rituals.includes("Not published"), false);
  assert.equal(jersey.includes("draft-for-review"), false);

  const inbound = {
    "what-your-personal-year-number-means-for-2027": [
      "src/content/articles/what-your-life-path-number-says-about-you.txt",
      "src/content/articles/how-to-find-your-lucky-number-from-your-birthday.txt",
      "src/content/articles/master-numbers-11-22-33.txt",
      "src/content/guides/birthday.txt"
    ],
    "why-lucky-rituals-feel-good": [
      "src/content/articles/gamblers-fallacy-explained.txt",
      "src/content/articles/lottery-myths-hot-and-cold-numbers.txt",
      "src/content/articles/why-7-is-the-luckiest-number.txt",
      "src/content/guides/daily.txt"
    ],
    "lucky-jersey-numbers": [
      "src/content/articles/why-7-is-the-luckiest-number.txt",
      "src/content/articles/why-lucky-rituals-feel-good.txt",
      "src/content/articles/how-to-find-your-lucky-number-from-your-birthday.txt",
      "src/content/guides/birthday.txt"
    ]
  };

  for (const article of NEW_ARTICLES) {
    const body = fs.readFileSync(path.join(root, "src/content/articles", `${article.slug}.txt`), "utf8");
    assert.equal(body.includes("draft-for-review"), false);
    assert.equal(body.includes("Not published"), false);
    const block = sitemap.match(new RegExp(`<loc>https://freeluckynumber.com/articles/${article.slug}</loc>\\s*<lastmod>([^<]+)</lastmod>`));
    assert.equal(block && block[1], "2026-11-17");
    for (const file of inbound[article.slug]) {
      const text = fs.readFileSync(path.join(root, file), "utf8");
      assert.ok(text.includes(`/articles/${article.slug}`), `${file} -> ${article.slug}`);
    }
  }

  const eggBlock = sitemap.match(/<loc>https:\/\/freeluckynumber\.com\/tools\/lucky-egg-reveal<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/);
  assert.equal(eggBlock && eggBlock[1], "2026-11-17");
  const before = (sitemap.match(/<loc>/g) || []).length;
  assert.ok(before >= 37);
});

test("cited odds and research links are present, and the old unsupported figures are gone", () => {
  const myths = fs.readFileSync(path.join(root, "src/content/articles/lottery-myths-hot-and-cold-numbers.txt"), "utf8");
  const seven = fs.readFileSync(path.join(root, "src/content/articles/why-7-is-the-luckiest-number.txt"), "utf8");
  const quick = fs.readFileSync(path.join(root, "src/content/articles/quick-picks-vs-chosen-numbers.txt"), "utf8");
  for (const url of [
    "https://www.powerball.com/powerball-prize-chart",
    "https://www.megamillions.com/how-to-play/",
    "https://floridalottery.com/content/dam/flalottery-web/files/game-reports/florida-lotto/lottoodds.pdf"
  ]) {
    assert.ok(myths.includes(url), url);
  }
  assert.match(myths, /292,201,338/);
  assert.match(myths, /290,472,336/);
  assert.match(myths, /22,957,480/);
  assert.equal(myths.includes("1 in 23 million"), false);
  assert.equal(myths.includes("292.2 million"), false);

  for (const url of [
    "https://www.theguardian.com/science/2014/apr/13/favourite-number-survey-psychology",
    "https://doi.org/10.1037/h0043158",
    "https://doi.org/10.1017/S0140525X01003922",
    "https://doi.org/10.1037/0096-1523.2.2.291"
  ]) {
    assert.ok(seven.includes(url), url);
  }
  assert.match(seven, /44,000/);
  assert.match(seven, /28\.4 percent/);
  assert.equal(seven.includes("between 1 and 10, they pick 7"), false);
  assert.equal(seven.includes("early 1900s"), false);

  assert.ok(quick.includes("https://doi.org/10.1037/0022-3514.32.2.311"));
  assert.ok(quick.includes("https://www.nytimes.com/2005/05/12/world/americas/as-the-cookie-crumbles-winners-galore-in-lottery.html"));
  assert.equal(quick.includes("70 to 80"), false);
  assert.equal(quick.includes("split many ways"), false);
});

test("rendered pages explain the real methods and do not invent an ad or consent status", async (t) => {
  const vite = await createServer({
    root,
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom"
  });
  t.after(() => vite.close());
  const { render, getMeta } = await vite.ssrLoadModule("/src/entry-server.jsx");

  const about = render("/about");
  assert.match(about, /date on your device/);
  assert.match(about, /not a scientific reading/);
  assert.match(about, /does not state an approval/);
  assert.equal(about.includes("daily number, egg, wheel and generators use"), false);

  const privacy = render("/privacy");
  assert.match(privacy, /luckyvibe-cookie-notice/);
  assert.match(privacy, /not a Google-certified consent management/);
  assert.match(privacy, /support\.google\.com\/adsense\/answer\/13554116/);
  assert.equal(privacy.includes("may be shown a consent message"), false);
  assert.equal(privacy.includes("We show ads from Google AdSense"), false);

  const terms = render("/terms");
  assert.match(terms, /may or may not/);
  assert.equal(terms.includes("The site shows ads from Google AdSense"), false);

  const methodology = render("/methodology");
  assert.match(methodology, /LuckyVibe Daily editorial team/);
  assert.match(methodology, /does not publish named author biographies/);
  assert.match(methodology, /292,201,338/);
  assert.match(methodology, /contactfreeluckynumber@gmail.com/);
  assert.equal(methodology.includes("Dr."), false);

  const birthday = render("/tools/birthday-lucky-number");
  assert.match(birthday, /1, 9, 9, 1, 0, 7, 0, 4/);
  assert.match(birthday, /September 29, 2000/);
  assert.match(birthday, /not a personality test/);

  const name = render("/tools/lucky-name-calculator");
  assert.match(name, /Alphabet place/);
  assert.match(name, />J</);
  assert.match(name, />10</);
  assert.match(name, /Chaldean/);

  const odds = render("/odds");
  assert.match(odds, /Fair coin, one face/);
  assert.match(odds, /does not recommend a bet/);
  assert.match(odds, /Powerball jackpot, one play/);

  const lottery = render("/tools/lottery-number-generator");
  assert.match(lottery, /does not sell tickets/);
  assert.match(lottery, /292,201,338/);
  assert.match(lottery, /not more likely than any other line/);

  const seven = render("/articles/why-7-is-the-luckiest-number");
  assert.match(seven, /editorial team/);
  assert.match(seven, /doi\.org\/10\.1037\/h0043158/);
  assert.match(seven, /not a laboratory experiment/);
  assert.match(seven, /\/articles\/lucky-jersey-numbers/);
  assert.match(seven, /\/articles\/why-lucky-rituals-feel-good/);

  const titles = new Set();
  const descriptions = new Set();
  for (const article of NEW_ARTICLES) {
    const meta = getMeta(`/articles/${article.slug}`);
    assert.equal(meta.title, article.title);
    assert.equal(meta.description, article.description);
    assert.equal(meta.canonical, `/articles/${article.slug}`);
    titles.add(meta.title);
    descriptions.add(meta.description);
    const html = render(`/articles/${article.slug}`);
    assert.match(html, article.phrase);
    assert.match(html, /Published <time dateTime="2026-11-17">Nov 17, 2026<\/time>/);
    assert.equal(html.includes("draft-for-review"), false);
    assert.equal(html.includes("Not published"), false);
    const listing = render("/articles");
    assert.match(listing, new RegExp(article.slug));
  }
  assert.equal(titles.size, NEW_ARTICLES.length);
  assert.equal(descriptions.size, NEW_ARTICLES.length);

  const egg = render("/tools/lucky-egg-reveal");
  assert.match(egg, /Updated <time dateTime="2026-11-17">Nov 17, 2026<\/time>/);
  assert.match(egg, /fixed list of 8 lucky phrases/);
  assert.match(egg, /Crack the Egg/);
  assert.match(egg, /Your message is waiting inside/);
  assert.equal(egg.includes("motion, and surprise"), false);
  assert.equal(egg.includes("draft-for-review"), false);
  const eggSource = fs.readFileSync(path.join(root, "src/pages/tools/LuckyEggPage.jsx"), "utf8");
  assert.match(eggSource, /function crackEgg\(\)/);
  assert.match(eggSource, /Math\.floor\(Math\.random\(\) \* luckyPhrases\.length\)/);
  assert.match(eggSource, /A good surprise may find you soon\./);
  assert.match(eggSource, /Try Another Egg/);

  const myths = render("/articles/lottery-myths-hot-and-cold-numbers");
  assert.match(myths, /11,238,513/);
  assert.match(myths, /22,957,480/);

  const RealDate = globalThis.Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(2026, 10, 7, 15, 0, 0);
      else super(...args);
    }
  };
  try {
    const daily = render("/daily");
    assert.match(daily, /2026-11-07/);
    assert.match(daily, /2,430/);
    assert.match(daily, /Cherry Red/);
    assert.match(daily, /Saturday/);
    assert.match(daily, /not a forecast/);
    assert.match(daily, /not part of the date seed/);
  } finally {
    globalThis.Date = RealDate;
  }
});
