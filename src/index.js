// src/index.js

import { tokenizer } from './tokenizer.js';
import { stem } from './stemmer.js';
import { stopwords, isStopword } from './stopwords.js';

// Function to tokenize, stem, and filter stopwords
export function processText(text) {
  if (!text) return [];
  const tokens = tokenizer(text);
  const filtered = tokens.filter(t => !isStopword(t));
  const stemmed = filtered.map(stem);
  return stemmed;
}

// Export individual modules
export { tokenizer, stem, stopwords, isStopword };

// Default export for UMD
export default {
  tokenizer,
  stem,
  stopwords,
  isStopword,
  processText
};
