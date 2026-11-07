import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import AdBox from "../components/AdBox.jsx";
import MethodPanel, { FactList } from "../components/MethodPanel.jsx";
import { calculateSimpleOdds, formatInteger, formatShareText } from "../utils/luckyUtils.js";
import { oddsExamples } from "../data/publishedOdds.js";

function OddsPage() {
  const [totalOptions, setTotalOptions] = useState(100);
  const [winningOptions, setWinningOptions] = useState(1);
  const [activeExample, setActiveExample] = useState("");

  const odds = useMemo(
    () => calculateSimpleOdds(totalOptions, winningOptions),
    [totalOptions, winningOptions]
  );

  function applyExample(example) {
    setTotalOptions(example.total);
    setWinningOptions(example.winners);
    setActiveExample(example.id);
  }

  const shareText = formatShareText("My Odds Calculation", [
    `${odds.winners} winning option(s) out of ${odds.total}`,
    `Chance: ${odds.percent.toFixed(2)}%`,
    `About 1 in ${odds.oneIn}`
  ]);

  return (
    <>
      <PageHero
        title="Simple Odds Calculator"
        subtitle="Explore probability in a simple, visual way."
        label="Educational Tool"
      />

      <main className="container py-5">
        <section className="magic-tool-card">
          <div className="preset-row mb-4" role="group" aria-label="Worked examples">
            {oddsExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                className="btn btn-outline-primary btn-sm"
                aria-pressed={activeExample === example.id}
                onClick={() => applyExample(example)}
              >
                {example.label}
              </button>
            ))}
          </div>
          <div className="row gy-4 align-items-center">
            <div className="col-lg-5">
              <label className="form-label fw-bold" htmlFor="totalOptions">
                Total possible options
              </label>
              <input
                id="totalOptions"
                className="form-control tool-input mb-3"
                type="number"
                min="1"
                value={totalOptions}
                onChange={(event) => {
                  setActiveExample("");
                  setTotalOptions(event.target.value);
                }}
              />

              <label className="form-label fw-bold" htmlFor="winningOptions">
                Winning options
              </label>
              <input
                id="winningOptions"
                className="form-control tool-input"
                type="number"
                min="1"
                value={winningOptions}
                onChange={(event) => {
                  setActiveExample("");
                  setWinningOptions(event.target.value);
                }}
              />
            </div>

            <div className="col-lg-7">
              <div className="result-reveal">
                <h2>Chance: {odds.percent.toFixed(2)}%</h2>
                <p>
                  {odds.dividesEvenly ? "Exactly" : "About"} <strong>1 in {formatInteger(odds.oneIn)}</strong>.
                  The exact count is {formatInteger(odds.winners)} in {formatInteger(odds.total)}.
                </p>
                <p>
                  Odds against, winning outcomes to losing outcomes: {formatInteger(odds.winners)} to {formatInteger(odds.losing)}.
                </p>

                <div className="odds-meter">
                  <div style={{ width: `${Math.min(odds.percent, 100)}%` }}></div>
                </div>

                <p className="small mt-3 mb-0">
                  This tool is a simplified educational calculator and should not be used as financial or gambling advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ShareButtons text={shareText} />

        <MethodPanel
          id="odds-method"
          title="What this screen is counting"
          lede="Chance equals winning outcomes divided by all outcomes. The meter draws that percentage. It does not recommend a bet."
        >
          <FactList
            rows={[
              {
                label: "Formula",
                value: `${formatInteger(odds.winners)} ÷ ${formatInteger(odds.total)} = ${odds.percent.toFixed(2)}%`
              },
              {
                label: "Probability",
                value: odds.dividesEvenly
                  ? `1 in ${formatInteger(odds.oneIn)}, because ${formatInteger(odds.total)} divides evenly by ${formatInteger(odds.winners)}.`
                  : `About 1 in ${formatInteger(odds.oneIn)}, rounded from ${formatInteger(odds.total)} / ${formatInteger(odds.winners)}.`
              },
              {
                label: "Odds against",
                value: `${formatInteger(odds.winners)} to ${formatInteger(odds.losing)}. This compares winning outcomes with losing outcomes, not with all outcomes.`
              }
            ]}
          />
          {oddsExamples.filter((example) => example.id === activeExample).map((example) => (
            <p key={example.id}>
              {example.note}{" "}
              {example.sourceUrl && (
                <a href={example.sourceUrl} target="_blank" rel="noopener noreferrer">{example.sourceLabel}</a>
              )}
            </p>
          ))}
          <p className="mb-0">
            Blank, zero and negative entries are treated as 1, and winning outcomes are capped at the
            total. Past results are not an input. A second ticket in a huge lottery doubles a tiny
            chance and leaves it tiny. This page does not sell tickets.
          </p>
        </MethodPanel>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default OddsPage;
