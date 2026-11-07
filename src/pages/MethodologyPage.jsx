import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { CONTACT_EMAIL } from "./ContactPage.jsx";
import { ODDS_CHECKED, publishedJackpotOdds } from "../data/publishedOdds.js";
import { formatInteger } from "../utils/luckyUtils.js";

function MethodologyPage() {
  return (
    <>
      <PageHero
        title="How we check our work"
        subtitle="What is a tradition, what is arithmetic, and where the cited figures came from."
        label="Methodology"
      />

      <main className="container py-5">
        <section className="content-panel">
          <p>Last updated November 7, 2026, when this page was added.</p>

          <h2>Who writes this</h2>
          <p>
            LuckyVibe Daily is the project site at freeluckynumber.com. The tools and articles are
            written and maintained by the LuckyVibe Daily editorial team. This site does not publish
            named author biographies, credentials, personal stories, testimonials or readership numbers.
          </p>
          <p>
            Corrections go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or the{" "}
            <Link to="/contact">Contact page</Link>. A correction is a change to a calculation, a
            citation or a game rule. It is not a request for a lucky-number reading.
          </p>

          <h2>Two kinds of material</h2>
          <p>
            Some pages describe traditions: numerology, zodiac lists, lucky colors and stories about
            numbers such as 7 and 13. Those passages say what people have believed or practiced. They
            are not evidence that a number causes an event, and they are not a personality test.
          </p>
          <p>
            Other pages are arithmetic you can redo: digit sums, letter values, dice counts and the
            number of combinations in a published lottery matrix. When a page states a researched
            fact or a game's odds, it should link the source. If we cannot point to one, we do not
            state that claim as a fact.
          </p>

          <h2>How the main tools get their results</h2>
          <ul>
            <li>
              <Link to="/tools/birthday-lucky-number">Birthday Lucky Number</Link> adds every digit
              in the date and reduces the total to a single digit from 1 to 9. It does not keep the
              numerology master numbers 11, 22 and 33. September 29, 2000 is the worked contrast:
              the master-number life-path method stays at 22, and this calculator continues to 4.
            </li>
            <li>
              <Link to="/tools/lucky-name-calculator">Lucky Name Calculator</Link> gives A the value
              1 through Z the value 26, skips anything that is not a plain Latin letter, adds the
              values and reduces them to one digit. The final digit matches the Pythagorean 1-to-9
              chart. It is not the Chaldean chart.
            </li>
            <li>
              <Link to="/daily">Daily Lucky Number</Link> builds a seed from the year, month and day
              on the device clock: year + month × 17 + day × 31. The number and color come from that
              seed. The weekday is the device's weekday, not a second lucky day. The short message
              shown after Reveal is chosen at random from a fixed list and can change on each click.
            </li>
            <li>
              The decision wheel, lucky egg and{" "}
              <Link to="/tools/lottery-number-generator">lottery generator</Link> use the browser's
              Math.random. That function is suitable for these toys. It is not a security-grade
              random source, and it does not look at past lottery draws.
            </li>
            <li>
              The <Link to="/odds">odds calculator</Link> divides winning outcomes by total outcomes.
              Presets for dice and for the published Powerball jackpot are there so the arithmetic
              can be checked. They are not betting advice.
            </li>
          </ul>
          <p>
            Nothing you type into a calculator is sent to us. The birthday, name and daily math runs
            in the browser. See the <Link to="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Lottery figures checked on {ODDS_CHECKED}</h2>
          <p>
            These three jackpot figures were read from the operator pages linked below. A game can
            change its matrix. If a linked page disagrees with this list, the operator page is the
            one to trust, and we want the correction. The figures describe a fair draw of that
            matrix. They are not a forecast, and this site does not sell tickets.
          </p>
          <ul>
            {publishedJackpotOdds.map((item) => (
              <li key={item.gameId}>
                {item.label}: 1 in {formatInteger(item.jackpotOdds)} ({item.matrix}).{" "}
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceLabel}</a>.
              </li>
            ))}
          </ul>

          <h2>Advertising and the cookie notice</h2>
          <p>
            Pages load Google's AdSense script, and the site publishes an ads.txt file for that
            publisher. Marked advertisement areas are reserved for ads Google may fill. This page
            does not state an approval status, and it does not promise that an ad will appear.
          </p>
          <p>
            The "Got it" notice stores a dismissal in this browser's local storage. It is not a
            Google-certified consent management platform, and choosing it is not a record of consent
            or refusal for personalized ads. The requirement for visitors in the EEA, the UK and
            Switzerland is described in the <Link to="/privacy">Privacy Policy</Link>.
          </p>

          <h2>What we will not add</h2>
          <p>
            We do not invent experts, quotations, review dates, star ratings or a claim that a tool
            improves the chance of winning a game. A numerology description can stay on the site
            when it is labeled as a tradition. A probability claim stays only when the counting can
            be repeated or the operator's page is linked.
          </p>
        </section>
      </main>
    </>
  );
}

export default MethodologyPage;
