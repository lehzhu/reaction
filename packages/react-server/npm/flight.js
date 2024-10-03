'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-server-flight.production.js');
} else {
  module.exports = require('./cjs/reaction-server-flight.development.js');
}
