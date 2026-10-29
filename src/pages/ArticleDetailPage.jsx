import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import AdBox from "../components/AdBox.jsx";
import { articles } from "../data/articlesData.js";
import RichText from "../components/RichText.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

function ArticleDetailPage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const related = (article.related || [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      <PageHero title={article.title} subtitle={article.summary} label="Article" />

      <main className="container py-5">
        <article className="content-panel article-panel">
          {article.body ? (
            <RichText text={article.body} />
          ) : (
            article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          )}

          {(article.tools?.length > 0 || related.length > 0) && (
            <div className="mt-4">
              <h2 className="h5">Keep exploring</h2>
              <ul className="related-links">
                {(article.tools || []).map((t) => (
                  <li key={t.path}><Link to={t.path}>{t.label}</Link></li>
                ))}
                {related.map((r) => (
                  <li key={r.slug}><Link to={`/articles/${r.slug}`}>{r.title}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/articles" className="btn btn-outline-primary mt-3">
            Back to Articles
          </Link>
        </article>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default ArticleDetailPage;
