/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export {default as rendererVersion} from 'shared/ReactVersion';
export const rendererPackageName = 'reaction-server-dom-turbopack';

export * from 'reaction-client/src/ReactFlightClientStreamConfigWeb';
export * from 'reaction-client/src/ReactClientConsoleConfigBrowser';
export * from 'reaction-server-dom-turbopack/src/client/ReactFlightClientConfigBundlerTurbopack';
export * from 'reaction-server-dom-turbopack/src/client/ReactFlightClientConfigBundlerTurbopackBrowser';
export * from 'reaction-server-dom-turbopack/src/client/ReactFlightClientConfigTargetTurbopackBrowser';
export * from 'reaction-dom-bindings/src/shared/ReactFlightClientConfigDOM';
export const usedWithSSR = false;
