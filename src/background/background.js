import {
  isDownloadInQueue,
  removeFromQueue,
} from '../utils/download.js';
import { BG_MESSAGE } from '../utils/types.js';
import downloadYoutubeVideo from './ytdl.js';

// eslint-disable-next-line prefer-const
let downloadQueue = [];
let isDownloading = false;

/**
 * Handle downloading status and queue logic
 * @param {import('../utils/types.js').DownloadObject} toDownload
 * @returns
 */
async function download(toDownload) {
  if (isDownloading) return;
  isDownloading = true;

  await downloadYoutubeVideo(toDownload);

  removeFromQueue(toDownload, downloadQueue);

  isDownloading = false;
  if (downloadQueue.length > 0) download(downloadQueue[0]);
}

/**
 * Adds the downloadObject to the queue if it does not already exist in the queue.
 * @param {import('../utils/types.js').DownloadObject} downloadObject
 */
function addToQueue(downloadObject) {
  if (isDownloadInQueue(downloadObject, downloadQueue)) return;

  downloadQueue.push(downloadObject);

  if (!isDownloading) download(downloadQueue[0]);
  console.log(downloadQueue);
}

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case BG_MESSAGE.DOWNLOAD:
      addToQueue(message.data);
      break;
    case BG_MESSAGE.CANCEL:
      // TODO handle cancelation of video download
      break;
    default:
      console.log(`unknown command: ${message.type}`);
  }
});
