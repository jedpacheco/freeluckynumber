import Hero from "../components/Hero.jsx";
import ToolCard from "../components/ToolCard.jsx";
import AdBox from "../components/AdBox.jsx";
import { Link } from "react-router-dom";
import { toolCards } from "../data/toolsData.js";
import { articles } from "../data/articlesData.js";

function HomePage() {
  return (
    <>
      <Hero />

      <main className="container py-5">
        <section className="text-center mb-5">
          <span className="eyebrow">Explore</span>
          <h2 className="section-title">Popular Lucky Tools</h2>
          <p className="section-copy">
            Pick a tool, reveal a result, and share the fun. Everything here is designed for light entertainment.
          </p>
        </section>

        <section className="content-panel mb-5">
          <h2 className="h3">Start with your own numbers</h2>
          <p>
            Our most popular tools turn the things that are already yours into a lucky number.
            The <Link to="/tools/birthday-lucky-number">Birthday Lucky Number Calculator</Link> adds up
            the digits of your birth date the way numerology does, the{" "}
            <Link to="/tools/lucky-name-calculator">Lucky Name Calculator</Link> turns the letters of
            your name into a number, and the <Link to="/daily">Daily Lucky Number</Link> gives everyone a
            fresh number, color and message each day. Each tool page explains exactly how the math works,
            so you can check it yourself.
          </p>
          <p className="mb-0">
            New to numerology? Read <Link to="/articles/what-your-life-path-number-says-about-you">what
            your life path number says about you</Link> or{" "}
            <Link to="/articles/how-to-find-your-lucky-number-from-your-birthday">how to find your lucky
            number from your birthday</Link>.
          </p>
        </section>

        <section className="row g-4">
          {toolCards.map((tool) => (
            <div className="col-md-6 col-xl-4" key={tool.id}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </section>

        <AdBox label="Advertisement" />

        <section className="content-panel sparkle-bg">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <h2 className="fw-black">More than a quick generator.</h2>
              <p>
                LuckyVibe Daily combines interactive tools, useful explanations,
                and shareable results so every visit feels quick, fun, and worth sharing.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="mini-stats">
                <div><strong>7+</strong><span>Tools</span></div>
                <div><strong>{articles.length}</strong><span>Articles</span></div>
                <div><strong>∞</strong><span>Fun picks</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-panel mt-5">
          <h2 className="h3">Latest articles</h2>
          <ul className="related-links">
            {articles.slice(0, 6).map((a) => (
              <li key={a.slug}><Link to={`/articles/${a.slug}`}>{a.title}</Link></li>
            ))}
          </ul>
          <Link to="/articles" className="btn btn-outline-primary">See all articles</Link>
        </section>

        <section className="content-panel mt-5">
          <h2 className="h3">Fun, with honest odds</h2>
          <p className="mb-0">
            Everything here is for entertainment. Lucky numbers are a tradition, not a prediction. Our{" "}
            <Link to="/tools/lottery-number-generator">lottery number generator</Link> picks numbers at
            random and can't improve anyone's chances, and our <Link to="/odds">odds calculator</Link> and{" "}
            <Link to="/articles/lottery-myths-hot-and-cold-numbers">lottery myths article</Link> show the
            real math.
          </p>
        </section>
      </main>
    </>
  );
}

export default HomePage;
