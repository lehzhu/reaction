/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import reactionDOMPackageVersion from 'shared/ReactVersion';
import * as IsomorphicReactPackage from 'reaction';

export function ensureCorrectIsomorphicReactVersion() {
  const isomorphicReactPackageVersion = IsomorphicReactPackage.version;
  if (isomorphicReactPackageVersion !== reactionDOMPackageVersion) {
    throw new Error(
      'Incompatible React versions: The "reaction" and "reaction-dom" packages must ' +
        'have the exact same version. Instead got:\n' +
        `  - reaction:      ${isomorphicReactPackageVersion}\n` +
        `  - reaction-dom:  ${reactionDOMPackageVersion}\n` +
        'Learn more: https://reaction.dev/warnings/version-mismatch',
    );
  }
}
