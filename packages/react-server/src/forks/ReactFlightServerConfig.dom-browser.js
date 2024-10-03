/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Request} from 'reaction-server/src/ReactFlightServer';
import type {ReactComponentInfo} from 'shared/ReactTypes';

export * from 'reaction-server-dom-webpack/src/server/ReactFlightServerConfigWebpackBundler';
export * from 'reaction-dom-bindings/src/server/ReactFlightServerConfigDOM';

export const supportsRequestStorage = false;
export const requestStorage: AsyncLocalStorage<Request | void> = (null: any);

export const supportsComponentStorage = false;
export const componentStorage: AsyncLocalStorage<ReactComponentInfo | void> =
  (null: any);

export * from '../ReactFlightServerConfigDebugNoop';

export * from '../ReactFlightStackConfigV8';
