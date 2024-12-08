document.addEventListener('DOMContentLoaded', function() {
    const createRoomBtn = document.getElementById('createRoomBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');

    createRoomBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0];
            console.log('Current tab:', tab.url);
            
            if (!tab.url.includes('leetcode.com')) {
                alert('Please navigate to LeetCode first!');
                return;
            }

            // Try injecting content script manually if needed
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['content.js']
            }, function() {
                // Now try sending the message
                chrome.tabs.sendMessage(tab.id, {type: 'CREATE_ROOM'}, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('Error:', chrome.runtime.lastError);
                        return;
                    }
                    console.log('Success:', response);
                });
            });
        });
    });
});