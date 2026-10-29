import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";

const luckyPhrases = [
  "A good surprise may find you soon.",
  "Today feels right for a fresh start.",
  "Trust your instincts and keep moving.",
  "A small win can lead to a bigger one.",
  "Your next idea could be a lucky one.",
  "A calm decision may bring the best result.",
  "An unexpected opportunity may open up.",
  "Good energy follows bold action."
];

function LuckyEggPage() {
  const [isCracked, setIsCracked] = useState(false);
  const [phrase, setPhrase] = useState(luckyPhrases[0]);
  const [showConfetti, setShowConfetti] = useState(false);

  function crackEgg() {
    const randomPhrase = luckyPhrases[Math.floor(Math.random() * luckyPhrases.length)];
    setPhrase(randomPhrase);
    setIsCracked(true);
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 1500);
  }

  function resetEgg() {
    setIsCracked(false);
  }

  const shareText = `My LuckyVibe Egg Reveal:\n${phrase}\nOpened on LuckyVibe Daily.`;

  return (
    <ToolLayout
      title="Crack the Lucky Egg"
      subtitle="Tap the egg, crack it open, and reveal a lucky phrase."
      label="Interactive Reveal"
    >
      <section className="egg-experience position-relative">
        <ConfettiBurst active={showConfetti} />

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="egg-control-panel h-100">
              <span className="eyebrow text-dark">Interactive surprise</span>
              <h2 className="tool-title text-start">Break the egg and reveal your phrase.</h2>
              <p className="tool-subtext text-start">
                This tool is built just for fun. Click the egg to reveal a lucky phrase you can share.
              </p>

              <ul className="egg-steps">
                <li>Tap the egg.</li>
                <li>Reveal a lucky phrase.</li>
                <li>Share it by email, text, or copy.</li>
              </ul>

              {!isCracked ? (
                <button className="btn magic-button w-100 mt-3" type="button" onClick={crackEgg}>
                  Crack the Egg
                </button>
              ) : (
                <button className="btn btn-outline-dark w-100 mt-3" type="button" onClick={resetEgg}>
                  Try Another Egg
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="egg-stage h-100">
              <div className="egg-scene">
                {!isCracked ? (
                  <button className="egg-shell whole-egg" type="button" onClick={crackEgg} aria-label="Crack the lucky egg">
                    <span className="egg-shine"></span>
                  </button>
                ) : (
                  <div className="cracked-egg-wrap">
                    <div className="egg-half egg-top"></div>
                    <div className="egg-half egg-bottom"></div>
                    <div className="egg-glow"></div>
                  </div>
                )}
              </div>

              <div className="egg-result-card">
                <span className="eyebrow text-dark">Lucky phrase</span>
                <h3>{isCracked ? phrase : "Your message is waiting inside."}</h3>
                <p className="mb-0">
                  {isCracked
                    ? "Crack another egg any time for a new phrase."
                    : "Press the button or click the egg to reveal a phrase."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCracked && <ShareButtons text={shareText} />}

      <section className="content-panel mt-5">
        <h2>Why people enjoy this tool</h2>
        <p>
          Reveal tools create a short moment of suspense, motion, and surprise. They are quick,
          playful, and easy to share.
        </p>
      </section>

      <AdBox />
    </ToolLayout>
  );
}

export default LuckyEggPage;
