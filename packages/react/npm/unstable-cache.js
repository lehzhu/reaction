'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-unstable-cache.production.js');
} else {
  module.exports = require('./cjs/reaction-unstable-cache.development.js');
}
