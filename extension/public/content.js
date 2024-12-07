console.log('MeetCode extension loaded');

// Check if we're on a LeetCode problem page
if (window.location.pathname.includes('/problems/')) {
  console.log('On a LeetCode problem page');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CREATE_ROOM") {
        // Create a button element
        const roomButton = document.createElement('button');
        roomButton.textContent = 'MeetCode Room';
        roomButton.style.cssText = `
            background-color: #4f46e5;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            margin: 10px;
        `;
        
        // Find a good spot on LeetCode to inject our button
        const targetElement = document.querySelector('[data-cy="question-title"]');
        if (targetElement) {
            targetElement.parentElement.appendChild(roomButton);
            
            // Tell popup it worked
            chrome.runtime.sendMessage({
                type: "ROOM_CREATED",
                data: {
                    problem: targetElement.textContent,
                    timestamp: new Date().toISOString()
                }
            });
        }
    }
});