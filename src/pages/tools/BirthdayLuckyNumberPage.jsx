import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import LuckyOrb from "../../components/LuckyOrb.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";
import { explainBirthday, formatReduction, formatShareText, lifePathKeepingMasters } from "../../utils/luckyUtils.js";
import MethodPanel, { FactList } from "../../components/MethodPanel.jsx";
import { Link } from "react-router-dom";

function BirthdayLuckyNumberPage() {
  const [birthday, setBirthday] = useState("1991-07-04");
  const [explained, setExplained] = useState(explainBirthday("1991-07-04"));
  const [showConfetti, setShowConfetti] = useState(false);

  function calculate() {
    const result = explainBirthday(birthday);
    setExplained(result);
    if (result) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1600);
    }
  }

  const profile = explained?.profile || null;
  const lifePath = explained ? lifePathKeepingMasters(explained.dateValue) : null;

  const shareText = profile
    ? formatShareText("My Birthday Lucky Number", [
        `Number: ${profile.number}`,
        `Lucky color: ${profile.color}`,
        `Lucky day: ${profile.day}`,
        profile.message
      ])
    : "I used the Birthday Lucky Number Calculator on LuckyVibe Daily.";

  return (
    <ToolLayout
      title="Birthday Lucky Number Calculator"
      subtitle="Turn a birthday into a playful lucky profile."
      label="Calculator"
    >
      <section className="magic-tool-card sparkle-bg position-relative">
        <ConfettiBurst active={showConfetti} />

        <div className="row gy-4">
          <div className="col-lg-5">
            <label className="form-label fw-bold" htmlFor="birthday">
              Enter a birthday
            </label>
            <input
              id="birthday"
              className="form-control tool-input"
              type="date"
              value={birthday}
              onChange={(event) => setBirthday(event.target.value)}
            />

            <p className="tool-subtext text-start mt-4">
              Adds every digit in the date and reduces the total to 1–9. This is a numerology
              tradition, not a personality test or a prediction.
            </p>

            <button className="btn magic-button w-100 mt-3" type="button" onClick={calculate}>
              Calculate
            </button>
          </div>

          <div className="col-lg-7 text-center">
            {profile ? (
              <div className="result-reveal">
                <LuckyOrb number={profile.number} label="Birthday Profile" />
                <h2 className="mt-4">{profile.message}</h2>
                <p><strong>Lucky color:</strong> {profile.color}</p>
                <p className="mb-0"><strong>Lucky day:</strong> {profile.day}</p>
                <p className="small mt-3 mb-0">
                  The sentence, color and day are labels stored for digits 1 through 9. They are
                  traditional wording, not a measurement.
                </p>
              </div>
            ) : (
              <p className="tool-subtext">Enter a real calendar date, then calculate.</p>
            )}
          </div>
        </div>
      </section>

      {profile && <ShareButtons text={shareText} />}

      {explained && (
        <MethodPanel
          id="birthday-method"
          title="How this number was calculated"
          lede="The calculator always ends on a single digit. It does not keep 11, 22 or 33."
        >
          <FactList
            rows={[
              { label: "Date", value: explained.dateValue },
              { label: "Digits", value: explained.digits.join(", ") },
              { label: "Sum", value: String(explained.total) },
              { label: "Reduce", value: formatReduction(explained.reduction) },
              {
                label: "Life-path contrast",
                value: lifePath.differs
                  ? `Keeping master numbers gives ${lifePath.total} (month ${lifePath.month}, day ${lifePath.day}, year ${lifePath.year}). This calculator continues to ${profile.number}.`
                  : `The master-number life-path method also ends on ${lifePath.total} for this date (month ${lifePath.month}, day ${lifePath.day}, year ${lifePath.year}).`
              }
            ]}
          />
          <p>
            September 29, 2000 is a date where the methods disagree. Month 9, day 2+9 = 11 and year 2
            add to 22, which the master-number method keeps. The digit string 2, 0, 0, 0, 0, 9, 2, 9
            sums to 22 and this calculator reduces it to 4. Both are traditions. The{" "}
            <Link to="/articles/what-your-life-path-number-says-about-you">life path article</Link>{" "}
            walks through the three-part method.
          </p>
          <p className="mb-0">
            Using the number on a lottery ticket does not change the chance that the ticket wins.
          </p>
        </MethodPanel>
      )}

      <AdBox label="Advertisement" />
    </ToolLayout>
  );
}

export default BirthdayLuckyNumberPage;
