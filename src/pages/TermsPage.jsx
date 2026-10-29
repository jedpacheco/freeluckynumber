import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        subtitle="Guidelines for using LuckyVibe Daily."
        label="Terms"
      />

      <main className="container py-5">
        <section className="content-panel">
          <p>Last updated October 29, 2026. By using freeluckynumber.com you agree to these terms.</p>

          <h2>Entertainment and learning only</h2>
          <p>
            LuckyVibe Daily provides entertainment and educational tools and articles. Results are
            randomly generated or calculated with simple formulas that we explain on each tool page.
            Lucky numbers, numerology and astrology are traditions and beliefs, not predictions.
          </p>

          <h2>No guarantees and no advice</h2>
          <p>
            The website does not guarantee outcomes, predict lottery or game results, or improve anyone's
            odds. Nothing here is gambling, legal, medical or financial advice. You're responsible for how
            you use the tools, and important decisions should be made with reliable information and your
            own judgment.
          </p>

          <h2>Lottery tools</h2>
          <p>
            Our lottery number generator only produces random numbers in the format of popular games. We
            don't sell tickets or accept bets. Game rules and formats can change, so always check the
            official lottery website for your state. Only play if you're of legal age where you live, and
            if gambling stops being fun, call or text 1-800-GAMBLER in the U.S. for free, confidential help.
          </p>

          <h2>Using the site</h2>
          <p>
            You're welcome to use and share your results for personal, non-commercial purposes. Please don't
            copy our articles in bulk, try to disrupt the site or use automated tools to overload it.
          </p>

          <h2>Accuracy and changes</h2>
          <p>
            We work to keep our articles accurate, but mistakes can happen and information can go out of
            date. We may update tools, articles and these terms at any time. If you spot an error, please
            let us know through our <Link to="/contact">Contact page</Link>.
          </p>

          <h2>Ads and third-party links</h2>
          <p>
            The site shows ads from Google AdSense and may link to other websites. We aren't responsible for
            the content or practices of third-party sites or ads. See our <Link to="/privacy">Privacy Policy</Link>{" "}
            for how advertising cookies work.
          </p>
        </section>
      </main>
    </>
  );
}

export default TermsPage;
