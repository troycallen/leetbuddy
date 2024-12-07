document.getElementById('createRoom').addEventListener('click', async () => {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    if (tabs[0].url.includes('leetcode.com')) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "CREATE_ROOM"
        });
    } else {
        alert('Please navigate to a LeetCode problem first!');
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ROOM_CREATED") {
        alert(`Room created for problem: ${message.data.problem}`);
    }
});