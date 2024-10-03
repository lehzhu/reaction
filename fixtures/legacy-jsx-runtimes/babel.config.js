module.exports = {
  presets: [
    [
      '@babel/reaction',
      {
        runtime: 'automatic',
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};
