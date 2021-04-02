import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from "rollup-plugin-commonjs";
import glob from 'glob';

import pkg from './package.json';

const inputs = glob.sync('src/**/!(*.test|setupTests|index).?(js|jsx)');

console.log('---- MATCHES ----');
console.log(inputs);

const external = Object.keys(pkg.peerDependencies || {})
  .concat(Object.keys(pkg.optionalDependencies || {}));

module.exports = {
  input: ['src/index.js'].concat(inputs),
  output: [{
    dir: 'lib/esm',
    format: 'esm',
  }, {
    dir: 'lib/cjs',
    format: 'cjs',
  }],
  external: external,
  plugins: [
    resolve(),
    commonjs({
      include: ["node_modules/**"],
      namedExports: {
        "react-is": [
          "isValidElementType",
          "isElement",
          "ForwardRef"
        ],
        "prop-types": [
          "element",
          "elementType"
        ]
      }
    }),
    babel({
      babelHelpers: 'bundled',
      // TODO Get this working with:
      // babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
  ],
}
