import './popup.css';
import { validateURL } from 'ytdl-core';
import { sendMessageToBackground } from '../utils/messager.js';
import { BG_MESSAGE, QUALITIES, STATUS } from '../utils/types.js';

async function GetActiveTab() {
  return (
    await browser.tabs.query({ currentWindow: true, active: true })
  )[0];
}

/**
 * Downloads the youtube video given a specified quality
 * @param {string} quality string as specified by the QUALITIES object
 */
async function Download(quality) {
  const tab = await GetActiveTab();

  sendMessageToBackground(BG_MESSAGE.DOWNLOAD, {
    meta: {
      quality,
      title: tab.title,
      url: tab.url,
      status: STATUS.NOT_STARTED,
    },
  });
}

const { url: currentURL } = await GetActiveTab();

/**
 * Check if ydl can download from this page
 */
if (!validateURL(currentURL)) {
  document.getElementById('button-group').classList.add('hidden');
  document.getElementById('asterisk-text').classList.add('hidden');

  document.getElementById('error-content').classList.remove('hidden');
} else {
  /**
   * Initialize popup button listeners
   */
  document
    .getElementById('best')
    .addEventListener('click', () => Download(QUALITIES.BEST));
  document
    .getElementById('video')
    .addEventListener('click', () => Download(QUALITIES.VIDEO));
  document
    .getElementById('audio')
    .addEventListener('click', () => Download(QUALITIES.AUDIO));
  document
    .getElementById('fast')
    .addEventListener('click', () => Download(QUALITIES.FAST));
  document
    .getElementById('custom')
    .addEventListener('click', () => Download(QUALITIES.CUSTOM));
}
