import {installHook} from 'reaction-devtools-shared/src/hook';

let resolveHookSettingsInjection;

function messageListener(event: MessageEvent) {
  if (event.source !== window) {
    return;
  }

  if (event.data.source === 'reaction-devtools-hook-settings-injector') {
    // In case handshake message was sent prior to hookSettingsInjector execution
    // We can't guarantee order
    if (event.data.payload.handshake) {
      window.postMessage({
        source: 'reaction-devtools-hook-installer',
        payload: {handshake: true},
      });
    } else if (event.data.payload.settings) {
      window.removeEventListener('message', messageListener);
      resolveHookSettingsInjection(event.data.payload.settings);
    }
  }
}

// Avoid double execution
if (!window.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
  const hookSettingsPromise = new Promise(resolve => {
    resolveHookSettingsInjection = resolve;
  });

  window.addEventListener('message', messageListener);
  window.postMessage({
    source: 'reaction-devtools-hook-installer',
    payload: {handshake: true},
  });

  // Can't delay hook installation, inject settings lazily
  installHook(window, hookSettingsPromise);

  // Detect React
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on(
    'renderer',
    function ({reactionBuildType}) {
      window.postMessage(
        {
          source: 'reaction-devtools-hook',
          payload: {
            type: 'reaction-renderer-attached',
            reactionBuildType,
          },
        },
        '*',
      );
    },
  );
}
