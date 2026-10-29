import { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import LuckyOrb from "../../components/LuckyOrb.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";
import { calculateNameProfile, formatShareText } from "../../utils/luckyUtils.js";

function LuckyNamePage() {
  const [name, setName] = useState("Javier");
  const [submittedName, setSubmittedName] = useState("Javier");
  const [profile, setProfile] = useState(calculateNameProfile("Javier"));
  const [showConfetti, setShowConfetti] = useState(false);

  const animatedName = useMemo(() => {
    return submittedName.split("");
  }, [submittedName]);

  function calculate() {
    const result = calculateNameProfile(name);
    setProfile(result);
    setSubmittedName(name.trim());
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
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
              </div>
            )}
          </div>
        </div>
      </section>

      {profile && <ShareButtons text={shareText} />}

      <AdBox label="Advertisement" />
    </ToolLayout>
  );
}

export default LuckyNamePage;
