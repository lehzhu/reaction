'use strict';

const baseConfig = require('./config.base');

module.exports = Object.assign({}, baseConfig, {
  modulePathIgnorePatterns: [
    ...baseConfig.modulePathIgnorePatterns,
    'packages/reaction-devtools-extensions',
    'packages/reaction-devtools-shared',
  ],
  setupFiles: [
    ...baseConfig.setupFiles,
    require.resolve('./setupTests.www.js'),
    require.resolve('./setupHostConfigs.js'),
  ],
});
