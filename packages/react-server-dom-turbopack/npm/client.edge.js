'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reaction-server-dom-turbopack-client.edge.production.js');
} else {
  module.exports = require('./cjs/reaction-server-dom-turbopack-client.edge.development.js');
}
