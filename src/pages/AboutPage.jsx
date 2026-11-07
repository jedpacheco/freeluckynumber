import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

function AboutPage() {
  return (
    <>
      <PageHero
        title="About LuckyVibe Daily"
        subtitle="Small, friendly tools for people who like numbers, a little superstition and an honest answer."
        label="About"
      />

      <main className="container py-5">
        <section className="content-panel">
          <h2>What this site is</h2>
          <p>
            LuckyVibe Daily is a small website of free number tools and plain-English articles. You can
            find a lucky number from your birthday, turn a name into a number, get a fresh daily number,
            spin a wheel when you can't decide where to eat, and read about where ideas like lucky 7 and
            unlucky 13 actually come from.
          </p>
          <p>
            We built it because we like this stuff. Lucky numbers, numerology, zodiac traditions and old
            superstitions are part of how a lot of people have fun, connect with their families and make
            small rituals out of ordinary days. We wanted a place that treats those traditions with
            curiosity, without pretending they're science and without making fun of anyone who enjoys them.
          </p>

          <h2>How we think about luck</h2>
          <p>
            We try to be straight with you. A birthday number or a name number is a tradition, not a
            prediction. Our articles explain what people believe and where those beliefs come from, and we
            say clearly when something is a belief rather than a fact.
          </p>
          <p>
            Lottery numbers get extra care. Our lottery generator picks numbers at random and nothing more.
            No tool, pattern, "hot" number or system can improve your odds of winning a lottery draw, and
            anyone who says otherwise is selling something. When we write about lotteries, we show the real
            odds and explain the math. Please only play with money you can afford to lose, and only if you're
            of legal age where you live.
          </p>

          <h2>How the tools work</h2>
          <p>
            Every tool runs in your browser. We don't need an account, and the birthday or name you type
            is not sent to us.
          </p>
          <p>
            The birthday and name calculators are deterministic. The same date or the same spelling always
            produces the same number, and each page shows the addition so you can redo it. Those numbers
            are numerology traditions. They are not a scientific reading of a person and they do not
            predict what will happen.
          </p>
          <p>
            The daily number and its color are also deterministic, but the input is the date on your
            device rather than something you type. Everyone on that local date gets the same number.
            The weekday shown with it is simply that day's name. The short message that appears when you
            press Reveal is the exception: it is picked at random from a fixed list, so two people can
            share the number and still see different wording.
          </p>
          <p>
            The egg, the decision wheel and the lottery generator do use your browser's random number
            function. A random lottery line has the same chance as any other line in that format. It is
            not a forecast. The formulas, the limits and the sources are written out in{" "}
            <Link to="/methodology">how we check our work</Link>.
          </p>

          <h2>How we write our articles</h2>
          <p>
            Each article is written to answer a real question people ask, like how to calculate a life path
            number or why 13 is considered unlucky. Tradition is labeled as tradition. A historical or
            odds claim that we state as fact is linked to the source we checked. We correct the page when
            a source or a game rule shows we were wrong. If you spot an error, we'd genuinely like to know.
          </p>

          <h2>How the site is paid for</h2>
          <p>
            The tools are free to use. Pages include Google's AdSense script, and the site publishes an
            ads.txt file for that publisher, so Google can fill the marked advertisement areas when its
            systems do. This page does not state an approval or serving status, and an ad is not
            guaranteed to appear. Cookies, the limits of our "Got it" notice, and how to turn off
            personalized ads are in the <Link to="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Get in touch</h2>
          <p>
            Ideas, corrections or a tool that isn't working? Reach us on our <Link to="/contact">Contact page</Link>.
          </p>
        </section>
      </main>
    </>
  );
}

export default AboutPage;
