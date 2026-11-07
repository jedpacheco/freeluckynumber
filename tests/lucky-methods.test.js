import test from "node:test";
import assert from "node:assert/strict";
import { lotteryGames } from "../src/data/lotteryGames.js";
import { luckyColors, luckyMessages } from "../src/data/toolsData.js";
import { publishedJackpotOdds } from "../src/data/publishedOdds.js";
import {
  calculateBirthdayProfile,
  calculateNameProfile,
  calculateSimpleOdds,
  combinationCount,
  describeDrawFormat,
  explainBirthday,
  explainDaily,
  explainName,
  formatReduction,
  generateDailyProfile,
  generateLotteryNumbers,
  getRandomNumber,
  lifePathKeepingMasters,
  reduceToSingleDigit
} from "../src/utils/luckyUtils.js";

test("digit reduction matches the published birthday example and does not keep master numbers", () => {
  assert.equal(reduceToSingleDigit(31), 4);
  assert.equal(reduceToSingleDigit(11), 2);
  assert.equal(reduceToSingleDigit(22), 4);
  assert.equal(reduceToSingleDigit(33), 6);
  assert.equal(reduceToSingleDigit(0), 1);
  assert.equal(reduceToSingleDigit(-29), 2);
  assert.equal(formatReduction({ steps: [31, 4], final: 4 }), "31 → 3 + 1 = 4");
  assert.equal(formatReduction({ steps: [0], final: 1 }), "0 is shown as 1 so the result stays in the range 1 to 9");

  const july4 = explainBirthday("1991-07-04");
  assert.deepEqual(july4.digits, [1, 9, 9, 1, 0, 7, 0, 4]);
  assert.equal(july4.total, 31);
  assert.equal(july4.profile.number, 4);
  assert.equal(calculateBirthdayProfile("1991-07-04").number, 4);
  assert.equal(lifePathKeepingMasters("1991-07-04").differs, false);

  const contrast = explainBirthday("2000-09-29");
  const masters = lifePathKeepingMasters("2000-09-29");
  assert.equal(contrast.total, 22);
  assert.equal(contrast.profile.number, 4);
  assert.equal(masters.total, 22);
  assert.equal(masters.month, 9);
  assert.equal(masters.day, 11);
  assert.equal(masters.year, 2);
  assert.equal(masters.differs, true);
});

test("birthday explanation rejects dates that are not real calendar days", () => {
  assert.equal(explainBirthday(""), null);
  assert.equal(explainBirthday("1991-02-31"), null);
  assert.equal(explainBirthday("July 4, 1991"), null);
  assert.equal(calculateBirthdayProfile(""), null);
});

test("name values use alphabet place, skip accents, and match the Pythagorean final digit", () => {
  const ana = explainName("ANA");
  assert.deepEqual(ana.letters.map((letter) => letter.position), [1, 14, 1]);
  assert.deepEqual(ana.letters.map((letter) => letter.pythagorean), [1, 5, 1]);
  assert.equal(ana.total, 16);
  assert.equal(ana.profile.number, 7);
  assert.equal(calculateNameProfile("ana").number, 7);

  const javier = explainName("Javier");
  assert.equal(javier.letters[0].position, 10);
  assert.equal(javier.total, 65);
  assert.equal(javier.profile.number, 2);
  assert.equal(javier.reduction.final, reduceToSingleDigit(javier.pythagoreanTotal));

  const accented = explainName("José");
  assert.deepEqual(accented.letters.map((letter) => letter.char), ["j", "o", "s"]);
  assert.ok(accented.skipped.includes("é"));
  assert.equal(accented.total, 44);
  assert.equal(accented.profile.number, 8);

  const noLetters = explainName("123");
  assert.equal(noLetters.letters.length, 0);
  assert.equal(noLetters.total, 0);
  assert.equal(noLetters.profile.number, 1);
  assert.equal(explainName("   "), null);
  assert.equal(calculateNameProfile(""), null);
});

test("the daily profile is deterministic for a date and does not call Math.random", () => {
  const date = new Date(2026, 10, 7, 15, 30, 0);
  assert.equal(date.getDay(), 6);
  const explained = explainDaily(date);
  assert.equal(explained.year, 2026);
  assert.equal(explained.month, 11);
  assert.equal(explained.dayOfMonth, 7);
  assert.equal(explained.seed, 2026 + 11 * 17 + 7 * 31);
  assert.equal(explained.seed, 2430);
  assert.equal(explained.number, 9);
  assert.equal(explained.color, luckyColors[0]);
  assert.equal(explained.weekday, "Saturday");
  assert.deepEqual(generateDailyProfile(date), generateDailyProfile(date));

  const original = Math.random;
  Math.random = () => {
    throw new Error("daily profile must not use Math.random");
  };
  try {
    generateDailyProfile(date);
    calculateBirthdayProfile("1991-07-04");
    calculateNameProfile("Javier");
  } finally {
    Math.random = original;
  }
});

test("random helpers still use Math.random and stay inside the requested range", () => {
  const original = Math.random;
  const draws = [0, 0.999999, 0, 0.1, 0.2];
  Math.random = () => draws.shift();
  try {
    assert.equal(getRandomNumber(1, 59), 1);
    assert.equal(getRandomNumber(1, 59), 59);
    const picks = generateLotteryNumbers(3, 10);
    assert.deepEqual(picks, [1, 2, 3]);
  } finally {
    Math.random = original;
  }
  assert.equal(luckyMessages.length, 8);
});

test("simple odds keep the old clamping rules and distinguish a rounded 1-in figure", () => {
  const die = calculateSimpleOdds(6, 1);
  assert.equal(die.percent.toFixed(2), "16.67");
  assert.equal(die.oneIn, 6);
  assert.equal(die.losing, 5);
  assert.equal(die.dividesEvenly, true);

  const seven = calculateSimpleOdds(36, 6);
  assert.equal(seven.oneIn, 6);
  assert.equal(seven.dividesEvenly, true);

  const rounded = calculateSimpleOdds(5, 2);
  assert.equal(rounded.oneIn, 3);
  assert.equal(rounded.dividesEvenly, false);
  assert.equal(rounded.losing, 3);

  assert.deepEqual(
    [calculateSimpleOdds("", 0).total, calculateSimpleOdds("", 0).winners],
    [1, 1]
  );
  assert.equal(calculateSimpleOdds(-4, 10).total, 1);
  assert.equal(calculateSimpleOdds(10, 50).winners, 10);

  const powerball = calculateSimpleOdds(292201338, 1);
  assert.equal(powerball.oneIn, 292201338);
  assert.equal((powerball.percent).toFixed(8), "0.00000034");
});

test("published jackpot odds match the combination count of the generator matrix", () => {
  assert.equal((69 * 68 * 67 * 66 * 65) / (5 * 4 * 3 * 2 * 1), 11238513);
  assert.equal(combinationCount(69, 5), 11238513);
  assert.equal(11238513 * 26, 292201338);
  assert.equal(combinationCount(70, 5) * 24, 290472336);
  assert.equal((53 * 52 * 51 * 50 * 49 * 48) / (6 * 5 * 4 * 3 * 2 * 1), 22957480);
  assert.equal(combinationCount(53, 6), 22957480);

  const seconds = 292201338;
  assert.ok(Math.abs(seconds / 86400 - 3381.96) < 0.005);
  assert.ok(Math.abs(seconds / 86400 / 365.25 - 9.26) < 0.005);

  for (const item of publishedJackpotOdds) {
    const game = lotteryGames.find((entry) => entry.id === item.gameId);
    const format = describeDrawFormat(game);
    assert.equal(format.lines, item.jackpotOdds, item.gameId);
  }

  const pick3 = lotteryGames.find((game) => game.id === "florida-pick-3");
  assert.equal(describeDrawFormat(pick3).lines, 1000);
  assert.equal(describeDrawFormat(pick3).kind, "ordered-with-repeats");

  const keno = describeDrawFormat(lotteryGames.find((game) => game.id === "keno-10"));
  assert.equal(keno.kind, "combination");
  assert.equal(keno.lines, combinationCount(80, 10));
  assert.notEqual(keno.lines, publishedJackpotOdds.find((item) => item.gameId === "powerball").jackpotOdds);

  assert.equal(describeDrawFormat({ count: 6, min: 1, max: 5, allowRepeats: false }), null);
  assert.equal(combinationCount(5, 6), null);
});
