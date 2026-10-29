import { useMemo, useState } from "react";
import ConfettiBurst from "./ConfettiBurst.jsx";

const presets = {
  Dinner: "Pizza, Burgers, Tacos, Sushi, Pasta",
  Weekend: "Beach day, Movie night, Road trip, Relax at home, Try a new restaurant",
  "Date Night": "Dinner, Bowling, Arcade, Coffee shop, Sunset walk, Mini golf",
  "What to Watch": "Comedy, Action, Drama, Mystery, Documentary, Rewatch a favorite"
};

const wheelColors = [
  "#ff3d7f",
  "#ffd000",
  "#4cc9f0",
  "#7c3cff",
  "#30c67c",
  "#ff8a00",
  "#ff595e",
  "#00c2a8",
  "#5f7cff",
  "#ff66d8"
];

function playTinyTone(type = "spin") {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type === "win" ? "triangle" : "square";
    oscillator.frequency.value = type === "win" ? 720 : 280;
    gain.gain.value = type === "win" ? 0.07 : 0.035;

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    oscillator.frequency.exponentialRampToValueAtTime(
      type === "win" ? 980 : 120,
      context.currentTime + 0.16
    );
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.stop(context.currentTime + 0.2);
  } catch {
    // Optional audio only
  }
}

function DecisionWheel({ onResult }) {
  const [input, setInput] = useState(presets.Dinner);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const options = useMemo(() => {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }, [input]);

  const wheelStyle = useMemo(() => {
    if (options.length === 0) {
      return { background: "#ddd" };
    }

    const segmentSize = 360 / options.length;
    const segments = [];

    for (let i = 0; i < options.length; i++) {
      const start = i * segmentSize;
      const end = start + segmentSize;
      segments.push(`${wheelColors[i % wheelColors.length]} ${start}deg ${end}deg`);
    }

    return {
      background: `conic-gradient(from -90deg, ${segments.join(", ")})`
    };
  }, [options]);

  function spinWheel() {
    if (options.length < 2 || isSpinning) {
      return;
    }

    playTinyTone("spin");

    const winnerIndex = Math.floor(Math.random() * options.length);
    const segmentSize = 360 / options.length;
    const stopAngle = 360 - (winnerIndex * segmentSize + segmentSize / 2);
    const extraSpins = 360 * 8;
    const finalRotation = rotation + extraSpins + stopAngle;

    setIsSpinning(true);
    setSelectedOption("");
    setSelectedIndex(null);
    setShowConfetti(false);
    setRotation(finalRotation);

    setTimeout(() => {
      const winner = options[winnerIndex];
      setSelectedOption(winner);
      setSelectedIndex(winnerIndex);
      setIsSpinning(false);
      setShowConfetti(true);
      playTinyTone("win");

      if (onResult) {
        onResult(`The LuckyVibe Decision Wheel chose: ${winner}`);
      }

      setTimeout(() => setShowConfetti(false), 1800);
    }, 4800);
  }

  function removeWinner() {
    if (!selectedOption) {
      return;
    }

    const updatedOptions = options.filter(
      (option) => option.toLowerCase() !== selectedOption.toLowerCase()
    );

    setInput(updatedOptions.join(", "));
    setSelectedOption("");
    setSelectedIndex(null);
  }

  const segmentSize = options.length ? 360 / options.length : 0;

  return (
    <section className="decision-experience position-relative">
      <ConfettiBurst active={showConfetti} />

      <div className="row g-4 align-items-stretch">
        <div className="col-lg-5">
          <div className="wheel-control-panel h-100">
            <span className="eyebrow text-dark">Build the wheel</span>
            <h2 className="tool-title text-start">Add choices and spin.</h2>
            <p className="tool-subtext text-start">
              Enter options separated by commas. Use it for food, movies, weekend plans,
              date nights, or any light decision that needs a little excitement.
            </p>

            <div className="preset-row mb-3">
              {Object.keys(presets).map((presetName) => (
                <button
                  className="preset-chip"
                  type="button"
                  key={presetName}
                  onClick={() => {
                    setInput(presets[presetName]);
                    setSelectedOption("");
                    setSelectedIndex(null);
                  }}
                >
                  {presetName}
                </button>
              ))}
            </div>

            <textarea
              className="form-control tool-input mb-3"
              rows="5"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Example: Pizza, Burgers, Tacos, Sushi"
            />

            <div className="option-count">
              {options.length} option{options.length === 1 ? "" : "s"} loaded
            </div>

            <div className="segment-list">
              {options.map((option, index) => (
                <div
                  className={selectedIndex === index ? "segment-item active" : "segment-item"}
                  key={`${option}-${index}`}
                >
                  <span
                    className="segment-dot"
                    style={{ backgroundColor: wheelColors[index % wheelColors.length] }}
                  ></span>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="roulette-stage h-100">
            <div className="casino-sign">
              <span>{isSpinning ? "Spinning..." : selectedOption ? "Winner selected" : "Ready to spin"}</span>
            </div>

            <div className="wheel-wrapper premium-wheel-wrapper">
              <div className="wheel-light-ring"></div>
              <div className={isSpinning ? "wheel-pointer pointer-bounce" : "wheel-pointer"}></div>

              <div
                className="decision-wheel premium-wheel"
                style={{
                  ...wheelStyle,
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <div className="wheel-center">
                  <span>LV</span>
                </div>

                {options.map((option, index) => {
                  const angle = index * segmentSize + segmentSize / 2;

                  return (
                    <div
                      key={`${option}-${index}`}
                      className="wheel-label wheel-label-fixed"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px) rotate(${90}deg)`
                      }}
                    >
                      <span>{option.slice(0, 16)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn spin-button"
                onClick={spinWheel}
                disabled={options.length < 2 || isSpinning}
                type="button"
              >
                {isSpinning ? "Wheel is spinning..." : "Spin the Wheel"}
              </button>
            </div>

            {selectedOption && (
              <div className="winner-card mt-4">
                <span className="eyebrow text-dark">The wheel chose</span>
                <p className="winner-text">{selectedOption}</p>

                <button
                  className="btn btn-outline-dark btn-sm mt-2"
                  type="button"
                  onClick={removeWinner}
                >
                  Remove winner and spin again
                </button>
              </div>
            )}

            {options.length < 2 && (
              <p className="text-center text-warning fw-bold mt-3">
                Add at least two options to spin.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DecisionWheel;
