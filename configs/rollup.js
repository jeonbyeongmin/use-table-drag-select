/**
 * MIT License
 * Copyright (c) 2021 Viva Republica, Inc
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;
const builtins = require('builtin-modules');

exports.generateRollupConfig = function generateRollupConfig({ packageDir }) {
  const packageJSON = require(path.join(packageDir, 'package.json'));

  if (packageJSON.exports == null) {
    throw new Error('package.json의 exports 필드를 정의해주세요.');
  }

  const entrypoints = Object.keys(packageJSON.exports).filter(x => x !== './package.json');

  const external = pkg => {
    const externals = [...Object.keys({ ...packageJSON.dependencies, ...packageJSON.peerDependencies }), ...builtins];

    return externals.some(externalPkg => {
      return pkg.startsWith(externalPkg);
    });
  };

  const extensions = ['.js', '.jsx', '.ts', '.tsx'];

  function buildJS(input, output, format) {
    const isESMFormat = format === 'es';
    return {
      input,
      external,
      output: [
        {
          format,
          ...(isESMFormat
            ? {
                dir: path.dirname(output),
                entryFileNames: `[name]${path.extname(output)}`,
                preserveModulesRoot: isESMFormat ? path.dirname(input) : undefined,
              }
            : { file: output }),
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
      preserveModules: isESMFormat,
    };
  }

  function buildCJS(input, output) {
    return buildJS(input, output, 'cjs');
  }

  function buildESM(input, output) {
    return buildJS(input, output, 'es');
  }

  return entrypoints.flatMap(entrypoint => {
    const cjsEntrypoint = path.resolve(
      packageDir,
      ensure(handleCJSEntrypoint(packageJSON.exports, entrypoint), 'CJS entrypoint not found')
    );
    const cjsOutput = path.resolve(
      packageDir,
      ensure(packageJSON?.publishConfig.exports?.[entrypoint].require, 'CJS outputfile not found')
    );

    const esmEntrypoint = path.resolve(
      packageDir,
      ensure(handleESMEntrypoint(packageJSON.exports, entrypoint), 'ESM entrypoint not found')
    );
    const esmOutput = path.resolve(
      packageDir,
      ensure(packageJSON?.publishConfig.exports?.[entrypoint].import, 'ESM outputfile not found')
    );

    return [buildCJS(cjsEntrypoint, cjsOutput), buildESM(esmEntrypoint, esmOutput)];
  });
};

function handleCJSEntrypoint(exports, entrypoint) {
  if (exports?.[entrypoint].require != null) {
    return exports?.[entrypoint].require;
  }

  if (typeof exports?.[entrypoint] === 'string') {
    return exports?.[entrypoint];
  }

  return undefined;
}

function handleESMEntrypoint(exports = {}, entrypoint) {
  if (exports?.[entrypoint].import != null) {
    return exports?.[entrypoint].import;
  }

  if (typeof exports?.[entrypoint] === 'string') {
    return exports?.[entrypoint];
  }

  return undefined;
}

function ensure(value, message) {
  if (value == null) {
    throw new Error(message);
  }

  return value;
}
