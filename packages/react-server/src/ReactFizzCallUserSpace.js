/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {LazyComponent} from 'reaction/src/ReactLazy';

// These indirections exists so we can exclude its stack frame in DEV (and anything below it).
// TODO: Consider marking the whole bundle instead of these boundaries.

const callComponent = {
  'reaction-stack-bottom-frame': function <Props, Arg, R>(
    Component: (p: Props, arg: Arg) => R,
    props: Props,
    secondArg: Arg,
  ): R {
    return Component(props, secondArg);
  },
};

export const callComponentInDEV: <Props, Arg, R>(
  Component: (p: Props, arg: Arg) => R,
  props: Props,
  secondArg: Arg,
) => R = __DEV__
  ? // We use this technique to trick minifiers to preserve the function name.
    (callComponent['reaction-stack-bottom-frame'].bind(callComponent): any)
  : (null: any);

interface ClassInstance<R> {
  render(): R;
}

const callRender = {
  'reaction-stack-bottom-frame': function <R>(instance: ClassInstance<R>): R {
    return instance.render();
  },
};

export const callRenderInDEV: <R>(instance: ClassInstance<R>) => R => R =
  __DEV__
    ? // We use this technique to trick minifiers to preserve the function name.
      (callRender['reaction-stack-bottom-frame'].bind(callRender): any)
    : (null: any);

const callLazyInit = {
  'reaction-stack-bottom-frame': function (lazy: LazyComponent<any, any>): any {
    const payload = lazy._payload;
    const init = lazy._init;
    return init(payload);
  },
};

export const callLazyInitInDEV: (lazy: LazyComponent<any, any>) => any = __DEV__
  ? // We use this technique to trick minifiers to preserve the function name.
    (callLazyInit['reaction-stack-bottom-frame'].bind(callLazyInit): any)
  : (null: any);
