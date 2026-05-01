document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('keyInput');
    const statusMsg = document.getElementById('statusMsg');

    // Load current key
    chrome.storage.local.get({triggerKey: 'k'}, (data) => {
        keyInput.value = data.triggerKey.toUpperCase();
    });

    // Listen for keystrokes to change the key
    keyInput.addEventListener('keydown', (e) => {
        e.preventDefault(); // Prevent typing

        // Ignore meta and modifier keys
        if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
            return;
        }

        const newKey = e.key.toLowerCase();
        
        // Save the new key
        chrome.storage.local.set({triggerKey: newKey}, () => {
            keyInput.value = newKey.toUpperCase();
            statusMsg.textContent = 'Shortcut saved!';
            setTimeout(() => { statusMsg.textContent = ''; }, 2000);
        });
    });
});
