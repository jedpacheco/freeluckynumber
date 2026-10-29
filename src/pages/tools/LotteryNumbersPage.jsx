import { useMemo, useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import ShareButtons from "../../components/ShareButtons.jsx";
import AdBox from "../../components/AdBox.jsx";
import ConfettiBurst from "../../components/ConfettiBurst.jsx";
import { lotteryCategories, lotteryGames } from "../../data/lotteryGames.js";
import { formatShareText, getRandomNumber } from "../../utils/luckyUtils.js";

function generateNumbers({ count, min, max, allowRepeats = false }) {
  const safeCount = Math.max(Number(count) || 1, 1);
  const safeMin = Number(min) || 0;
  const safeMax = Math.max(Number(max) || 9, safeMin);

  if (allowRepeats) {
    return Array.from({ length: safeCount }, () => getRandomNumber(safeMin, safeMax));
  }

  const possibleNumbers = safeMax - safeMin + 1;
  const finalCount = Math.min(safeCount, possibleNumbers);
  const numbers = new Set();

  while (numbers.size < finalCount) {
    numbers.add(getRandomNumber(safeMin, safeMax));
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

function generateTicket(game) {
  const mainNumbers = generateNumbers(game);

  const bonusNumbers = game.bonusLabel
    ? generateNumbers({
        count: game.bonusCount || 1,
        min: game.bonusMin || 1,
        max: game.bonusMax || 9,
        allowRepeats: game.bonusAllowRepeats || false
      })
    : [];

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    gameName: game.name,
    category: game.category,
    numbersLabel: game.numbersLabel,
    mainNumbers,
    bonusLabel: game.bonusLabel,
    bonusNumbers
  };
}

function LotteryNumbersPage() {
  const [category, setCategory] = useState("All");
  const [selectedGameId, setSelectedGameId] = useState("powerball");
  const [ticketCount, setTicketCount] = useState(1);
  const [tickets, setTickets] = useState([generateTicket(lotteryGames[0])]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinKey, setSpinKey] = useState(0);

  const [customGame, setCustomGame] = useState({
    name: "My State Game",
    category: "Custom",
    numbersLabel: "Main Numbers",
    count: 6,
    min: 1,
    max: 49,
    bonusLabel: "",
    bonusCount: 1,
    bonusMin: 1,
    bonusMax: 10
  });

  const visibleGames = useMemo(() => {
    if (category === "All") {
      return lotteryGames;
    }

    return lotteryGames.filter((game) => game.category === category);
  }, [category]);

  const selectedGame = useMemo(() => {
    if (category === "Custom") {
      return {
        ...customGame,
        count: Number(customGame.count),
        min: Number(customGame.min),
        max: Number(customGame.max),
        bonusCount: Number(customGame.bonusCount),
        bonusMin: Number(customGame.bonusMin),
        bonusMax: Number(customGame.bonusMax),
        bonusLabel: customGame.bonusLabel.trim() || null
      };
    }

    return lotteryGames.find((game) => game.id === selectedGameId) || lotteryGames[0];
  }, [category, selectedGameId, customGame]);

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);

    if (newCategory !== "All" && newCategory !== "Custom") {
      const firstGame = lotteryGames.find((game) => game.category === newCategory);
      if (firstGame) {
        setSelectedGameId(firstGame.id);
      }
    }

    if (newCategory === "All") {
      setSelectedGameId("powerball");
    }
  }

  function generateTickets() {
    const amount = Math.min(Math.max(Number(ticketCount) || 1, 1), 10);
    const newTickets = Array.from({ length: amount }, () => generateTicket(selectedGame));

    setTickets(newTickets);
    setSpinKey((previous) => previous + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  }

  const shareText = formatShareText("My LuckyVibe Lottery Numbers", [
    ...tickets.map((ticket, index) => {
      const bonusText = ticket.bonusNumbers.length
        ? ` | ${ticket.bonusLabel}: ${ticket.bonusNumbers.join(", ")}`
        : "";

      return `${index + 1}. ${ticket.gameName}: ${ticket.mainNumbers.join(", ")}${bonusText}`;
    }),
    "Generated for entertainment only."
  ]);

  return (
    <ToolLayout
      title="U.S. Lottery Number Generator"
      subtitle="Choose a popular U.S. lottery format or create a custom state-style number set."
      label="Number Generator"
    >
      <section className="lottery-experience position-relative">
        <ConfettiBurst active={showConfetti} />

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="lottery-control-panel h-100">
              <span className="eyebrow text-dark">Choose a game</span>
              <h2 className="tool-title text-start">Generate lucky picks.</h2>
              <p className="tool-subtext text-start">
                Select a game format and create one or more random number sets for fun.
              </p>

              <label className="form-label fw-bold" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="form-select tool-input mb-3"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                {lotteryCategories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {category !== "Custom" && (
                <>
                  <label className="form-label fw-bold" htmlFor="game">
                    Game
                  </label>
                  <select
                    id="game"
                    className="form-select tool-input mb-3"
                    value={selectedGameId}
                    onChange={(event) => setSelectedGameId(event.target.value)}
                  >
                    {visibleGames.map((game) => (
                      <option value={game.id} key={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <label className="form-label fw-bold" htmlFor="ticketCount">
                Number of tickets
              </label>
              <input
                id="ticketCount"
                className="form-control tool-input mb-3"
                type="number"
                min="1"
                max="10"
                value={ticketCount}
                onChange={(event) => setTicketCount(event.target.value)}
              />

              {category === "Custom" && (
                <div className="custom-game-box">
                  <h3 className="h5 fw-black">Custom Game Builder</h3>

                  <label className="form-label fw-bold" htmlFor="customName">
                    Game name
                  </label>
                  <input
                    id="customName"
                    className="form-control tool-input mb-2"
                    value={customGame.name}
                    onChange={(event) =>
                      setCustomGame({ ...customGame, name: event.target.value })
                    }
                  />

                  <div className="row g-2">
                    <div className="col-4">
                      <label className="form-label fw-bold" htmlFor="customCount">
                        Count
                      </label>
                      <input
                        id="customCount"
                        className="form-control tool-input"
                        type="number"
                        value={customGame.count}
                        onChange={(event) =>
                          setCustomGame({ ...customGame, count: event.target.value })
                        }
                      />
                    </div>

                    <div className="col-4">
                      <label className="form-label fw-bold" htmlFor="customMin">
                        Min
                      </label>
                      <input
                        id="customMin"
                        className="form-control tool-input"
                        type="number"
                        value={customGame.min}
                        onChange={(event) =>
                          setCustomGame({ ...customGame, min: event.target.value })
                        }
                      />
                    </div>

                    <div className="col-4">
                      <label className="form-label fw-bold" htmlFor="customMax">
                        Max
                      </label>
                      <input
                        id="customMax"
                        className="form-control tool-input"
                        type="number"
                        value={customGame.max}
                        onChange={(event) =>
                          setCustomGame({ ...customGame, max: event.target.value })
                        }
                      />
                    </div>
                  </div>

                  <label className="form-label fw-bold mt-2" htmlFor="bonusLabel">
                    Bonus ball label
                  </label>
                  <input
                    id="bonusLabel"
                    className="form-control tool-input mb-2"
                    placeholder="Optional"
                    value={customGame.bonusLabel}
                    onChange={(event) =>
                      setCustomGame({ ...customGame, bonusLabel: event.target.value })
                    }
                  />

                  {customGame.bonusLabel && (
                    <div className="row g-2">
                      <div className="col-4">
                        <label className="form-label fw-bold" htmlFor="bonusCount">
                          Count
                        </label>
                        <input
                          id="bonusCount"
                          className="form-control tool-input"
                          type="number"
                          value={customGame.bonusCount}
                          onChange={(event) =>
                            setCustomGame({ ...customGame, bonusCount: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-4">
                        <label className="form-label fw-bold" htmlFor="bonusMin">
                          Min
                        </label>
                        <input
                          id="bonusMin"
                          className="form-control tool-input"
                          type="number"
                          value={customGame.bonusMin}
                          onChange={(event) =>
                            setCustomGame({ ...customGame, bonusMin: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-4">
                        <label className="form-label fw-bold" htmlFor="bonusMax">
                          Max
                        </label>
                        <input
                          id="bonusMax"
                          className="form-control tool-input"
                          type="number"
                          value={customGame.bonusMax}
                          onChange={(event) =>
                            setCustomGame({ ...customGame, bonusMax: event.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button className="btn magic-button w-100 mt-4" type="button" onClick={generateTickets}>
                Generate Numbers
              </button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="lottery-results-panel h-100">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                <div>
                  <span className="eyebrow">Your picks</span>
                  <h2 className="text-white fw-black mb-0">{selectedGame.name}</h2>
                </div>

                <span className="game-badge">{selectedGame.category}</span>
              </div>

              <div className="ticket-stack" key={spinKey}>
                {tickets.map((ticket, ticketIndex) => (
                  <article className="lottery-ticket" key={ticket.id}>
                    <div className="ticket-heading">
                      <strong>Ticket {ticketIndex + 1}</strong>
                      <span>{ticket.gameName}</span>
                    </div>

                    <div className="number-ball-row justify-content-start">
                      {ticket.mainNumbers.map((number, index) => (
                        <span
                          className="number-ball lottery-ball"
                          style={{ animationDelay: `${index * 0.08}s` }}
                          key={`${ticket.id}-main-${index}`}
                        >
                          {number}
                        </span>
                      ))}

                      {ticket.bonusNumbers.map((number, index) => (
                        <span
                          className="number-ball bonus-ball"
                          style={{ animationDelay: `${(ticket.mainNumbers.length + index) * 0.08}s` }}
                          key={`${ticket.id}-bonus-${index}`}
                          title={ticket.bonusLabel}
                        >
                          {number}
                        </span>
                      ))}
                    </div>

                    {ticket.bonusLabel && (
                      <p className="ticket-note mb-0">
                        Bonus: <strong>{ticket.bonusLabel}</strong>
                      </p>
                    )}
                  </article>
                ))}
              </div>

              <p className="lottery-disclaimer mt-4 mb-0">
                These numbers are randomly generated for entertainment only. They do not improve odds,
                predict results, or guarantee winnings. Always check official lottery rules for your state.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ShareButtons text={shareText} />

      <section className="content-panel mt-5">
        <h2>About this generator</h2>
        <p>
          This tool includes common U.S. lottery-style formats, daily number games,
          Florida games, multi-state games, keno-style picks, and a custom game builder.
          It is built for entertainment and quick number generation.
        </p>
      </section>

      <AdBox />
    </ToolLayout>
  );
}

export default LotteryNumbersPage;
