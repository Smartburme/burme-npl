
export const stopwords  = [
  "အဲဒီ",
  "ဒါ",
  "ကို",
  "ရဲ့",
  "ပြီး",
  "လို့",
  "အောင်",
  "တွေ",
  "များ"
];

export function removeStopwords(tokens) {
  return tokens.filter(t => !stopwords.includes(t));
}
