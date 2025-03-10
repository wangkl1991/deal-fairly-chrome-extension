// Background script
console.log('Background script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message in background:', message, sender, sendResponse);
  
  if (message.action === 'checkDeal') {
    // Example of background script functionality
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: 'analyzeCurrentPage' });
      }
    });
  }
  
  // Return true to indicate async response
  return true;
});

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
  
  // Initialize storage on install
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      settings: {
        notifications: true,
        autoScan: false,
        dealThreshold: 'medium'
      }
    }, () => {
      console.log('Default settings initialized');
    });
  }
}); 