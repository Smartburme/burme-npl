# Burme NPL 
---

📂 Project Structure
```
Burme-npl/
│
├── src/
│   ├── tokenizer.js
│   ├── stemmer.js
│   ├── stopwords.js
│   └── index.js
│
├── dist/
│   └── burme-npl.js        # bundle (browser/CDN)
│
├── rollup.config.js
├── package.json
└── README.md
```

---

📌 Code Files

src/tokenizer.js
```
// Burmese word tokenizer (basic whitespace + punctuation split)
export function tokenize(text) {
  if (!text) return [];
  return text
    .replace(/[\u104A\u104B.,!?]/g, " ") // Burmese punctuation + English punctuation
    .split(/\s+/)
    .filter(Boolean);
}

src/stemmer.js

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

src/stopwords.js

// Common Burmese stopwords
export const stopwords = [
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

src/index.js

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

```
---

📌 Rollup Config (rollup.config.js)
```
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "dist/burme-npl.js",
    format: "umd",
    name: "BurmeNPL"
  },
  plugins: [resolve(), commonjs()]
};

```
---

📌 package.json
```
{
  "name": "burme-npl",
  "version": "0.1.0",
  "description": "Simple Burmese NLP library (Tokenizer, Stemmer, Stopwords)",
  "main": "dist/burme-npl.js",
  "scripts": {
    "build": "rollup -c"
  },
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "@rollup/plugin-commonjs": "^24.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "rollup": "^3.0.0"
  }
}

```
---

📌 CDN သုံးပုံ

GitHub release ထုတ်ပြီး jsDelivr/CDN link နဲ့ သုံးလို့ရမယ်:
```
<script src="https://cdn.jsdelivr.net/gh/USERNAME/Burme-npl@v0.1.0/dist/burme-npl.js"></script>
<script>
  const text = "မင်းတို့ရဲ့ project ကို စမ်းသုံးနေတယ်။";
  const tokens = BurmeNPL.tokenize(text);
  const stems = BurmeNPL.stemTokens(tokens);
  const clean = BurmeNPL.removeStopwords(stems);
  console.log({ tokens, stems, clean });
</script>

```
---

ဒါနဲ့ မင်း GitHub မှာ တင်ပြီး npm install && npm run build လုပ်တာနဲ့ dist/burme-npl.js ထွက်လာမယ် → CDN တင်နိုင်ပြီ။

ချင်းချင်း ပြန်ပြောချင်တာက: သေချာတယ်လို့ CDN မှာ စတင်ချင်ရင် Rollup build ထွက်တဲ့ dist/burme-npl.js ကို Upload ပြီး Release လုပ်ရမယ်။

မင်းအတွက် အခု code တွေကို zip ထုပ်ပေးလိုက်မလား?

