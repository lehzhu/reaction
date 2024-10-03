/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {SharedStateServer} from 'reaction/src/ReactSharedInternalsServer';

import * as React from 'reaction';

const ReactSharedInternalsServer: SharedStateServer =
  // $FlowFixMe: It's defined in the one we resolve to.
  React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

if (!ReactSharedInternalsServer) {
  throw new Error(
    'The "reaction" package in this environment is not configured correctly. ' +
      'The "reaction-server" condition must be enabled in any environment that ' +
      'runs React Server Components.',
  );
}

export default ReactSharedInternalsServer;
