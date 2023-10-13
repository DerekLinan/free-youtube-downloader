/**
 * @typedef DownloadObject
 * @property {string} quality
 * @property {string} title
 * @property {string} url
 * @property {string} status
 * @property {string | undefined} error
 */

/**
 * @typedef BGMessage
 * @property {string} DOWNLOAD
 * @property {string} CANCEL
 */

/**
 * Enum for the message to send between the background and frontend scripts
 * @readonly
 * @enum {BGMessage}
 */
export const BG_MESSAGE = {
  DOWNLOAD: 'download',
  CANCEL: 'cancel',
};

/**
 * @typedef Qualities
 * @property {string} BEST
 * @property {string} VIDEO
 * @property {string} AUDIO
 * @property {string} FAST
 * @property {string} CUSTOM
 */

/**
 * Enum for quality/button options available for youtube video download
 * @readonly
 * @enum {Qualities}
 */
export const QUALITIES = {
  BEST: 'best quality',
  VIDEO: 'video only',
  AUDIO: 'audio only ',
  FAST: 'fastest quality',
  CUSTOM: 'custom quality',
};

/**
 * @typedef Status
 * @property {string} NOT_STARTED
 * @property {string} DOWNLOADING
 * @property {string} FINISHED
 * @property {string} ERROR
 * @property {string} RETRY
 */

/**
 * Enum for the status of a downloadObject
 * @readonly
 * @enum {Status}
 */
export const STATUS = {
  NOT_STARTED: 'not yet started',
  DOWNLOADING: 'downloading',
  FINISHED: 'finished',
  ERROR: 'error occurred',
  RETRY: 're-try queued',
};
