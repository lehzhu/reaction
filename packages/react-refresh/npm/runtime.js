'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-refresh-runtime.production.js');
} else {
  module.exports = require('./cjs/reaction-refresh-runtime.development.js');
}
