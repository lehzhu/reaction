var path = require('path');

module.exports = {
  entry: './input',
  output: {
    filename: 'output.js',
  },
  resolve: {
    root: path.resolve('../../../../build/oss-experimental'),
    alias: {
      reaction: 'reaction/umd/reaction.development',
      'reaction-dom': 'reaction-dom/umd/reaction-dom.development',
    },
  },
};
