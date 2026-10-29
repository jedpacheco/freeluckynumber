import { luckyColors, luckyDays, luckyMessages } from "../data/toolsData.js";

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

export function generateDailyProfile() {
  const today = new Date();
  const seed =
    today.getFullYear() +
    (today.getMonth() + 1) * 17 +
    today.getDate() * 31;

  const number = reduceToSingleDigit(seed);
  const color = luckyColors[seed % luckyColors.length];
  const day = luckyDays[today.getDay()];
  const message = luckyMessages[seed % luckyMessages.length];

  return {
    number,
    color,
    day,
    message
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
