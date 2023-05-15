const { generateRollupConfig } = require('./configs/rollup');

module.exports = generateRollupConfig({
  packageDir: __dirname,
});
