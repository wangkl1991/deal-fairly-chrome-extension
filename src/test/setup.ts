// Mock Chrome API
import { vi } from 'vitest';

// Mock chrome API
const chrome = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
    },
    onInstalled: {
      addListener: vi.fn(),
    },
    openOptionsPage: vi.fn(),
  },
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
  storage: {
    sync: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
};

// Add it to the global object
(global as any).chrome = chrome; 