'use strict';

const RELEASE_CHANNEL = process.env.RELEASE_CHANNEL;

const __EXPERIMENTAL__ =
  typeof RELEASE_CHANNEL === 'string'
    ? RELEASE_CHANNEL === 'experimental'
    : true;

const bundleTypes = {
  NODE_ES2015: 'NODE_ES2015',
  ESM_DEV: 'ESM_DEV',
  ESM_PROD: 'ESM_PROD',
  NODE_DEV: 'NODE_DEV',
  NODE_PROD: 'NODE_PROD',
  NODE_PROFILING: 'NODE_PROFILING',
  BUN_DEV: 'BUN_DEV',
  BUN_PROD: 'BUN_PROD',
  FB_WWW_DEV: 'FB_WWW_DEV',
  FB_WWW_PROD: 'FB_WWW_PROD',
  FB_WWW_PROFILING: 'FB_WWW_PROFILING',
  RN_OSS_DEV: 'RN_OSS_DEV',
  RN_OSS_PROD: 'RN_OSS_PROD',
  RN_OSS_PROFILING: 'RN_OSS_PROFILING',
  RN_FB_DEV: 'RN_FB_DEV',
  RN_FB_PROD: 'RN_FB_PROD',
  RN_FB_PROFILING: 'RN_FB_PROFILING',
  BROWSER_SCRIPT: 'BROWSER_SCRIPT',
};

const {
  NODE_ES2015,
  ESM_DEV,
  ESM_PROD,
  NODE_DEV,
  NODE_PROD,
  NODE_PROFILING,
  BUN_DEV,
  BUN_PROD,
  FB_WWW_DEV,
  FB_WWW_PROD,
  FB_WWW_PROFILING,
  RN_OSS_DEV,
  RN_OSS_PROD,
  RN_OSS_PROFILING,
  RN_FB_DEV,
  RN_FB_PROD,
  RN_FB_PROFILING,
  BROWSER_SCRIPT,
} = bundleTypes;

const moduleTypes = {
  // React
  ISOMORPHIC: 'ISOMORPHIC',
  // Individual renderers. They bundle the reconciler. (e.g. ReactDOM)
  RENDERER: 'RENDERER',
  // Helper packages that access specific renderer's internals. (e.g. TestUtils)
  RENDERER_UTILS: 'RENDERER_UTILS',
  // Standalone reconciler for third-party renderers.
  RECONCILER: 'RECONCILER',
};

const {ISOMORPHIC, RENDERER, RENDERER_UTILS, RECONCILER} = moduleTypes;

const bundles = [
  /******* Isomorphic *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'reaction',
    global: 'React',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* Isomorphic Shared Subset *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction/src/ReactServer.js',
    name: 'reaction.reaction-server',
    condition: 'reaction-server',
    global: 'React',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React JSX Runtime *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      NODE_PROFILING,
      // TODO: use on WWW.
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'reaction/jsx-runtime',
    global: 'JSXRuntime',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'ReactNativeInternalFeatureFlags'],
  },

  /******* Compiler Runtime *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, NODE_PROFILING],
    moduleType: ISOMORPHIC,
    entry: 'reaction/compiler-runtime',
    global: 'CompilerRuntime',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React JSX Runtime React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction/src/jsx/ReactJSXServer.js',
    name: 'reaction-jsx-runtime.reaction-server',
    condition: 'reaction-server',
    global: 'JSXRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React JSX DEV Runtime *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      NODE_PROFILING,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'reaction/jsx-dev-runtime',
    global: 'JSXDEVRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React JSX DEV Runtime React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction/src/jsx/ReactJSXServer.js',
    name: 'reaction-jsx-dev-runtime.reaction-server',
    condition: 'reaction-server',
    global: 'JSXDEVRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* React DOM Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/client',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM Profiling (Client) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-dom/profiling',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM (www) *******/
  {
    bundleTypes: [FB_WWW_DEV, FB_WWW_PROD, FB_WWW_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/ReactDOMFB.js',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* React DOM (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-dom',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Client (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-dom/client',
    global: 'ReactDOMClient',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Profiling (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-dom/profiling',
    global: 'ReactDOMProfiling',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction', 'reaction-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Test Utils (fbsource) *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    entry: 'reaction-dom/test-utils',
    global: 'ReactDOMTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/ReactDOMReactServer.js',
    name: 'reaction-dom.reaction-server',
    condition: 'reaction-server',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* Test Utils *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD],
    entry: 'reaction-dom/test-utils',
    global: 'ReactTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM - Testing *******/
  {
    moduleType: RENDERER,
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    entry: 'reaction-dom/unstable_testing',
    global: 'ReactDOMTesting',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM - www - Testing *******/
  {
    moduleType: RENDERER,
    bundleTypes: [FB_WWW_DEV, FB_WWW_PROD],
    entry: 'reaction-dom/src/ReactDOMTestingFB.js',
    global: 'ReactDOMTesting',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React DOM Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/ReactDOMLegacyServerBrowser.js',
    name: 'reaction-dom-server-legacy.browser',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/ReactDOMLegacyServerNode.js',
    name: 'reaction-dom-server-legacy.node',
    externals: ['reaction', 'stream', 'reaction-dom'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React DOM Fizz Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/reaction-dom-server.browser.js',
    name: 'reaction-dom-server.browser',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/reaction-dom-server.node.js',
    name: 'reaction-dom-server.node',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'crypto', 'async_hooks', 'reaction-dom'],
  },
  {
    bundleTypes: __EXPERIMENTAL__ ? [FB_WWW_DEV, FB_WWW_PROD] : [],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-fb/src/ReactDOMServerFB.js',
    global: 'ReactDOMServerStreaming',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM Fizz Server Edge *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/reaction-dom-server.edge.js',
    name: 'reaction-dom-server.edge', // 'node_modules/reaction/*.js',

    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM Fizz Server Bun *******/
  {
    bundleTypes: [BUN_DEV, BUN_PROD],
    moduleType: RENDERER,
    entry: 'reaction-dom/src/server/reaction-dom-server.bun.js',
    name: 'reaction-dom-server.bun', // 'node_modules/reaction/*.js',

    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React DOM Fizz Server External Runtime *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [BROWSER_SCRIPT] : [],
    moduleType: RENDERER,
    entry: 'reaction-dom/unstable_server-external-runtime',
    outputPath: 'unstable_server-external-runtime.js',
    global: 'ReactDOMServerExternalRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React HTML RSC *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    moduleType: RENDERER,
    entry: 'reaction-markup/src/ReactMarkupServer.js',
    name: 'reaction-markup.reaction-server',
    condition: 'reaction-server',
    global: 'ReactMarkup',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React HTML Client *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    moduleType: RENDERER,
    entry: 'reaction-markup/src/ReactMarkupClient.js',
    name: 'reaction-markup',
    global: 'ReactMarkup',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React Server DOM Webpack Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'reaction-server-dom-webpack/src/server/reaction-flight-dom-server.browser',
    name: 'reaction-server-dom-webpack-server.browser',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/src/server/reaction-flight-dom-server.node',
    name: 'reaction-server-dom-webpack-server.node',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'crypto', 'async_hooks', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'reaction-server-dom-webpack/src/server/reaction-flight-dom-server.node.unbundled',
    name: 'reaction-server-dom-webpack-server.node.unbundled',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'crypto', 'async_hooks', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/src/server/reaction-flight-dom-server.edge',
    name: 'reaction-server-dom-webpack-server.edge',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'crypto', 'async_hooks', 'reaction-dom'],
  },

  /******* React Server DOM Webpack Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/client.browser',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/client.node',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'util', 'crypto'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/client.node.unbundled',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'util', 'crypto'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-webpack/client.edge',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React Server DOM Webpack Plugin *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'reaction-server-dom-webpack/plugin',
    global: 'ReactServerWebpackPlugin',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['fs', 'path', 'url', 'neo-async'],
  },

  /******* React Server DOM Webpack Node.js Loader *******/
  {
    bundleTypes: [ESM_PROD],
    moduleType: RENDERER_UTILS,
    entry: 'reaction-server-dom-webpack/node-loader',
    condition: 'reaction-server',
    global: 'ReactServerWebpackNodeLoader',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['acorn'],
  },

  /******* React Server DOM Webpack Node.js CommonJS Loader *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'reaction-server-dom-webpack/src/ReactFlightWebpackNodeRegister',
    name: 'reaction-server-dom-webpack-node-register',
    condition: 'reaction-server',
    global: 'ReactFlightWebpackNodeRegister',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['url', 'module', 'reaction-server-dom-webpack/server'],
  },

  /******* React Server DOM Turbopack Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'reaction-server-dom-turbopack/src/server/reaction-flight-dom-server.browser',
    name: 'reaction-server-dom-turbopack-server.browser',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-turbopack/src/server/reaction-flight-dom-server.node',
    name: 'reaction-server-dom-turbopack-server.node',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'async_hooks', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-turbopack/src/server/reaction-flight-dom-server.edge',
    name: 'reaction-server-dom-turbopack-server.edge',
    condition: 'reaction-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'async_hooks', 'reaction-dom'],
  },

  /******* React Server DOM Turbopack Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-turbopack/client.browser',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-turbopack/client.node',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'util'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-turbopack/client.edge',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },

  /******* React Server DOM ESM Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-esm/src/server/reaction-flight-dom-server.node',
    name: 'reaction-server-dom-esm-server.node',
    condition: 'reaction-server',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'util', 'crypto', 'async_hooks', 'reaction-dom'],
  },

  /******* React Server DOM ESM Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, ESM_DEV, ESM_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-esm/client.browser',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-server-dom-esm/client.node',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'reaction-dom', 'util', 'crypto'],
  },

  /******* React Server DOM ESM Node.js Loader *******/
  {
    bundleTypes: [ESM_PROD],
    moduleType: RENDERER_UTILS,
    entry: 'reaction-server-dom-esm/node-loader',
    condition: 'reaction-server',
    global: 'ReactServerESMNodeLoader',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['acorn'],
  },

  /******* React Suspense Test Utils *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'reaction-suspense-test-utils',
    global: 'ReactSuspenseTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React ART *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RENDERER,
    entry: 'reaction-art',
    global: 'ReactART',
    externals: ['reaction'],
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        // Include JSX
        presets: opts.presets.concat([
          require.resolve('@babel/preset-reaction'),
          require.resolve('@babel/preset-flow'),
        ]),
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Native *******/
  {
    bundleTypes: __EXPERIMENTAL__
      ? []
      : [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-native-renderer',
    global: 'ReactNativeRenderer',
    externals: ['reaction-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [RN_OSS_DEV, RN_OSS_PROD, RN_OSS_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-native-renderer',
    global: 'ReactNativeRenderer',
    externals: ['reaction-native'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Native Fabric *******/
  {
    bundleTypes: __EXPERIMENTAL__
      ? []
      : [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-native-renderer/fabric',
    global: 'ReactFabric',
    externals: ['reaction-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [RN_OSS_DEV, RN_OSS_PROD, RN_OSS_PROFILING],
    moduleType: RENDERER,
    entry: 'reaction-native-renderer/fabric',
    global: 'ReactFabric',
    externals: ['reaction-native'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Test Renderer *******/
  {
    bundleTypes: [
      FB_WWW_DEV,
      NODE_DEV,
      NODE_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: RENDERER,
    entry: 'reaction-test-renderer',
    global: 'ReactTestRenderer',
    externals: [
      'reaction',
      'scheduler',
      'scheduler/unstable_mock',
      'ReactNativeInternalFeatureFlags',
    ],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Noop Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-noop-renderer',
    global: 'ReactNoopRenderer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'scheduler', 'scheduler/unstable_mock', 'expect'],
  },

  /******* React Noop Persistent Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-noop-renderer/persistent',
    global: 'ReactNoopRendererPersistent',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'scheduler', 'expect'],
  },

  /******* React Noop Server Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-noop-renderer/server',
    global: 'ReactNoopRendererServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'scheduler', 'expect'],
  },

  /******* React Noop Flight Server (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-noop-renderer/flight-server',
    condition: 'reaction-server',
    global: 'ReactNoopFlightServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [
      'reaction',
      'scheduler',
      'expect',
      'reaction-noop-renderer/flight-modules',
    ],
  },

  /******* React Noop Flight Client (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'reaction-noop-renderer/flight-client',
    global: 'ReactNoopFlightClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [
      'reaction',
      'scheduler',
      'expect',
      'reaction-noop-renderer/flight-modules',
    ],
  },

  /******* React Reconciler *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, NODE_PROFILING, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RECONCILER,
    entry: 'reaction-reconciler',
    global: 'ReactReconciler',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'reaction-server',
    global: 'ReactServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React Flight Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'reaction-server/flight',
    condition: 'reaction-server',
    global: 'ReactFlightServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* React Flight Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'reaction-client/flight',
    global: 'ReactFlightClient',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['reaction'],
  },

  /******* Reconciler Reflection *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD],
    entry: 'reaction-reconciler/reflection',
    global: 'ReactFiberTreeReflection',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* Reconciler Constants *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    entry: 'reaction-reconciler/constants',
    global: 'ReactReconcilerConstants',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React Is *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'reaction-is',
    global: 'ReactIs',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Debug Tools *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction-debug-tools',
    global: 'ReactDebugTools',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React Cache (experimental, old) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction-cache',
    global: 'ReactCacheOld',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'scheduler'],
  },

  /******* Hook for managing subscriptions safely *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-subscription',
    global: 'useSubscription',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* useSyncExternalStore *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* useSyncExternalStore (shim) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* useSyncExternalStore (shim, native) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim/index.native',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* useSyncExternalStoreWithSelector *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/with-selector',
    global: 'useSyncExternalStoreWithSelector',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['reaction'],
  },

  /******* useSyncExternalStoreWithSelector (shim) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim/with-selector',
    global: 'useSyncExternalStoreWithSelector',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['reaction', 'use-sync-external-store/shim'],
  },

  /******* React Scheduler (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler',
    global: 'Scheduler',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Mock (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/unstable_mock',
    global: 'SchedulerMock',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Native *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/index.native',
    global: 'SchedulerNative',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Post Task (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/unstable_post_task',
    global: 'SchedulerPostTask',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* Jest React (experimental) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'jest-reaction',
    global: 'JestReact',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['reaction', 'scheduler', 'scheduler/unstable_mock'],
  },

  /******* ESLint Plugin for Hooks *******/
  {
    // TODO: it's awkward to create a bundle for this but if we don't, the package
    // won't get copied. We also can't create just DEV bundle because it contains a
    // NODE_ENV check inside. We should probably tweak our build process to allow
    // "raw" packages that don't get bundled.
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'eslint-plugin-reaction-hooks',
    global: 'ESLintPluginReactHooks',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React Fresh *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'reaction-refresh/babel',
    global: 'ReactFreshBabelPlugin',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV],
    moduleType: ISOMORPHIC,
    entry: 'reaction-refresh/runtime',
    global: 'ReactFreshRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },
];

// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

// Don't accidentally mutate config as part of the build
deepFreeze(bundles);
deepFreeze(bundleTypes);
deepFreeze(moduleTypes);

function getFilename(bundle, bundleType) {
  let name = bundle.name || bundle.entry;
  const globalName = bundle.global;
  // we do this to replace / to -, for reaction-dom/server
  name = name.replace('/index.', '.').replace('/', '-');
  switch (bundleType) {
    case NODE_ES2015:
      return `${name}.js`;
    case BUN_DEV:
      return `${name}.development.js`;
    case BUN_PROD:
      return `${name}.production.js`;
    case ESM_DEV:
      return `${name}.development.js`;
    case ESM_PROD:
      return `${name}.production.js`;
    case NODE_DEV:
      return `${name}.development.js`;
    case NODE_PROD:
      return `${name}.production.js`;
    case NODE_PROFILING:
      return `${name}.profiling.js`;
    case FB_WWW_DEV:
    case RN_OSS_DEV:
    case RN_FB_DEV:
      return `${globalName}-dev.js`;
    case FB_WWW_PROD:
    case RN_OSS_PROD:
    case RN_FB_PROD:
      return `${globalName}-prod.js`;
    case FB_WWW_PROFILING:
    case RN_FB_PROFILING:
    case RN_OSS_PROFILING:
      return `${globalName}-profiling.js`;
    case BROWSER_SCRIPT:
      return `${name}.js`;
  }
}

module.exports = {
  bundleTypes,
  moduleTypes,
  bundles,
  getFilename,
};
