console.log('===== MeetCode content script loaded =====');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Content script received message:', message);
    sendResponse({success: true});
    return true;
});