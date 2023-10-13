export async function sendMessageToBackground(type, data = null) {
  try {
    return await browser.runtime.sendMessage({ type, data });
  } catch (error) {
    console.error('Error sending message to background.');
    console.error(error);
    return null;
  }
}

export async function sendMessageToContentScript(
  tabID,
  type,
  data = null,
) {
  try {
    return await browser.tabs.sendMessage(tabID, { type, data });
  } catch (error) {
    console.error('Error sending message to content script.');
    console.error(error);
    return null;
  }
}

export const MESSAGE_TYPE = {
  DOWNLOAD: 'download',
  CANCEL: 'cancel',
};

export const QUALITIES = {
  BEST: 'best quality',
  VIDEO: 'video only',
  AUDIO: 'audio only ',
  FAST: 'fastest quality',
  CUSTOM: 'custom quality',
};

/**
 * Enum for the status of a downloadObject
 * @readonly
 * @enum {string}
 */
export const STATUS = {
  NOT_STARTED: 'not yet started',
  DOWNLOADING: 'downloading',
  FINISHED: 'finished',
  ERROR: 'error occurred',
  RETRY: 're-try queued',
};
