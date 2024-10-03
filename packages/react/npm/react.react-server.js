'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction.reaction-server.production.js');
} else {
  module.exports = require('./cjs/reaction.reaction-server.development.js');
}
