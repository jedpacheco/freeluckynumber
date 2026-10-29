# LuckyVibe Daily WOW

A React/Vite web app designed as a fun entertainment site with lucky number tools, shareable results, animated cards, and a roulette-style random decision wheel.

## Main Features

- Daily Lucky Number with glowing orb animation
- Birthday Lucky Number Calculator
- Lucky Name Calculator with animated reveal
- Lottery-style number generator with animated number balls
- Random Decision Wheel with roulette-style spinning animation
- Random Decision Picker with shareable results
- Simple Odds Calculator with visual result meter
- Lucky Wish Jar with duplicate-safe saved wishes
- Email, text, and copy result buttons
- Clean visitor-facing copy across the site
- Articles, About, Privacy, and Terms pages
- Bootstrap 5 styling plus custom CSS animations

## How to Run

Open the project folder in VS Code and run:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Notes

The share buttons use the visitor's device apps:
- Email opens the default email app.
- Text opens SMS if the device supports it.
- Copy copies the result to the clipboard.

All tools are for entertainment and educational purposes only. The site does not guarantee lottery winnings or improve odds.


## Restored U.S. Lottery Number Generator

The lottery generator includes broad U.S. lottery-style formats, including:

- Powerball
- Mega Millions
- Lotto America
- Cash4Life
- Lucky for Life
- Pick 2, Pick 3, Pick 4, Pick 5
- Cash Pop
- Fantasy 5
- Cash 5
- Pick 6 / Lotto 6
- State Lotto 6/53, 6/54, and 6/59 formats
- Florida Lotto
- Jackpot Triple Play
- Florida Fantasy 5
- Florida Pick games
- Keno / Quick Draw styles
- Custom Game Builder

The page is still visitor-facing and includes a clear entertainment-only disclaimer.

## Build and prerender (added Oct 2026)

`npm run build` now runs three steps:

1. `vite build` builds the client app into `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` builds a server copy of the app.
3. `node scripts/prerender.mjs` writes `dist/<route>/index.html` for every route, with real text and its own title, description and canonical. It also writes `dist/404.html` and regenerates `sitemap.xml`, both in `dist/` and in `public/`.

After a build, run `npm run verify` to check word counts, unique titles, robots.txt, the sitemap and the 404 page.

Where things live:
- Route titles and descriptions: `src/seo/routeMeta.js`
- Articles: `src/content/articles/*.txt`, listed in `src/data/longArticles.js`
- Tool guides: `src/content/guides/*.txt`
- Azure Static Web Apps config: `public/staticwebapp.config.json`
