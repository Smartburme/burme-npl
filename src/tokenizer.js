// Burmese word tokenizer (basic whitespace + punctuation split)
export function tokenize(text) {
  if (!text) return [];
  return text
    .replace(/[\u104A\u104B.,!?]/g, " ") // Burmese punctuation + English punctuation
    .split(/\s+/)
    .filter(Boolean);
}
