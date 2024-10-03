'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-noop-renderer.production.js');
} else {
  module.exports = require('./cjs/reaction-noop-renderer.development.js');
}
