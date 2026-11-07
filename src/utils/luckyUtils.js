import { luckyColors, luckyDays, luckyMessages } from "../data/toolsData.js";

// JavaScript's getDay() is 0 for Sunday. The luckyDays list is a separate Monday-first
// label list used by the birthday and name numerology profiles, so it is not reused here.
const civilWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandomItem(items) {
  const index = getRandomNumber(0, items.length - 1);
  return items[index];
}

export function reduceToSingleDigit(number) {
  let value = Math.abs(Number(number));

  while (value > 9) {
    value = value
      .toString()
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }

  return value || 1;
}

export function calculateBirthdayProfile(dateValue) {
  if (!dateValue) {
    return null;
  }

  const digitsOnly = dateValue.replaceAll("-", "");
  const total = digitsOnly
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const luckyNumber = reduceToSingleDigit(total);
  const color = luckyColors[luckyNumber % luckyColors.length];
  const day = luckyDays[luckyNumber % luckyDays.length];

  const personality = {
    1: "You are independent, bold, and ready to lead.",
    2: "You are balanced, thoughtful, and connected to others.",
    3: "You are creative, expressive, and full of bright ideas.",
    4: "You are focused, practical, and steady.",
    5: "You are adventurous, flexible, and open to change.",
    6: "You are caring, loyal, and protective of what matters.",
    7: "You are curious, reflective, and naturally observant.",
    8: "You are ambitious, confident, and goal-oriented.",
    9: "You are generous, wise, and inspired by bigger dreams."
  };

  return {
    number: luckyNumber,
    color,
    day,
    message: personality[luckyNumber]
  };
}

export function calculateNameProfile(name) {
  const cleanName = name.trim().toLowerCase();

  if (!cleanName) {
    return null;
  }

  const total = cleanName
    .split("")
    .filter((char) => char >= "a" && char <= "z")
    .reduce((sum, char) => sum + char.charCodeAt(0) - 96, 0);

  const luckyNumber = reduceToSingleDigit(total);
  const message = luckyMessages[luckyNumber % luckyMessages.length];
  const color = luckyColors[(luckyNumber + cleanName.length) % luckyColors.length];

  return {
    number: luckyNumber,
    color,
    message
  };
}

// Date-seeded daily profile. The number, color and weekday do not use Math.random.
// Pass a Date to test a specific local calendar day. The default is "now" on the device.
export function explainDaily(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const seed = year + month * 17 + dayOfMonth * 31;
  const reduction = reductionSteps(seed);
  const number = reduceToSingleDigit(seed);
  const color = luckyColors[seed % luckyColors.length];
  const weekday = civilWeekdays[date.getDay()];

  return {
    year,
    month,
    dayOfMonth,
    seed,
    reduction,
    number,
    color,
    weekday,
    dateMessage: luckyMessages[seed % luckyMessages.length]
  };
}

export function generateDailyProfile(date = new Date()) {
  const explained = explainDaily(date);

  return {
    number: explained.number,
    color: explained.color,
    day: explained.weekday,
    message: explained.dateMessage
  };
}

export function generateLotteryNumbers(count = 6, max = 59) {
  const numbers = new Set();

  while (numbers.size < count) {
    numbers.add(getRandomNumber(1, max));
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

export function formatShareText(title, lines) {
  return `${title}\n${lines.filter(Boolean).join("\n")}\nGenerated for fun on LuckyVibe Daily.`;
}

export function formatInteger(value) {
  const sign = value < 0 ? "-" : "";
  return sign + String(Math.abs(Math.trunc(value))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Steps of the same digit-sum used by reduceToSingleDigit, for a non-negative integer.
// A total of 0 is reported as final 1, matching reduceToSingleDigit(0).
export function reductionSteps(number) {
  let value = Math.abs(Math.trunc(Number(number)));
  if (!Number.isFinite(value)) return null;

  const steps = [value];
  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
    steps.push(value);
  }

  return { steps, final: value || 1 };
}

export function formatReduction(reduction) {
  if (!reduction) return "";
  if (reduction.steps.length === 1) {
    if (reduction.steps[0] === 0 && reduction.final === 1) {
      return "0 is shown as 1 so the result stays in the range 1 to 9";
    }
    return `${formatInteger(reduction.final)} is already a single digit`;
  }

  const parts = [];
  for (let index = 0; index < reduction.steps.length - 1; index += 1) {
    const current = reduction.steps[index];
    const digits = String(current).split("");
    parts.push(`${formatInteger(current)} → ${digits.join(" + ")} = ${reduction.steps[index + 1]}`);
  }
  if (reduction.final !== reduction.steps[reduction.steps.length - 1]) {
    parts.push(`0 is shown as ${reduction.final}`);
  }
  return parts.join(", then ");
}

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function explainBirthday(dateValue) {
  if (!dateValue || !DATE_PATTERN.test(dateValue)) return null;

  const [year, month, day] = dateValue.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  const realDate =
    parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
  if (!realDate) return null;

  const digits = dateValue.replaceAll("-", "").split("").map(Number);
  const total = digits.reduce((sum, digit) => sum + digit, 0);
  const reduction = reductionSteps(total);
  const profile = calculateBirthdayProfile(dateValue);

  return { dateValue, digits, total, reduction, profile };
}

// Traditional life-path reduction that keeps 11, 22 and 33.
// Returned so the birthday page can show where it disagrees with the one-string digit sum.
export function lifePathKeepingMasters(dateValue) {
  const explained = explainBirthday(dateValue);
  if (!explained) return null;

  const [yearText, monthText, dayText] = dateValue.split("-");
  const reducePart = (part) => {
    let value = part.split("").reduce((sum, digit) => sum + Number(digit), 0);
    while (value > 9 && value !== 11 && value !== 22 && value !== 33) {
      value = String(value)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return value;
  };

  const month = reducePart(monthText);
  const day = reducePart(dayText);
  const year = reducePart(yearText);
  let total = month + day + year;
  while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
    total = String(total)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return { month, day, year, total, differs: total !== explained.profile.number };
}

export function pythagoreanValue(letterPosition) {
  const value = Math.abs(Math.trunc(Number(letterPosition)));
  if (!value) return 0;
  return value % 9 || 9;
}

export function explainName(name) {
  if (name == null) return null;
  const original = String(name);
  const trimmed = original.trim();
  if (!trimmed) return null;

  const letters = [];
  const skipped = [];
  for (const char of trimmed.toLowerCase()) {
    if (char >= "a" && char <= "z") {
      const position = char.charCodeAt(0) - 96;
      letters.push({
        char,
        position,
        pythagorean: pythagoreanValue(position)
      });
    } else if (char !== " " && char !== "-" && char !== "'") {
      skipped.push(char);
    }
  }

  const total = letters.reduce((sum, letter) => sum + letter.position, 0);
  const pythagoreanTotal = letters.reduce((sum, letter) => sum + letter.pythagorean, 0);
  const reduction = reductionSteps(total);
  const profile = calculateNameProfile(original);

  return {
    letters,
    skipped,
    total,
    pythagoreanTotal,
    reduction,
    profile
  };
}

// Same clamping rules the odds page has always used.
export function calculateSimpleOdds(totalOptions, winningOptions) {
  const total = Math.max(Number(totalOptions) || 1, 1);
  const winners = Math.min(Math.max(Number(winningOptions) || 1, 1), total);
  const percent = (winners / total) * 100;
  const oneIn = Math.round(total / winners);

  return {
    total,
    winners,
    percent,
    oneIn,
    losing: total - winners,
    dividesEvenly: total % winners === 0
  };
}

export function combinationCount(n, k) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) return null;
  const choose = Math.min(k, n - k);
  let result = 1n;
  for (let index = 1; index <= choose; index += 1) {
    result = (result * BigInt(n - choose + index)) / BigInt(index);
  }
  const asNumber = Number(result);
  return Number.isSafeInteger(asNumber) ? asNumber : null;
}

// What the generator's settings imply. This is a count of lines, not a promise about a prize table.
export function describeDrawFormat(game) {
  if (!game) return null;
  const count = Number(game.count);
  const min = Number(game.min);
  const max = Number(game.max);
  if (!Number.isInteger(count) || !Number.isInteger(min) || !Number.isInteger(max) || count < 1) return null;
  const range = max - min + 1;
  if (range < 1) return null;

  if (game.allowRepeats) {
    const lines = range ** count;
    if (!Number.isSafeInteger(lines)) return null;
    return {
      kind: "ordered-with-repeats",
      lines,
      summary: `${formatInteger(lines)} ordered lines if each of the ${count} positions is drawn from ${min} to ${max} and repeats are allowed.`
    };
  }

  const main = combinationCount(range, count);
  if (main == null) return null;

  if (!game.bonusLabel) {
    return {
      kind: "combination",
      main,
      lines: main,
      summary: `${formatInteger(main)} combinations of ${count} numbers from ${min} to ${max}, where order does not matter.`
    };
  }

  const bonusCount = Number(game.bonusCount || 1);
  const bonusMin = Number(game.bonusMin);
  const bonusMax = Number(game.bonusMax);
  const bonusRange = bonusMax - bonusMin + 1;
  if (bonusCount !== 1 || !Number.isInteger(bonusRange) || bonusRange < 1) {
    return {
      kind: "unsupported-bonus",
      main,
      lines: null,
      summary: `${formatInteger(main)} ways to choose the main numbers. This bonus setup is not a single extra ball, so it is not turned into a jackpot count here.`
    };
  }

  const lines = main * bonusRange;
  if (!Number.isSafeInteger(lines)) return null;
  return {
    kind: "combination-plus-one-bonus",
    main,
    bonusRange,
    lines,
    summary: `${formatInteger(main)} main combinations × ${formatInteger(bonusRange)} bonus choices = ${formatInteger(lines)} equally likely lines.`
  };
}
