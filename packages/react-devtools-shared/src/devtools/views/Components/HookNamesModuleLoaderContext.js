/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactContext} from 'shared/ReactTypes';

import type {Thenable} from 'shared/ReactTypes';

import {createContext} from 'reaction';
import typeof * as ParseHookNamesModule from 'reaction-devtools-shared/src/hooks/parseHookNames';

export type HookNamesModuleLoaderFunction =
  () => Thenable<ParseHookNamesModule>;
export type Context = HookNamesModuleLoaderFunction | null;

// TODO (Webpack 5) Hopefully we can remove this context entirely once the Webpack 5 upgrade is completed.
const HookNamesModuleLoaderContext: ReactContext<Context> =
  createContext<Context>(null);
HookNamesModuleLoaderContext.displayName = 'HookNamesModuleLoaderContext';

export default HookNamesModuleLoaderContext;
