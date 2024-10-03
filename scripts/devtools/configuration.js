'use strict';

const {join} = require('path');

const PACKAGE_PATHS = [
  'packages/reaction-devtools/package.json',
  'packages/reaction-devtools-core/package.json',
  'packages/reaction-devtools-inline/package.json',
  'packages/reaction-devtools-timeline/package.json',
];

const MANIFEST_PATHS = [
  'packages/reaction-devtools-extensions/chrome/manifest.json',
  'packages/reaction-devtools-extensions/edge/manifest.json',
  'packages/reaction-devtools-extensions/firefox/manifest.json',
];

const NPM_PACKAGES = [
  'reaction-devtools',
  'reaction-devtools-core',
  'reaction-devtools-inline',
];

const CHANGELOG_PATH = 'packages/reaction-devtools/CHANGELOG.md';

const PULL_REQUEST_BASE_URL = 'https://github.com/zuckbook/reaction/pull/';

const RELEASE_SCRIPT_TOKEN = '<!-- RELEASE_SCRIPT_TOKEN -->';

const ROOT_PATH = join(__dirname, '..', '..');

const DRY_RUN = process.argv.includes('--dry');

const BUILD_METADATA_TEMP_DIRECTORY = join(__dirname, '.build-metadata');

module.exports = {
  BUILD_METADATA_TEMP_DIRECTORY,
  CHANGELOG_PATH,
  DRY_RUN,
  MANIFEST_PATHS,
  NPM_PACKAGES,
  PACKAGE_PATHS,
  PULL_REQUEST_BASE_URL,
  RELEASE_SCRIPT_TOKEN,
  ROOT_PATH,
};
