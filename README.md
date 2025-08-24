# BurmeNPL
(BurmeNPL)[smartburme.github.io/burme-npl/]
Simple Burmese NLP (Natural Language Processing) library for tokenization, stemming, and stopword removal. Works in **browser** (UMD/CDN) and **NodeJS** environments.

---

## 📂 Project Structure
```
Burme-npl/
│
├── src/                    # Source files
│   ├── tokenizer.js        # Tokenize Burmese text into words
│   ├── stemmer.js          # Simple stemming (strip suffixes)
│   ├── stopwords.js        # Stopword list + removal
│   └── index.js            # Export all APIs
│
├── dist/                   # Bundled files for browser / CDN
│   ├── burme-npl.js        # UMD bundle (unminified, for development)
│   └── burme-npl.min.js    # UMD bundle (minified, production-ready)
│
├── main/                   # Optional demo / local testing page
│   └── index.html          # Interactive demo HTML page
│
├── test/                   # Unit tests (future-proof, optional)
│   └── tokenizer.test.js
│
├── rollup.config.js        # Rollup bundler configuration
├── package.json            # NPM package info + build scripts
├── README.md               # Project documentation
└── LICENSE                 # License file (MIT)
```
---

## ⚡ Features

- Tokenize Burmese text into words
- Simple stemming (strip common Burmese suffixes)
- Remove common Burmese stopwords
- Works in browser (CDN or local fallback) and NodeJS
- UMD bundle for easy inclusion
- Minified version ready for production

---

## 💻 Installation

### 1. Using CDN

```html
<script src="https://cdn.jsdelivr.net/gh/Smartburme/Burme-npl@v0.1.0/dist/burme-npl.min.js"></script>

2. Local Fallback

<script>
if (!window.BurmeNPL) {
  const s = document.createElement('script');
  s.src = 'dist/burme-npl.min.js'; // local build
  document.head.appendChild(s);
}
</script>

3. NodeJS / NPM

npm install
npm run build


---

🛠 Usage Example

<input id="msg" placeholder="စာရိုက်ပါ: မင်္ဂလာပါ">
<button onclick="runNPL()">Run</button>
<div id="output"></div>

<script>
function runNPL() {
  const text = document.getElementById('msg').value;
  const tokens = BurmeNPL.tokenize(text);
  const stems = BurmeNPL.stemTokens(tokens);
  const clean = BurmeNPL.removeStopwords(stems);

  document.getElementById('output').textContent =
    `Tokens: ${tokens.join(', ')}\nStems: ${stems.join(', ')}\nClean: ${clean.join(', ')}`;
}
</script>

Result Example:

Input: "ကျောင်းတွေမှာ သူများ သင်တန်းသည်"
Output:

Tokens: ကျောင်းတွေမှာ, သူများ, သင်တန်းသည်
Stems: ကျောင်းမှာ, သူ, သင်တန်း
Clean: ကျောင်းမှာ, သူ, သင်တန်း


---

🔧 Development

1. Install dependencies:



npm install

2. Build:



npm run build

Output: dist/burme-npl.js (unminified), dist/burme-npl.min.js (minified)



---

📄 License

MIT License – see LICENSE file.


---

👤 Author

Smartburme / Wayne

---
