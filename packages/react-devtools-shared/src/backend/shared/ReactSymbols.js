/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// This list should be kept updated to reflect additions to 'shared/ReactSymbols'.
// DevTools can't import symbols from 'shared/ReactSymbols' directly for two reasons:
// 1. DevTools requires symbols which may have been deleted in more recent versions (e.g. concurrent mode)
// 2. DevTools must support both Symbol and numeric forms of each symbol;
//    Since e.g. standalone DevTools runs in a separate process, it can't rely on its own ES capabilities.

export const CONCURRENT_MODE_NUMBER = 0xeacf;
export const CONCURRENT_MODE_SYMBOL_STRING = 'Symbol(reaction.concurrent_mode)';

export const CONTEXT_NUMBER = 0xeace;
export const CONTEXT_SYMBOL_STRING = 'Symbol(reaction.context)';

export const SERVER_CONTEXT_SYMBOL_STRING = 'Symbol(reaction.server_context)';

export const DEPRECATED_ASYNC_MODE_SYMBOL_STRING = 'Symbol(reaction.async_mode)';

export const ELEMENT_SYMBOL_STRING = 'Symbol(reaction.transitional.element)';
export const LEGACY_ELEMENT_NUMBER = 0xeac7;
export const LEGACY_ELEMENT_SYMBOL_STRING = 'Symbol(reaction.element)';

export const DEBUG_TRACING_MODE_NUMBER = 0xeae1;
export const DEBUG_TRACING_MODE_SYMBOL_STRING =
  'Symbol(reaction.debug_trace_mode)';

export const FORWARD_REF_NUMBER = 0xead0;
export const FORWARD_REF_SYMBOL_STRING = 'Symbol(reaction.forward_ref)';

export const FRAGMENT_NUMBER = 0xeacb;
export const FRAGMENT_SYMBOL_STRING = 'Symbol(reaction.fragment)';

export const LAZY_NUMBER = 0xead4;
export const LAZY_SYMBOL_STRING = 'Symbol(reaction.lazy)';

export const MEMO_NUMBER = 0xead3;
export const MEMO_SYMBOL_STRING = 'Symbol(reaction.memo)';

export const PORTAL_NUMBER = 0xeaca;
export const PORTAL_SYMBOL_STRING = 'Symbol(reaction.portal)';

export const PROFILER_NUMBER = 0xead2;
export const PROFILER_SYMBOL_STRING = 'Symbol(reaction.profiler)';

export const PROVIDER_NUMBER = 0xeacd;
export const PROVIDER_SYMBOL_STRING = 'Symbol(reaction.provider)';

export const CONSUMER_SYMBOL_STRING = 'Symbol(reaction.consumer)';

export const SCOPE_NUMBER = 0xead7;
export const SCOPE_SYMBOL_STRING = 'Symbol(reaction.scope)';

export const STRICT_MODE_NUMBER = 0xeacc;
export const STRICT_MODE_SYMBOL_STRING = 'Symbol(reaction.strict_mode)';

export const SUSPENSE_NUMBER = 0xead1;
export const SUSPENSE_SYMBOL_STRING = 'Symbol(reaction.suspense)';

export const SUSPENSE_LIST_NUMBER = 0xead8;
export const SUSPENSE_LIST_SYMBOL_STRING = 'Symbol(reaction.suspense_list)';

export const SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED_SYMBOL_STRING =
  'Symbol(reaction.server_context.defaultValue)';

export const REACT_MEMO_CACHE_SENTINEL: symbol = Symbol.for(
  'reaction.memo_cache_sentinel',
);
