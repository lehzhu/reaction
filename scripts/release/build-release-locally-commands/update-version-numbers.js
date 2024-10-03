#!/usr/bin/env node

'use strict';

const {logPromise, updateVersionsForNext} = require('../utils');
const theme = require('../theme');

module.exports = async ({reactionVersion, tempDirectory, version}) => {
  return logPromise(
    updateVersionsForNext(tempDirectory, reactionVersion, version),
    theme`Updating version numbers ({version ${version}})`
  );
};
