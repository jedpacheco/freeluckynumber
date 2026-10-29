import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import AdBox from "../components/AdBox.jsx";
import { articles } from "../data/articlesData.js";

const groups = [
  { id: "numerology", title: "Numerology and birthday numbers" },
  { id: "zodiac", title: "Zodiac and astrology" },
  { id: "culture", title: "Lucky numbers and superstitions" },
  { id: "odds", title: "Odds, chance and the lottery" },
  { id: "tools", title: "Using random tools" }
];

function ArticlesPage() {
  return (
    <>
      <PageHero
        title="LuckyVibe Articles"
        subtitle="Plain-English reads on numerology, superstitions, zodiac traditions and the real math of chance."
        label="Reading Hub"
      />

      <main className="container py-5">
        {groups.map((g) => {
          const list = articles.filter((a) => a.category === g.id);
          if (!list.length) return null;
          return (
            <section key={g.id} className="mb-5">
              <h2 className="section-title h3 mb-4">{g.title}</h2>
              <div className="row g-4">
                {list.map((article) => (
                  <div className="col-md-6" key={article.slug}>
                    <article className="content-panel h-100 magic-card-hover">
                      <h3 className="h4">{article.title}</h3>
                      <p>{article.summary}</p>
                      <Link className="btn btn-outline-primary" to={`/articles/${article.slug}`}>
                        Read Article
                      </Link>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default ArticlesPage;
