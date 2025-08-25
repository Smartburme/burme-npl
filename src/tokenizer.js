// src/tokenizer.js

/**
 * Tokenizer for Burmese + English + Numbers
 * Splits by whitespace, punctuation, and Myanmar boundaries
 */
export function tokenizer(text) {
  if (!text) return [];

  // Myanmar characters (U+1000 - U+109F)
  const pattern = /[\u1000-\u109F]+|[a-zA-Z]+|\d+|[^\s]/g;
  const tokens = text.match(pattern) || [];

  // Trim and clean tokens
  return tokens.map(t => t.trim()).filter(Boolean);
}
