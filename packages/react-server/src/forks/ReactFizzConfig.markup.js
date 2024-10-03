/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type {Request} from 'reaction-server/src/ReactFizzServer';

export * from 'reaction-markup/src/ReactFizzConfigMarkup.js';

export * from 'reaction-client/src/ReactClientConsoleConfigPlain';

export const supportsRequestStorage = false;
export const requestStorage: AsyncLocalStorage<Request | void> = (null: any);
