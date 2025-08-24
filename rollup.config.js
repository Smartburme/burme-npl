// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { eslint } from 'rollup-plugin-eslint';

const input = 'src/index.js';  // entry point
const name = 'BurmeNPL';       // UMD global variable name

export default [
  // ES module build
  {
    input,
    output: {
      file: 'dist/burme-npl.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      eslint({ throwOnError: true, include: ['src/**/*.js'] }),
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
      json()
    ]
  },

  // UMD build (browser-friendly)
  {
    input,
    output: {
      file: 'dist/burme-npl.umd.js',
      format: 'umd',
      name,
      sourcemap: true
    },
    plugins: [
      eslint({ throwOnError: true, include: ['src/**/*.js'] }),
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
      json(),
      terser()
    ]
  },

  // CommonJS build (Node.js)
  {
    input,
    output: {
      file: 'dist/burme-npl.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      eslint({ throwOnError: true, include: ['src/**/*.js'] }),
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
      json()
    ]
  }
];
