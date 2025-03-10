import React, { useState, useEffect } from 'react';

const Popup: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setUrl(tabs[0].url);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-80 p-4 bg-white">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Deal Fairly</h1>
        <p className="text-gray-600 text-sm">Make fair deals online</p>
      </header>

      <div className="mb-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="text-sm truncate">Current site: {url}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
          onClick={() => chrome.runtime.sendMessage({ action: 'checkDeal' })}
        >
          Check Deal Fairness
        </button>
        <button 
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-150"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Popup; 