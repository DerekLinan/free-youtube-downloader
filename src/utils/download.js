/**
 * Checks if the downloadObject a is the same as b
 * @returns {boolean}
 */
export function isSameDownload(a, b) {
  return (
    a.meta.url === b.url &&
    a.meta.title === b.title &&
    a.meta.quality === b.quality
  );
}

/**
 * Checks if download object is in the queue
 * @param {{quality: string, title: string, url: string, status: string}} downloadObject the download to check
 * @param {Array.<{quality: string, title: string, url: string, status: string}>} downloadQueue the queue of youtube videos to download
 * @returns {boolean}
 */
export function isDownloadInQueue(downloadObject, downloadQueue) {
  return !downloadQueue.every(
    (download) => !isSameDownload(download, downloadObject),
  );
}

/**
 * Removes the download object from the queue
 * @param {{quality: string, title: string, url: string}} objectToRemove
 * @param {Array.<{quality: string, title: string, url: string}>} downloadQueue
 */
export function removeFromQueue(objectToRemove, downloadQueue) {
  // eslint-disable-next-line no-param-reassign, no-unused-vars
  downloadQueue = downloadQueue.filter((queue) =>
    isSameDownload(objectToRemove, queue),
  );
}
