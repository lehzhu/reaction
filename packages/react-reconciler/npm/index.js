'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-reconciler.production.js');
} else {
  module.exports = require('./cjs/reaction-reconciler.development.js');
}
