import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import LuckyOrb from "../../components/LuckyOrb.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";
import { calculateBirthdayProfile, formatShareText } from "../../utils/luckyUtils.js";

function BirthdayLuckyNumberPage() {
  const [birthday, setBirthday] = useState("1991-07-04");
  const [profile, setProfile] = useState(calculateBirthdayProfile("1991-07-04"));
  const [showConfetti, setShowConfetti] = useState(false);

  function calculate() {
    const result = calculateBirthdayProfile(birthday);
    setProfile(result);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
  }

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
              This calculator reduces the date into a single fun lucky number.
            </p>

            <button className="btn magic-button w-100 mt-3" type="button" onClick={calculate}>
              Calculate
            </button>
          </div>

          <div className="col-lg-7 text-center">
            {profile && (
              <div className="result-reveal">
                <LuckyOrb number={profile.number} label="Birthday Profile" />
                <h2 className="mt-4">{profile.message}</h2>
                <p><strong>Lucky color:</strong> {profile.color}</p>
                <p className="mb-0"><strong>Lucky day:</strong> {profile.day}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {profile && <ShareButtons text={shareText} />}

      <section className="content-panel mt-5">
        <h2>How to use this calculator</h2>
        <p>
          Birthday calculators are interactive, easy to share, and fun for anyone who wants
          a quick personalized result for fun.
        </p>
      </section>

      <AdBox label="Advertisement" />
    </ToolLayout>
  );
}

export default BirthdayLuckyNumberPage;
