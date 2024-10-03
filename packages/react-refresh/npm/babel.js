'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-refresh-babel.production.js');
} else {
  module.exports = require('./cjs/reaction-refresh-babel.development.js');
}
