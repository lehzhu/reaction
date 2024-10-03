'use strict';

throw new Error(
  'The React Server Writer cannot be used outside a reaction-server environment. ' +
    'You must configure Node.js using the `--conditions reaction-server` flag.'
);
