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
            Every tool runs right in your browser. The birthday and name calculators use simple, traditional
            digit-sum methods, which we explain on each tool page so you can check the math yourself. The
            daily number, egg, wheel and generators use your browser's random number function. We don't
            need an account, and the things you type in aren't sent to us.
          </p>

          <h2>How we write our articles</h2>
          <p>
            Each article is written to answer a real question people ask, like how to calculate a life path
            number or why 13 is considered unlucky. We read up on the history and the math, write it out in
            normal language and go back to correct it when we learn we got something wrong. If you spot an
            error, we'd genuinely like to know.
          </p>

          <h2>How the site is paid for</h2>
          <p>
            The tools are free. To cover hosting and the time it takes to build and write, we show ads from
            Google AdSense. You can read how that works, and how to turn off personalized ads, in our{" "}
            <Link to="/privacy">Privacy Policy</Link>.
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
