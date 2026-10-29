import RichText from "./RichText.jsx";
import birthday from "../content/guides/birthday.txt?raw";
import name from "../content/guides/name.txt?raw";
import daily from "../content/guides/daily.txt?raw";
import odds from "../content/guides/odds.txt?raw";
import decision from "../content/guides/decision.txt?raw";
import lottery from "../content/guides/lottery.txt?raw";
import egg from "../content/guides/egg.txt?raw";
import { Link } from "react-router-dom";
import { articles } from "../data/articlesData.js";

const guides = {
  birthday: { text: birthday, related: ["what-your-life-path-number-says-about-you", "how-to-find-your-lucky-number-from-your-birthday", "master-numbers-11-22-33", "lucky-numbers-for-each-zodiac-sign"] },
  name: { text: name, related: ["name-numerology-letters-to-numbers", "what-your-life-path-number-says-about-you", "master-numbers-11-22-33"] },
  daily: { text: daily, related: ["angel-numbers-111-222-333", "why-7-is-the-luckiest-number", "lucky-colors-and-numbers-2027-by-zodiac-sign"] },
  odds: { text: odds, related: ["gamblers-fallacy-explained", "lottery-myths-hot-and-cold-numbers", "understanding-odds-in-simple-terms"] },
  decision: { text: decision, related: ["how-to-use-a-random-picker-to-decide-faster", "why-decision-wheels-are-fun", "how-random-number-generators-work"] },
  lottery: { text: lottery, related: ["lottery-myths-hot-and-cold-numbers", "quick-picks-vs-chosen-numbers", "birthday-numbers-and-the-lottery", "gamblers-fallacy-explained"] },
  egg: { text: egg, related: ["why-7-is-the-luckiest-number", "lucky-and-unlucky-numbers-around-the-world", "angel-numbers-111-222-333"] }
};

function ToolGuide({ id }) {
  const guide = guides[id];
  if (!guide) return null;
  const related = guide.related.map((s) => articles.find((a) => a.slug === s)).filter(Boolean);
  return (
    <section className="container pb-5">
      <div className="content-panel tool-guide">
        <RichText text={guide.text} />
        {related.length > 0 && (
          <>
            <h2 className="h4 mt-4">Related articles</h2>
            <ul className="related-links">
              {related.map((a) => (
                <li key={a.slug}><Link to={`/articles/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default ToolGuide;
