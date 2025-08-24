import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "main/burme-npl.js",
    format: "umd",
    name: "BurmeNPL"
  },
  plugins: [resolve(), commonjs()]
};
