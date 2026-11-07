// Jackpot odds checked against the operator pages on 2026-11-07.
// Tests recompute the integers from the generator's matrix. If an operator changes
// a game, update the source page and these figures together.
export const ODDS_CHECKED = "2026-11-07";

export const publishedJackpotOdds = [
  {
    gameId: "powerball",
    label: "Powerball",
    jackpotOdds: 292201338,
    matrix: "5 numbers from 1 to 69, plus 1 Powerball from 1 to 26",
    extra:
      "The same chart lists the overall chance of winning any prize as 1 in 24.87 for a $2 play, rounded to two decimal places. That figure includes the small prizes.",
    sourceUrl: "https://www.powerball.com/powerball-prize-chart",
    sourceLabel: "Powerball prize chart"
  },
  {
    gameId: "mega-millions",
    label: "Mega Millions",
    jackpotOdds: 290472336,
    matrix: "5 numbers from 1 to 70, plus 1 Mega Ball from 1 to 24",
    extra:
      "This is the jackpot figure on the Mega Millions how-to-play page for the current matrix. Do not use older 25-ball Mega Ball write-ups in its place.",
    sourceUrl: "https://www.megamillions.com/how-to-play/",
    sourceLabel: "Mega Millions how to play"
  },
  {
    gameId: "florida-lotto",
    label: "Florida Lotto",
    jackpotOdds: 22957480,
    matrix: "6 numbers from 1 to 53",
    extra:
      "The Florida Lottery odds sheet calculates 53 choose 6 as 22,957,480 and gives the chance of matching all six as 1 in 22,957,480.",
    sourceUrl: "https://floridalottery.com/content/dam/flalottery-web/files/game-reports/florida-lotto/lottoodds.pdf",
    sourceLabel: "Florida Lottery LOTTO odds sheet"
  }
];

export function publishedOddsFor(gameId) {
  return publishedJackpotOdds.find((item) => item.gameId === gameId) || null;
}

export const oddsExamples = [
  {
    id: "coin",
    label: "Fair coin, one face",
    total: 2,
    winners: 1,
    note: "One winning face out of two. Probability 1 in 2. Odds against are 1 to 1."
  },
  {
    id: "die",
    label: "One face of a die",
    total: 6,
    winners: 1,
    note: "A fair six-sided die has one winning face and five losing faces."
  },
  {
    id: "dice-7",
    label: "Two dice total 7",
    total: 36,
    winners: 6,
    note: "Of the 36 ordered rolls, six sum to 7: 1+6, 2+5, 3+4, 4+3, 5+2 and 6+1."
  },
  {
    id: "powerball",
    label: "Powerball jackpot, one play",
    total: 292201338,
    winners: 1,
    note: "The published chance that one Powerball play matches the jackpot. It is not a suggestion to buy a ticket.",
    sourceUrl: "https://www.powerball.com/powerball-prize-chart",
    sourceLabel: "Powerball prize chart"
  }
];
