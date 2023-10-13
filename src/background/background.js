import {
  isDownloadInQueue,
  removeFromQueue,
} from '../utils/download.js';
import { MESSAGE_TYPE } from '../utils/messager.js';
import downloadYoutubeVideo from './ytdl.js';

// eslint-disable-next-line prefer-const
let downloadQueue = [];
let isDownloading = false;

async function download(toDownload) {
  if (isDownloading) return;
  isDownloading = true;

  await downloadYoutubeVideo(toDownload);

  removeFromQueue(toDownload, downloadQueue);

  isDownloading = false;
  if (downloadQueue.length > 0) download(downloadQueue[0]);
}

function addToQueue(data) {
  const { meta } = data;
  if (isDownloadInQueue(meta, downloadQueue)) return;

  downloadQueue.push(data);

  if (!isDownloading) download(downloadQueue[0]);
  console.log(downloadQueue);
}

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case MESSAGE_TYPE.DOWNLOAD:
      addToQueue(message.data);
      break;
    case MESSAGE_TYPE.CANCEL:
      // TODO handle cancelation of video download
      break;
    default:
      console.log(`unknown command: ${message.type}`);
  }
});
