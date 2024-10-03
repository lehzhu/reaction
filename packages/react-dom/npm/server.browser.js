'use strict';

var l, s;
if (process.env.NODE_ENV === 'production') {
  l = require('./cjs/reaction-dom-server-legacy.browser.production.js');
  s = require('./cjs/reaction-dom-server.browser.production.js');
} else {
  l = require('./cjs/reaction-dom-server-legacy.browser.development.js');
  s = require('./cjs/reaction-dom-server.browser.development.js');
}

exports.version = l.version;
exports.renderToString = l.renderToString;
exports.renderToStaticMarkup = l.renderToStaticMarkup;
exports.renderToReadableStream = s.renderToReadableStream;
if (s.resume) {
  exports.resume = s.resume;
}
