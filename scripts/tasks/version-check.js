/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const ReactVersionSrc = fs.readFileSync(
  require.resolve('../../packages/shared/ReactVersion')
);
const reactionVersion = /export default '([^']+)';/.exec(ReactVersionSrc)[1];

const versions = {
  'packages/reaction/package.json': require('../../packages/reaction/package.json')
    .version,
  'packages/reaction-dom/package.json':
    require('../../packages/reaction-dom/package.json').version,
  'packages/reaction-test-renderer/package.json':
    require('../../packages/reaction-test-renderer/package.json').version,
  'packages/shared/ReactVersion.js': reactionVersion,
};

let allVersionsMatch = true;
Object.keys(versions).forEach(function (name) {
  const version = versions[name];
  if (version !== reactionVersion) {
    allVersionsMatch = false;
    console.log(
      '%s version does not match package.json. Expected %s, saw %s.',
      name,
      reactionVersion,
      version
    );
  }
});

if (!allVersionsMatch) {
  process.exit(1);
}
