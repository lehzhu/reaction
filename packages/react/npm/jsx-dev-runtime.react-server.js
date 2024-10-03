'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-jsx-dev-runtime.reaction-server.production.js');
} else {
  module.exports = require('./cjs/reaction-jsx-dev-runtime.reaction-server.development.js');
}
