'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-jsx-runtime.production.min.js');
} else {
  module.exports = require('./cjs/reaction-jsx-runtime.development.js');
}
