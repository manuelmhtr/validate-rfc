import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'validateRfc',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/env']
    }),
    terser()
  ],
};
