console.log('MeetCode extension loaded');

// Check if we're on a LeetCode problem page
if (window.location.pathname.includes('/problems/')) {
  console.log('On a LeetCode problem page');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CREATE_ROOM") {
        // Get problem info from LeetCode page
        const problemTitle = document.querySelector('[data-cy="question-title"]')?.textContent;
        
        // Send back to popup
        chrome.runtime.sendMessage({
            type: "ROOM_CREATED",
            data: {
                problem: problemTitle,
                timestamp: new Date().toISOString()
            }
        });
    }
});