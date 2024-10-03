/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'reaction';
import {StrictMode} from 'reaction';

export default function PartiallyStrictApp(): React.Node {
  return (
    <>
      <Child />
      <StrictMode>
        <StrictChild />
      </StrictMode>
    </>
  );
}

function Child() {
  return <Grandchild />;
}

function StrictChild() {
  return <Grandchild />;
}

function Grandchild() {
  return null;
}
