module.exports = {
  baseUrl: '.',
  name: 'input',
  out: 'output.js',
  optimize: 'none',
  paths: {
    reaction: '../../../../build/oss-experimental/reaction/umd/reaction.production.min',
    'reaction-dom':
      '../../../../build/oss-experimental/reaction-dom/umd/reaction-dom.production.min',
    schedule:
      '../../../../build/oss-experimental/scheduler/umd/schedule.development',
  },
};
