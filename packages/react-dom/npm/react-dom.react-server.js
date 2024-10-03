'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-dom.reaction-server.production.js');
} else {
  module.exports = require('./cjs/reaction-dom.reaction-server.development.js');
}
