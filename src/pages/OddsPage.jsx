import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import AdBox from "../components/AdBox.jsx";
import { formatShareText } from "../utils/luckyUtils.js";

function OddsPage() {
  const [totalOptions, setTotalOptions] = useState(100);
  const [winningOptions, setWinningOptions] = useState(1);

  const odds = useMemo(() => {
    const total = Math.max(Number(totalOptions) || 1, 1);
    const winners = Math.min(Math.max(Number(winningOptions) || 1, 1), total);
    const percent = (winners / total) * 100;

    return {
      total,
      winners,
      percent,
      oneIn: Math.round(total / winners)
    };
  }, [totalOptions, winningOptions]);

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
                onChange={(event) => setTotalOptions(event.target.value)}
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
                onChange={(event) => setWinningOptions(event.target.value)}
              />
            </div>

            <div className="col-lg-7">
              <div className="result-reveal">
                <h2>Chance: {odds.percent.toFixed(2)}%</h2>
                <p>
                  This is about <strong>1 in {odds.oneIn}</strong>.
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

        <section className="content-panel mt-5">
          <h2>Why this is useful</h2>
          <p>
            Odds can be difficult to understand. This tool gives a simple visual explanation
            so they can better understand probability in everyday examples.
          </p>
        </section>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default OddsPage;
