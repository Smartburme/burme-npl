import { tokenize } from "./tokenizer.js";
import { stem, stemTokens } from "./stemmer.js";
import { stopwords, removeStopwords } from "./stopwords.js";

export default {
  tokenize,
  stem,
  stemTokens,
  stopwords,
  removeStopwords
};
