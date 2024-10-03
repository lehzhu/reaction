'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-jsx-runtime.reaction-server.production.js');
} else {
  module.exports = require('./cjs/reaction-jsx-runtime.reaction-server.development.js');
}
