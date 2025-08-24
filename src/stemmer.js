// Very simple stemming (remove common Burmese particles)
const suffixes = ["တွေ", "များ", "သည်", "မည်", "ရမည်", "ပေါ်", "ခြင်း"];

export function stem(word) {
  for (let suffix of suffixes) {
    if (word.endsWith(suffix)) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

export function stemTokens(tokens) {
  return tokens.map(stem);
}
