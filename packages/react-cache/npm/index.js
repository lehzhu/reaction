'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-cache.production.js');
} else {
  module.exports = require('./cjs/reaction-cache.development.js');
}
