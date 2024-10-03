/* global chrome */

'use strict';

function setExtensionIconAndPopup(reactionBuildType, tabId) {
  chrome.action.setIcon({
    tabId,
    path: {
      '16': chrome.runtime.getURL(`icons/16-${reactionBuildType}.png`),
      '32': chrome.runtime.getURL(`icons/32-${reactionBuildType}.png`),
      '48': chrome.runtime.getURL(`icons/48-${reactionBuildType}.png`),
      '128': chrome.runtime.getURL(`icons/128-${reactionBuildType}.png`),
    },
  });

  chrome.action.setPopup({
    tabId,
    popup: chrome.runtime.getURL(`popups/${reactionBuildType}.html`),
  });
}

export default setExtensionIconAndPopup;
