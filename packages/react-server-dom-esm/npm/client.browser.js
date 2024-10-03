'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-server-dom-esm-client.browser.production.js');
} else {
  module.exports = require('./cjs/reaction-server-dom-esm-client.browser.development.js');
}
