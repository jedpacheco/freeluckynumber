import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import ToolCard from "../components/ToolCard.jsx";
import AdBox from "../components/AdBox.jsx";
import { toolCards } from "../data/toolsData.js";

function GeneratorsPage() {
  const generatorTools = toolCards.filter((tool) =>
    ["Calculator", "Fun", "Interactive", "Generator"].includes(tool.badge)
  );

  return (
    <>
      <PageHero
        title="Lucky Generators"
        subtitle="Choose a tool and create a fun result in seconds."
        label="Generator Hub"
      />

      <main className="container py-5">
        <div className="row g-4">
          {generatorTools.map((tool) => (
            <div className="col-md-6 col-xl-4" key={tool.id}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>

        <section className="content-panel mt-5">
          <h2 className="h4">Which tool should I try?</h2>
          <p>
            If you want a number that's personal to you, start with the{" "}
            <Link to="/tools/birthday-lucky-number">Birthday Lucky Number Calculator</Link>, which adds up
            the digits of your birth date the way numerology does, or the{" "}
            <Link to="/tools/lucky-name-calculator">Lucky Name Calculator</Link>, which turns the letters of
            a name into a number. For a quick daily ritual, the <Link to="/daily">Daily Lucky Number</Link>{" "}
            gives everyone the same fresh number and message each day.
          </p>
          <p>
            Stuck on a small choice? The <Link to="/tools/random-decision-picker">Random Decision Picker</Link>{" "}
            spins a wheel to choose between your options. For a little pick-me-up,{" "}
            <Link to="/tools/lucky-egg-reveal">Crack the Lucky Egg</Link> reveals a random lucky phrase.
          </p>
          <p className="mb-0">
            The <Link to="/tools/lottery-number-generator">Lottery Number Generator</Link> creates random
            number sets in popular U.S. game formats. It's for fun only and can't improve anyone's odds. Our{" "}
            <Link to="/odds">Simple Odds Calculator</Link> and the article on{" "}
            <Link to="/articles/lottery-myths-hot-and-cold-numbers">lottery myths</Link> explain why.
            Every tool runs in your browser, and nothing you type is sent to us.
          </p>
        </section>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default GeneratorsPage;
