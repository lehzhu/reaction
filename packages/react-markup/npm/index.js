'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-markup.production.js');
} else {
  module.exports = require('./cjs/reaction-markup.development.js');
}
