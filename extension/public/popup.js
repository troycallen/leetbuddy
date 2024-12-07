document.getElementById('createRoom').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Make sure we're on LeetCode
        if (tabs[0].url.includes('leetcode.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "CREATE_ROOM"
            });
        } else {
            alert('Please navigate to a LeetCode problem first!');
        }
    });
});