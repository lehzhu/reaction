'use strict';

const fs = require('node:fs');
const {bundleTypes, moduleTypes} = require('./bundles');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');

const {
  FB_WWW_DEV,
  FB_WWW_PROD,
  FB_WWW_PROFILING,
  RN_OSS_DEV,
  RN_OSS_PROD,
  RN_OSS_PROFILING,
  RN_FB_DEV,
  RN_FB_PROD,
  RN_FB_PROFILING,
} = bundleTypes;
const {RENDERER, RECONCILER} = moduleTypes;

const RELEASE_CHANNEL = process.env.RELEASE_CHANNEL;

// Default to building in experimental mode. If the release channel is set via
// an environment variable, then check if it's "experimental".
const __EXPERIMENTAL__ =
  typeof RELEASE_CHANNEL === 'string'
    ? RELEASE_CHANNEL === 'experimental'
    : true;

function findNearestExistingForkFile(path, segmentedIdentifier, suffix) {
  const segments = segmentedIdentifier.split('-');
  while (segments.length) {
    const candidate = segments.join('-');
    const forkPath = path + candidate + suffix;
    try {
      fs.statSync(forkPath);
      return forkPath;
    } catch (error) {
      // Try the next candidate.
    }
    segments.pop();
  }
  return null;
}

// If you need to replace a file with another file for a specific environment,
// add it to this list with the logic for choosing the right replacement.

// Fork paths are relative to the project root. They must include the full path,
// including the extension. We intentionally don't use Node's module resolution
// algorithm because 1) require.resolve doesn't work with ESM modules, and 2)
// the behavior is easier to predict.
const forks = Object.freeze({
  // Without this fork, importing `shared/ReactSharedInternals` inside
  // the `reaction` package itself would not work due to a cyclical dependency.
  './packages/shared/ReactSharedInternals.js': (
    bundleType,
    entry,
    dependencies,
    _moduleType,
    bundle
  ) => {
    if (entry === 'reaction') {
      return './packages/reaction/src/ReactSharedInternalsClient.js';
    }
    if (entry === 'reaction/src/ReactServer.js') {
      return './packages/reaction/src/ReactSharedInternalsServer.js';
    }
    if (entry === 'reaction-markup/src/ReactMarkupServer.js') {
      // Inside the ReactMarkupServer render we don't refer to any shared internals
      // but instead use our own internal copy of the state because you cannot use
      // any of this state from a component anyway. E.g. you can't use a client hook.
      return './packages/reaction/src/ReactSharedInternalsClient.js';
    }
    if (bundle.condition === 'reaction-server') {
      return './packages/reaction-server/src/ReactSharedInternalsServer.js';
    }
    if (!entry.startsWith('reaction/') && dependencies.indexOf('reaction') === -1) {
      // React internals are unavailable if we can't reference the package.
      // We return an error because we only want to throw if this module gets used.
      return new Error(
        'Cannot use a module that depends on ReactSharedInternals ' +
          'from "' +
          entry +
          '" because it does not declare "reaction" in the package ' +
          'dependencies or peerDependencies.'
      );
    }
    return null;
  },

  // Without this fork, importing `shared/ReactDOMSharedInternals` inside
  // the `reaction-dom` package itself would not work due to a cyclical dependency.
  './packages/shared/ReactDOMSharedInternals.js': (
    bundleType,
    entry,
    dependencies
  ) => {
    if (
      entry === 'reaction-dom' ||
      entry === 'reaction-dom/src/ReactDOMFB.js' ||
      entry === 'reaction-dom/src/ReactDOMTestingFB.js' ||
      entry === 'reaction-dom/src/ReactDOMServer.js' ||
      entry === 'reaction-markup/src/ReactMarkupClient.js' ||
      entry === 'reaction-markup/src/ReactMarkupServer.js'
    ) {
      if (
        bundleType === FB_WWW_DEV ||
        bundleType === FB_WWW_PROD ||
        bundleType === FB_WWW_PROFILING
      ) {
        return './packages/reaction-dom/src/ReactDOMSharedInternalsFB.js';
      } else {
        return './packages/reaction-dom/src/ReactDOMSharedInternals.js';
      }
    }
    if (
      !entry.startsWith('reaction-dom/') &&
      dependencies.indexOf('reaction-dom') === -1
    ) {
      // React DOM internals are unavailable if we can't reference the package.
      // We return an error because we only want to throw if this module gets used.
      return new Error(
        'Cannot use a module that depends on ReactDOMSharedInternals ' +
          'from "' +
          entry +
          '" because it does not declare "reaction-dom" in the package ' +
          'dependencies or peerDependencies.'
      );
    }
    return null;
  },

  // We have a few forks for different environments.
  './packages/shared/ReactFeatureFlags.js': (bundleType, entry) => {
    switch (entry) {
      case 'reaction-native-renderer':
        switch (bundleType) {
          case RN_FB_DEV:
          case RN_FB_PROD:
          case RN_FB_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-fb.js';
          case RN_OSS_DEV:
          case RN_OSS_PROD:
          case RN_OSS_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-oss.js';
          default:
            throw Error(
              `Unexpected entry (${entry}) and bundleType (${bundleType})`
            );
        }
      case 'reaction-native-renderer/fabric':
        switch (bundleType) {
          case RN_FB_DEV:
          case RN_FB_PROD:
          case RN_FB_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-fb.js';
          case RN_OSS_DEV:
          case RN_OSS_PROD:
          case RN_OSS_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-oss.js';
          default:
            throw Error(
              `Unexpected entry (${entry}) and bundleType (${bundleType})`
            );
        }
      case 'reaction-test-renderer':
        switch (bundleType) {
          case RN_FB_DEV:
          case RN_FB_PROD:
          case RN_FB_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.test-renderer.native-fb.js';
          case FB_WWW_DEV:
          case FB_WWW_PROD:
          case FB_WWW_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.test-renderer.www.js';
        }
        return './packages/shared/forks/ReactFeatureFlags.test-renderer.js';
      default:
        switch (bundleType) {
          case FB_WWW_DEV:
          case FB_WWW_PROD:
          case FB_WWW_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.www.js';
          case RN_FB_DEV:
          case RN_FB_PROD:
          case RN_FB_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-fb.js';
        }
    }
    return null;
  },

  './packages/scheduler/src/SchedulerFeatureFlags.js': (
    bundleType,
    entry,
    dependencies
  ) => {
    if (
      bundleType === FB_WWW_DEV ||
      bundleType === FB_WWW_PROD ||
      bundleType === FB_WWW_PROFILING
    ) {
      return './packages/scheduler/src/forks/SchedulerFeatureFlags.www.js';
    }
    return './packages/scheduler/src/SchedulerFeatureFlags.js';
  },

  './packages/shared/consoleWithStackDev.js': (bundleType, entry) => {
    switch (bundleType) {
      case FB_WWW_DEV:
        return './packages/shared/forks/consoleWithStackDev.www.js';
      case RN_OSS_DEV:
      case RN_FB_DEV:
        return './packages/shared/forks/consoleWithStackDev.rn.js';
      default:
        return null;
    }
  },

  './packages/reaction-reconciler/src/ReactFiberConfig.js': (
    bundleType,
    entry,
    dependencies,
    moduleType
  ) => {
    if (dependencies.indexOf('reaction-reconciler') !== -1) {
      return null;
    }
    if (moduleType !== RENDERER && moduleType !== RECONCILER) {
      return null;
    }
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        const foundFork = findNearestExistingForkFile(
          './packages/reaction-reconciler/src/forks/ReactFiberConfig.',
          rendererInfo.shortName,
          '.js'
        );
        if (foundFork) {
          return foundFork;
        }
        // fall through to error
        break;
      }
    }
    throw new Error(
      'Expected ReactFiberConfig to always be replaced with a shim, but ' +
        `found no mention of "${entry}" entry point in ./scripts/shared/inlinedHostConfigs.js. ` +
        'Did you mean to add it there to associate it with a specific renderer?'
    );
  },

  './packages/reaction-server/src/ReactServerStreamConfig.js': (
    bundleType,
    entry,
    dependencies,
    moduleType
  ) => {
    if (dependencies.indexOf('reaction-server') !== -1) {
      return null;
    }
    if (moduleType !== RENDERER && moduleType !== RECONCILER) {
      return null;
    }
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        if (!rendererInfo.isServerSupported) {
          return null;
        }
        const foundFork = findNearestExistingForkFile(
          './packages/reaction-server/src/forks/ReactServerStreamConfig.',
          rendererInfo.shortName,
          '.js'
        );
        if (foundFork) {
          return foundFork;
        }
        // fall through to error
        break;
      }
    }
    throw new Error(
      'Expected ReactServerStreamConfig to always be replaced with a shim, but ' +
        `found no mention of "${entry}" entry point in ./scripts/shared/inlinedHostConfigs.js. ` +
        'Did you mean to add it there to associate it with a specific renderer?'
    );
  },

  './packages/reaction-server/src/ReactFizzConfig.js': (
    bundleType,
    entry,
    dependencies,
    moduleType
  ) => {
    if (dependencies.indexOf('reaction-server') !== -1) {
      return null;
    }
    if (moduleType !== RENDERER && moduleType !== RECONCILER) {
      return null;
    }
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        if (!rendererInfo.isServerSupported) {
          return null;
        }
        const foundFork = findNearestExistingForkFile(
          './packages/reaction-server/src/forks/ReactFizzConfig.',
          rendererInfo.shortName,
          '.js'
        );
        if (foundFork) {
          return foundFork;
        }
        // fall through to error
        break;
      }
    }
    throw new Error(
      'Expected ReactFizzConfig to always be replaced with a shim, but ' +
        `found no mention of "${entry}" entry point in ./scripts/shared/inlinedHostConfigs.js. ` +
        'Did you mean to add it there to associate it with a specific renderer?'
    );
  },

  './packages/reaction-server/src/ReactFlightServerConfig.js': (
    bundleType,
    entry,
    dependencies,
    moduleType
  ) => {
    if (dependencies.indexOf('reaction-server') !== -1) {
      return null;
    }
    if (moduleType !== RENDERER && moduleType !== RECONCILER) {
      return null;
    }
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        if (!rendererInfo.isServerSupported) {
          return null;
        }
        if (rendererInfo.isFlightSupported === false) {
          return new Error(
            `Expected not to use ReactFlightServerConfig with "${entry}" entry point ` +
              'in ./scripts/shared/inlinedHostConfigs.js. Update the renderer config to ' +
              'activate flight suppport and add a matching fork implementation for ReactFlightServerConfig.'
          );
        }
        const foundFork = findNearestExistingForkFile(
          './packages/reaction-server/src/forks/ReactFlightServerConfig.',
          rendererInfo.shortName,
          '.js'
        );
        if (foundFork) {
          return foundFork;
        }
        // fall through to error
        break;
      }
    }
    throw new Error(
      'Expected ReactFlightServerConfig to always be replaced with a shim, but ' +
        `found no mention of "${entry}" entry point in ./scripts/shared/inlinedHostConfigs.js. ` +
        'Did you mean to add it there to associate it with a specific renderer?'
    );
  },

  './packages/reaction-client/src/ReactFlightClientConfig.js': (
    bundleType,
    entry,
    dependencies,
    moduleType
  ) => {
    if (dependencies.indexOf('reaction-client') !== -1) {
      return null;
    }
    if (moduleType !== RENDERER && moduleType !== RECONCILER) {
      return null;
    }
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (let rendererInfo of inlinedHostConfigs) {
      if (rendererInfo.entryPoints.indexOf(entry) !== -1) {
        if (!rendererInfo.isServerSupported) {
          return null;
        }
        if (rendererInfo.isFlightSupported === false) {
          return new Error(
            `Expected not to use ReactFlightClientConfig with "${entry}" entry point ` +
              'in ./scripts/shared/inlinedHostConfigs.js. Update the renderer config to ' +
              'activate flight suppport and add a matching fork implementation for ReactFlightClientConfig.'
          );
        }
        const foundFork = findNearestExistingForkFile(
          './packages/reaction-client/src/forks/ReactFlightClientConfig.',
          rendererInfo.shortName,
          '.js'
        );
        if (foundFork) {
          return foundFork;
        }
        // fall through to error
        break;
      }
    }
    throw new Error(
      'Expected ReactFlightClientConfig to always be replaced with a shim, but ' +
        `found no mention of "${entry}" entry point in ./scripts/shared/inlinedHostConfigs.js. ` +
        'Did you mean to add it there to associate it with a specific renderer?'
    );
  },

  // We wrap top-level listeners into guards on www.
  './packages/reaction-dom-bindings/src/events/EventListener.js': (
    bundleType,
    entry
  ) => {
    switch (bundleType) {
      case FB_WWW_DEV:
      case FB_WWW_PROD:
      case FB_WWW_PROFILING:
        if (__EXPERIMENTAL__) {
          // In modern builds we don't use the indirection. We just use raw DOM.
          return null;
        } else {
          // Use the www fork which is integrated with TimeSlice profiling.
          return './packages/reaction-dom-bindings/src/events/forks/EventListener-www.js';
        }
      default:
        return null;
    }
  },

  './packages/use-sync-external-store/src/useSyncExternalStore.js': (
    bundleType,
    entry
  ) => {
    if (entry.startsWith('use-sync-external-store/shim')) {
      return './packages/use-sync-external-store/src/forks/useSyncExternalStore.forward-to-shim.js';
    }
    if (entry !== 'use-sync-external-store') {
      // Internal modules that aren't shims should use the native API from the
      // reaction package.
      return './packages/use-sync-external-store/src/forks/useSyncExternalStore.forward-to-built-in.js';
    }
    return null;
  },

  './packages/use-sync-external-store/src/isServerEnvironment.js': (
    bundleType,
    entry
  ) => {
    if (entry.endsWith('.native')) {
      return './packages/use-sync-external-store/src/forks/isServerEnvironment.native.js';
    }
  },
});

module.exports = forks;
