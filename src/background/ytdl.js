import { QUALITIES, STATUS } from '../utils/types';

/**
 *
 * @param {DownloadObject} downloadObject
 */
async function downloadPresetQuality(downloadObject) {}

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
  mutateStatus(STATUS.DOWNLOADING);
  try {
    switch (downloadObject.quality) {
      case QUALITIES.BEST:
      case QUALITIES.VIDEO:
      case QUALITIES.AUDIO:
      case QUALITIES.FAST:
        await downloadPresetQuality(downloadObject);
        break;
      case QUALITIES.CUSTOM:
        // TODO downloadCustomQuality(downloadObject)
        break;
      default:
        console.log(
          `unknown download quality: ${downloadObject.quality}`,
        );
        throw Error(
          `unknown download quality: ${downloadObject.quality}`,
        );
    }
    mutateStatus(STATUS.FINISHED);
  } catch (error) {
    console.error(error);
    mutateStatus(STATUS.ERROR, error);
  }
}
