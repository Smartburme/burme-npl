// src/stopwords.js

// Basic Myanmar stopwords (နည်းနည်းထပ်ထည့်ထား)
export const stopwords = [
  "၏","သည်","သော","က","ကို","ရ","၏","မှာ","ထဲ","ထံ","ကြ","၏","မ","နဲ့","ပါ",
  "and","the","is","in","on","for","to","of","a","an","with"
];

/**
 * Check if a token is a stopword
 */
export function isStopword(token) {
  if (!token) return false;
  return stopwords.includes(token.toLowerCase());
}
