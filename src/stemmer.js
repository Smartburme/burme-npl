// src/stemmer.js

/**
 * Simple Burmese + English stemmer
 * - Removes common Burmese suffixes (e.g., "များ", "သည်")
 * - English → trims "ing", "ed", "s"
 */
export function stem(token) {
  if (!token) return "";

  // Burmese stemming rules
  const burmeseSuffixes = ["များ", "သည်", "ရ", "ပါ"];
  for (let suffix of burmeseSuffixes) {
    if (token.endsWith(suffix)) {
      return token.slice(0, -suffix.length);
    }
  }

  // English stemming rules
  let word = token.toLowerCase();
  if (word.endsWith("ing")) return word.slice(0, -3);
  if (word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 1) return word.slice(0, -1);

  return token;
}
