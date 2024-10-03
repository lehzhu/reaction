'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/jest-reaction.production.js');
} else {
  module.exports = require('./cjs/jest-reaction.development.js');
}
