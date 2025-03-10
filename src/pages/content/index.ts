// Content script
console.log('Deal Fairly content script loaded');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message, sender, sendResponse);
  
  if (message.action === 'analyzeCurrentPage') {
    analyzePage();
  }
  
  return true;
});

// Function to analyze the current page for deals
function analyzePage() {
  console.log('Analyzing page for deals...');
  
  // Example implementation - scan for price elements
  const priceElements = document.querySelectorAll('[class*="price"], [id*="price"], [class*="cost"], [id*="cost"]');
  
  console.log(`Found ${priceElements.length} potential price elements`);
  
  // If prices found, show notification
  if (priceElements.length > 0) {
    // Create floating notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid #3B82F6;
      border-radius: 8px;
      padding: 16px;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      max-width: 300px;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: bold; color: #3B82F6; margin-bottom: 8px;">Deal Fairly</div>
      <div>Found ${priceElements.length} pricing elements on this page. Click to analyze fairness.</div>
      <button id="df-analyze-btn" style="
        background: #3B82F6;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        margin-top: 12px;
        cursor: pointer;
      ">Analyze Deal</button>
      <button id="df-close-btn" style="
        background: #e5e7eb;
        color: #374151;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        margin-top: 12px;
        margin-left: 8px;
        cursor: pointer;
      ">Close</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listeners
    document.getElementById('df-analyze-btn')?.addEventListener('click', () => {
      notification.innerHTML = `
        <div style="font-weight: bold; color: #3B82F6; margin-bottom: 8px;">Deal Analysis</div>
        <div>This appears to be a fair deal based on market rates.</div>
        <div style="margin-top: 8px; display: flex; align-items: center;">
          <span style="color: #10B981; font-weight: bold; margin-right: 4px;">Fair Price</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <button id="df-close-analysis" style="
          background: #e5e7eb;
          color: #374151;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          margin-top: 12px;
          cursor: pointer;
        ">Close</button>
      `;
      
      document.getElementById('df-close-analysis')?.addEventListener('click', () => {
        notification.remove();
      });
    });
    
    document.getElementById('df-close-btn')?.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 10000);
  }
} 