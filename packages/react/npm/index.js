'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction.production.js');
} else {
  module.exports = require('./cjs/reaction.development.js');
}
