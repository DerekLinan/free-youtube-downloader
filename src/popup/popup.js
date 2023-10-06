import './popup.css';
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
