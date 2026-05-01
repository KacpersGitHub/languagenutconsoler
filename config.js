chrome.storage.local.get({triggerKey: 'k'}, function(data) {
    // Send the current key to the MAIN world script
    window.postMessage({ type: 'SET_CONSOLE_HELPER_KEY', key: data.triggerKey }, '*');
});

// Listen for updates from the popup
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.triggerKey) {
        window.postMessage({ type: 'SET_CONSOLE_HELPER_KEY', key: changes.triggerKey.newValue }, '*');
    }
});
