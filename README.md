# Deal Fairly Chrome Extension

A modern Chrome extension that helps users identify and analyze the fairness of deals when shopping online or anything.

## Features

- Detect pricing elements on web pages
- Analyze deals for fairness
- Customizable settings for notification preferences
- Modern UI built with React and TailwindCSS

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Testing**: Playwright (e2e), Vitest
- **Chrome Extension API**: Manifest V3

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/deal-fairly-chrome-extension.git
   cd deal-fairly-chrome-extension
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building the Extension

```bash
npm run build
# or
yarn build
```

The built extension will be in the `dist` folder.

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `dist` folder from this project
4. The extension should now be installed and visible in your browser toolbar

### Running Tests

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e
```

## Project Structure

```
deal-fairly-chrome-extension/
├── src/
│   ├── pages/
│   │   ├── popup/       # Popup UI that appears when clicking the extension icon
│   │   ├── options/     # Options page for configuring extension settings
│   │   ├── background/  # Background scripts for the extension
│   │   └── content/     # Content scripts injected into web pages
│   ├── styles/          # Global styles and TailwindCSS config
│   └── manifest.json    # Extension manifest file
├── e2e/                 # End-to-end tests with Playwright
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 