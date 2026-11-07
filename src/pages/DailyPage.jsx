import { useEffect, useState } from "react";
import AdBox from "../components/AdBox.jsx";
import LuckyOrb from "../components/LuckyOrb.jsx";
import PageHero from "../components/PageHero.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import ConfettiBurst from "../components/ConfettiBurst.jsx";
import { explainDaily, formatInteger, formatReduction, formatShareText, pickRandomItem } from "../utils/luckyUtils.js";
import { luckyColors, luckyMessages } from "../data/toolsData.js";
import MethodPanel, { FactList } from "../components/MethodPanel.jsx";

function DailyPage() {
  const [explained, setExplained] = useState(() => explainDaily(new Date()));
  const [revealedMessage, setRevealedMessage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setExplained(explainDaily(new Date()));
  }, []);

  function revealDailyNumber() {
    setExplained(explainDaily(new Date()));
    setRevealedMessage(pickRandomItem(luckyMessages));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
  }

  const profile = {
    number: explained.number,
    color: explained.color,
    day: explained.weekday,
    message: revealedMessage
  };

  const shareText = formatShareText("My Daily Lucky Number", [
    `Number: ${profile.number}`,
    `Lucky color: ${profile.color}`,
    `Weekday: ${profile.day}`,
    profile.message
  ]);

  return (
    <>
      <PageHero
        title="Daily Lucky Number"
        subtitle="The number and color come from today's date. The message is a random line from a fixed list."
        label="Daily Tool"
      />

      <main className="container py-5">
        <section className="magic-tool-card sparkle-bg position-relative">
          <ConfettiBurst active={showConfetti} />

          <div className="row align-items-center gy-4">
            <div className="col-lg-5 text-center">
              <LuckyOrb number={profile.number} label="Today" animated={Boolean(revealedMessage)} />
            </div>

            <div className="col-lg-7">
              <h2 className="tool-title text-lg-start">Your daily vibe is ready.</h2>
              <p className="tool-subtext text-lg-start">
                The number in the orb is already fixed for this date. Reveal shows the color,
                today's weekday, and one message drawn at random from {luckyMessages.length} lines.
              </p>

              <button className="btn magic-button mb-4" type="button" onClick={revealDailyNumber}>
                Reveal My Number
              </button>

              {revealedMessage && (
                <div className="result-reveal">
                  <h3>{revealedMessage}</h3>
                  <p><strong>Color for this date:</strong> {profile.color}</p>
                  <p className="mb-0"><strong>Weekday on this device:</strong> {profile.day}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {revealedMessage && <ShareButtons text={shareText} />}

        <MethodPanel
          id="daily-method"
          title="How this number was calculated"
          lede="This is a shared daily ritual, not a forecast. Nothing in the seed knows what will happen today."
        >
          <FactList
            rows={[
              {
                label: "Local date",
                value: `${explained.year}-${String(explained.month).padStart(2, "0")}-${String(explained.dayOfMonth).padStart(2, "0")}`
              },
              {
                label: "Seed",
                value: `${explained.year} + ${explained.month} × 17 + ${explained.dayOfMonth} × 31 = ${formatInteger(explained.seed)}`
              },
              {
                label: "Lucky number",
                value: formatReduction(explained.reduction)
              },
              {
                label: "Color",
                value: `${explained.color}. ${formatInteger(explained.seed)} divided by ${luckyColors.length} leaves remainder ${explained.seed % luckyColors.length}, which picks this color from a fixed list. Everyone on this local date gets the same color.`
              },
              {
                label: "Weekday",
                value: `${explained.weekday}. This is the weekday of that date on your device. It is not a second lucky day calculated from numerology.`
              },
              {
                label: "Message",
                value: `Chosen with the browser's random function from ${luckyMessages.length} fixed lines when you press Reveal. It is not part of the date seed, and another click can show a different line.`
              }
            ]}
          />
          <p className="mb-0">
            The clock is the device clock. Near midnight, someone in another time zone can still be on
            yesterday's number. The color list has a fixed order, and the remainder of the seed selects
            one entry. For the personal numbers that do not change every day, use the birthday or name
            calculators.
          </p>
        </MethodPanel>

        <AdBox label="Advertisement" />
      </main>
    </>
  );
}

export default DailyPage;
