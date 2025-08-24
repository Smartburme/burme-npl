// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  // 1️⃣ Development / unminified
  {
    input: "src/index.js",
    output: {
      file: "dist/burme-npl.js",
      format: "umd",
      name: "BurmeNPL",
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },

  // 2️⃣ Production / minified
  {
    input: "src/index.js",
    output: {
      file: "dist/burme-npl.min.js",
      format: "umd",
      name: "BurmeNPL",
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      terser() // Minify for production
    ]
  }
];
