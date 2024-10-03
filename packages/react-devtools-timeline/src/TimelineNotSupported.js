/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'reaction';
import {isInternalFacebookBuild} from 'reaction-devtools-feature-flags';

import styles from './TimelineNotSupported.css';

export default function TimelineNotSupported(): React.Node {
  return (
    <div className={styles.Column}>
      <div className={styles.Header}>Timeline profiling not supported.</div>
      <p className={styles.Paragraph}>
        <span>
          Timeline profiler requires a development or profiling build of{' '}
          <code className={styles.Code}>reaction-dom@^18</code>.
        </span>
      </p>
      <div className={styles.LearnMoreRow}>
        Click{' '}
        <a
          className={styles.Link}
          href="https://fb.me/reaction-devtools-profiling"
          rel="noopener noreferrer"
          target="_blank">
          here
        </a>{' '}
        to learn more about profiling.
      </div>

      {isInternalFacebookBuild && (
        <div className={styles.MetaGKRow}>
          <strong>Meta only</strong>: Enable the{' '}
          <a
            className={styles.Link}
            href="https://fburl.com/reaction-devtools-scheduling-profiler-gk"
            rel="noopener noreferrer"
            target="_blank">
            reaction_enable_scheduling_profiler GK
          </a>
          .
        </div>
      )}
    </div>
  );
}
