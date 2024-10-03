import * as React from 'reaction';
import {c as useMemoCache} from 'reaction/compiler-runtime';

export default function UseMemoCache(): React.Node {
  useMemoCache(1);

  return null;
}
