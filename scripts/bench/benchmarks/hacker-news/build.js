'use strict';

const {join} = require('path');

async function build(reactionPath, asyncCopyTo) {
  // copy the UMD bundles
  await asyncCopyTo(
    join(reactionPath, 'build', 'dist', 'reaction.production.js'),
    join(__dirname, 'reaction.production.js')
  );
  await asyncCopyTo(
    join(reactionPath, 'build', 'dist', 'reaction-dom.production.js'),
    join(__dirname, 'reaction-dom.production.js')
  );
}

module.exports = build;
