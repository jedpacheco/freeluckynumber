import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

function NotFoundPage() {
  return (
    <>
      <PageHero title="Page Not Found" subtitle="Sorry, we couldn't find that page." label="404" />

      <main className="container py-5">
        <section className="content-panel text-center">
          <p>
            The link may be old, or the address may have a typo. Here are a few places that
            might help:
          </p>
          <ul className="related-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tools/birthday-lucky-number">Birthday Lucky Number Calculator</Link></li>
            <li><Link to="/tools/lucky-name-calculator">Lucky Name Calculator</Link></li>
            <li><Link to="/articles">All articles</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
          <Link to="/" className="btn magic-button mt-3">Return Home</Link>
        </section>
      </main>
    </>
  );
}

export default NotFoundPage;
