import { useEffect, useState } from "react";
import AdBox from "../components/AdBox.jsx";
import LuckyOrb from "../components/LuckyOrb.jsx";
import PageHero from "../components/PageHero.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import ConfettiBurst from "../components/ConfettiBurst.jsx";
import { formatShareText, generateDailyProfile, pickRandomItem } from "../utils/luckyUtils.js";
import { luckyMessages } from "../data/toolsData.js";

function DailyPage() {
  const [profile, setProfile] = useState(generateDailyProfile());
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setProfile(generateDailyProfile());
  }, []);

  function revealDailyNumber() {
    setProfile({
      ...generateDailyProfile(),
      message: pickRandomItem(luckyMessages)
    });

    setRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
  }

  const shareText = formatShareText("My Daily Lucky Number", [
    `Number: ${profile.number}`,
    `Lucky color: ${profile.color}`,
    `Lucky day: ${profile.day}`,
    profile.message
  ]);

  return (
    <>
      <PageHero
        title="Daily Lucky Number"
        subtitle="Reveal a fun number, color, and message for today."
        label="Daily Tool"
      />

      <main className="container py-5">
        <section className="magic-tool-card sparkle-bg position-relative">
          <ConfettiBurst active={showConfetti} />

          <div className="row align-items-center gy-4">
            <div className="col-lg-5 text-center">
              <LuckyOrb number={profile.number} label="Today" animated={revealed} />
            </div>

            <div className="col-lg-7">
              <h2 className="tool-title text-lg-start">Your daily vibe is ready.</h2>
              <p className="tool-subtext text-lg-start">
                Press the button to reveal today’s entertainment-based lucky profile.
              </p>

              <button className="btn magic-button mb-4" type="button" onClick={revealDailyNumber}>
                Reveal My Number
              </button>

              {revealed && (
                <div className="result-reveal">
                  <h3>{profile.message}</h3>
                  <p><strong>Lucky color:</strong> {profile.color}</p>
                  <p className="mb-0"><strong>Lucky day:</strong> {profile.day}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {revealed && <ShareButtons text={shareText} />}

        <section className="content-panel mt-5">
          <h2>How to use this daily result</h2>
          <p>
            This daily tool gives you a quick, positive, shareable result. It is designed for fun,
            not prediction or guaranteed outcomes.
          </p>
        </section>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default DailyPage;
