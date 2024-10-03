/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export {default as rendererVersion} from 'shared/ReactVersion';
export const rendererPackageName = 'reaction-server-dom-esm';

export * from 'reaction-client/src/ReactFlightClientStreamConfigNode';
export * from 'reaction-client/src/ReactClientConsoleConfigServer';
export * from 'reaction-server-dom-esm/src/client/ReactFlightClientConfigBundlerESM';
export * from 'reaction-server-dom-esm/src/client/ReactFlightClientConfigTargetESMServer';
export * from 'reaction-dom-bindings/src/shared/ReactFlightClientConfigDOM';
export const usedWithSSR = true;
