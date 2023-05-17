const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    resolve({
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      rootMode: 'upward',
    }),
    json(),
  ],
  external: ['react', 'react-dom'],
};
