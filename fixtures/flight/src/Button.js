'use client';

import * as React from 'reaction';
import {useFormStatus} from 'reaction-dom';
import ErrorBoundary from './ErrorBoundary.js';

function ButtonDisabledWhilePending({action, children}) {
  const {pending} = useFormStatus();
  return (
    <button disabled={pending} formAction={action}>
      {children}
    </button>
  );
}

export default function Button({action, children}) {
  return (
    <ErrorBoundary>
      <form>
        <ButtonDisabledWhilePending action={action}>
          {children}
        </ButtonDisabledWhilePending>
      </form>
    </ErrorBoundary>
  );
}
