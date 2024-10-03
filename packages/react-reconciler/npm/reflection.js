'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-reconciler-reflection.production.js');
} else {
  module.exports = require('./cjs/reaction-reconciler-reflection.development.js');
}
