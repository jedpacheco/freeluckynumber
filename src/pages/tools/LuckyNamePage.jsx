import { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import LuckyOrb from "../../components/LuckyOrb.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";
import { explainName, formatReduction, formatShareText } from "../../utils/luckyUtils.js";
import MethodPanel from "../../components/MethodPanel.jsx";
import { Link } from "react-router-dom";

function LuckyNamePage() {
  const [name, setName] = useState("Javier");
  const [submittedName, setSubmittedName] = useState("Javier");
  const [explained, setExplained] = useState(explainName("Javier"));
  const [showConfetti, setShowConfetti] = useState(false);
  const profile = explained?.profile || null;

  const animatedName = useMemo(() => {
    return submittedName.split("");
  }, [submittedName]);

  function calculate() {
    const result = explainName(name);
    setExplained(result);
    setSubmittedName(name.trim());
    if (result) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1600);
    }
  }

  const shareText = profile
    ? formatShareText("My Lucky Name Result", [
        `Name: ${submittedName}`,
        `Lucky number: ${profile.number}`,
        `Lucky color: ${profile.color}`,
        profile.message
      ])
    : "I used the Lucky Name Calculator on LuckyVibe Daily.";

  return (
    <ToolLayout
      title="Lucky Name Calculator"
      subtitle="Enter a name and reveal a fun lucky number profile."
      label="Name Tool"
    >
      <section className="magic-tool-card sparkle-bg position-relative">
        <ConfettiBurst active={showConfetti} />

        <div className="row gy-4 align-items-center">
          <div className="col-lg-5">
            <label className="form-label fw-bold" htmlFor="name">
              Enter a name
            </label>
            <input
              id="name"
              className="form-control tool-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter a name"
            />

            <button className="btn magic-button w-100 mt-4" type="button" onClick={calculate}>
              Reveal Name Vibe
            </button>
          </div>

          <div className="col-lg-7 text-center">
            {profile && (
              <div className="result-reveal">
                <div className="animated-name mb-3">
                  {animatedName.map((letter, index) => (
                    <span style={{ animationDelay: `${index * 0.05}s` }} key={`${letter}-${index}`}>
                      {letter}
                    </span>
                  ))}
                </div>

                <LuckyOrb number={profile.number} label="Name Number" />
                <h2 className="mt-4">{profile.message}</h2>
                <p className="mb-0"><strong>Lucky color:</strong> {profile.color}</p>
                <p className="small mt-3 mb-0">
                  The message and color are labels for the digit. They are not a reading of the person.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {profile && <ShareButtons text={shareText} />}

      {explained && (
        <MethodPanel
          id="name-method"
          title="How this name became a number"
          lede="A is 1 and Z is 26. Spaces, hyphens and apostrophes are skipped. Any other character is skipped too, which matters for accented letters."
        >
          {explained.letters.length > 0 ? (
            <div className="table-responsive">
              <table className="letter-table">
                <caption className="visually-hidden">Letter values for {submittedName}</caption>
                <thead>
                  <tr>
                    <th scope="col">Letter</th>
                    <th scope="col">Alphabet place</th>
                    <th scope="col">1–9 value</th>
                  </tr>
                </thead>
                <tbody>
                  {explained.letters.map((letter, index) => (
                    <tr key={`${letter.char}-${index}`}>
                      <th scope="row">{letter.char.toUpperCase()}</th>
                      <td>{letter.position}</td>
                      <td>{letter.pythagorean}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>This entry has no letters from A to Z, so the total is 0 and the calculator shows 1.</p>
          )}
          <p>
            Alphabet-place total: {explained.total}. Reduced: {formatReduction(explained.reduction)}.
            The 1–9 column is the Pythagorean chart (the same place value reduced to one digit, with 9
            staying 9). Its total is {explained.pythagoreanTotal}, and reducing that total lands on the
            same final digit. The Chaldean chart is a different system.{" "}
            <Link to="/articles/name-numerology-letters-to-numbers">Name numerology</Link> compares them.
          </p>
          {explained.skipped.length > 0 && (
            <p>Skipped characters: {explained.skipped.join(", ")}.</p>
          )}
          <p className="mb-0">
            A different spelling is a different total. The calculator does not know which spelling is
            a legal name, and it does not describe the person.
          </p>
        </MethodPanel>
      )}

      {!explained && (
        <MethodPanel id="name-method" title="How this name became a number">
          <p className="mb-0">Type a name, then reveal it. A blank name has no result.</p>
        </MethodPanel>
      )}

      <AdBox label="Advertisement" />
    </ToolLayout>
  );
}

export default LuckyNamePage;
