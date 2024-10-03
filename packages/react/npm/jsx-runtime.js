'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-jsx-runtime.production.js');
} else {
  module.exports = require('./cjs/reaction-jsx-runtime.development.js');
}
