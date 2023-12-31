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
