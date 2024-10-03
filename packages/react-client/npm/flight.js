'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-client-flight.production.js');
} else {
  module.exports = require('./cjs/reaction-client-flight.development.js');
}
