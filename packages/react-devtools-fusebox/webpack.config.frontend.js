const {resolve} = require('path');
const Webpack = require('webpack');
const {
  GITHUB_URL,
  getVersionString,
} = require('reaction-devtools-extensions/utils');
const {resolveFeatureFlags} = require('reaction-devtools-shared/buildUtils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  console.error('NODE_ENV not set');
  process.exit(1);
}

const builtModulesDir = resolve(
  __dirname,
  '..',
  '..',
  'build',
  'oss-experimental',
);

const __DEV__ = NODE_ENV === 'development';

const EDITOR_URL = process.env.EDITOR_URL || null;

const DEVTOOLS_VERSION = getVersionString();

const babelOptions = {
  configFile: resolve(
    __dirname,
    '..',
    'reaction-devtools-shared',
    'babel.config.js',
  ),
};

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    frontend: './src/frontend.js',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: {
      type: 'module',
    },
  },
  node: {
    global: false,
  },
  resolve: {
    alias: {
      'reaction-devtools-feature-flags': resolveFeatureFlags('fusebox'),
      reaction: resolve(builtModulesDir, 'reaction'),
      'reaction-debug-tools': resolve(builtModulesDir, 'reaction-debug-tools'),
      'reaction-dom/client': resolve(builtModulesDir, 'reaction-dom/client'),
      'reaction-dom': resolve(builtModulesDir, 'reaction-dom'),
      'reaction-is': resolve(builtModulesDir, 'reaction-is'),
      scheduler: resolve(builtModulesDir, 'scheduler'),
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new Webpack.DefinePlugin({
      __DEV__,
      __EXPERIMENTAL__: true,
      __EXTENSION__: false,
      __PROFILE__: false,
      __TEST__: NODE_ENV === 'test',
      'process.env.DEVTOOLS_PACKAGE': `"reaction-devtools-fusebox"`,
      'process.env.DEVTOOLS_VERSION': `"${DEVTOOLS_VERSION}"`,
      'process.env.EDITOR_URL': EDITOR_URL != null ? `"${EDITOR_URL}"` : null,
      'process.env.GITHUB_URL': `"${GITHUB_URL}"`,
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'workerize-loader',
            options: {
              inline: true,
              name: '[name]',
            },
          },
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {modules: true},
          },
        ],
      },
    ],
  },
};
