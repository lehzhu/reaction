'use strict';

var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/reaction-server-dom-webpack-server.node.unbundled.production.js');
} else {
  s = require('./cjs/reaction-server-dom-webpack-server.node.unbundled.development.js');
}

if (s.prerenderToNodeStream) {
  exports.prerenderToNodeStream = s.prerenderToNodeStream;
}
