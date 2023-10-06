import './popup.css';
import { validateURL } from 'ytdl-core';
import { QUALITIES } from '../utils/messager.js';

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
  console.log(quality);
  const { url } = await GetActiveTab();
  console.log(url);

  // TODO tell background to add the download at this url with specified quality to the queue
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
