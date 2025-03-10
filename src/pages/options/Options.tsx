import React, { useState, useEffect } from 'react';

interface Settings {
  notifications: boolean;
  autoScan: boolean;
  dealThreshold: 'low' | 'medium' | 'high';
}

const Options: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    autoScan: false,
    dealThreshold: 'medium'
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Load settings on component mount
  useEffect(() => {
    chrome.storage.sync.get('settings', (data) => {
      if (data.settings) {
        setSettings(data.settings);
      }
    });
  }, []);

  // Save settings
  const saveSettings = () => {
    setIsSaving(true);
    setSaveStatus('');

    chrome.storage.sync.set({ settings }, () => {
      setIsSaving(false);
      setSaveStatus('Settings saved successfully');
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    });
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSettings(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-600">Deal Fairly</h1>
        <p className="text-gray-600 mt-2">Configure your extension settings</p>
      </header>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="notifications" className="font-medium">
                  Enable Notifications
                </label>
                <p className="text-gray-500 text-sm">
                  Show notifications when deals are detected
                </p>
              </div>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`block w-12 h-6 rounded-full transition-colors ${settings.notifications ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${settings.notifications ? 'translate-x-6' : ''}`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="autoScan" className="font-medium">
                  Auto-Scan Pages
                </label>
                <p className="text-gray-500 text-sm">
                  Automatically scan for deals when visiting a page
                </p>
              </div>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox"
                  id="autoScan"
                  name="autoScan"
                  checked={settings.autoScan}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`block w-12 h-6 rounded-full transition-colors ${settings.autoScan ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${settings.autoScan ? 'translate-x-6' : ''}`} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Deal Analysis</h2>
          
          <div className="mb-4">
            <label htmlFor="dealThreshold" className="block font-medium mb-2">
              Deal Fairness Threshold
            </label>
            <select
              id="dealThreshold"
              name="dealThreshold"
              value={settings.dealThreshold}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low - Flag only very unfair deals</option>
              <option value="medium">Medium - Balanced detection</option>
              <option value="high">High - Flag even slightly unfair deals</option>
            </select>
            <p className="text-gray-500 text-sm mt-1">
              Set how sensitive the extension should be when detecting unfair deals
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center">
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className={`px-6 py-2 rounded-md text-white font-medium ${
            isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
        
        {saveStatus && (
          <span className="ml-4 text-green-600">{saveStatus}</span>
        )}
      </div>
    </div>
  );
};

export default Options; 