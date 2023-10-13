import { QUALITIES, STATUS } from '../utils/types.js';

/**
 * Download the youtube video from preset options
 * @param {DownloadObject} downloadObject
 */
async function downloadPresetQuality(downloadObject) {
  throw new Error('not implemented yet.');
}

/**
 * Download the youtube video from custom options
 * @param {DownloadObject} downloadObject
 */
async function downloadCustomQuality(downloadObject) {
  throw new Error('not implemented yet.');
}

/**
 * Change the status of the referenced download object. This is an intentional mutation/side effect.
 * @param {DownloadObject} downloadObject
 * @param {string} status
 * @param {*} error
 */
export function mutateStatus(downloadObject, status, error) {
  if (!Object.values(QUALITIES).includes(status))
    console.error(
      `Cannot update status to ${status}. Use STATUS object instead.`,
    );

  // eslint-disable-next-line no-param-reassign
  downloadObject.status = status;

  // eslint-disable-next-line no-param-reassign
  if (status === STATUS.ERROR) downloadObject.error = error;
}

/**
 * Download the youtube video and append the file reference to the downloadObject
 * @param {DownloadObject} downloadObject the download to check
 */
export default async function downloadYoutubeVideo(downloadObject) {
  mutateStatus(downloadObject, STATUS.DOWNLOADING);
  try {
    switch (downloadObject.quality) {
      case QUALITIES.BEST:
      case QUALITIES.VIDEO:
      case QUALITIES.AUDIO:
      case QUALITIES.FAST:
        await downloadPresetQuality(downloadObject);
        break;
      case QUALITIES.CUSTOM:
        await downloadCustomQuality(downloadObject);
        break;
      default:
        console.log(
          `unknown download quality: ${downloadObject.quality}`,
        );
        throw Error(
          `unknown download quality: ${downloadObject.quality}`,
        );
    }
    mutateStatus(downloadObject, STATUS.FINISHED);
  } catch (error) {
    console.error(error);
    mutateStatus(downloadObject, STATUS.ERROR, error);
  }
}
