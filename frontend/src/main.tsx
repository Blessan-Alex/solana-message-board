import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Filter out Chrome extension errors from console
const originalError = console.error;
console.error = (...args) => {
  const message = args[0]?.toString() || '';
  // Filter out Chrome extension content script errors
  if (message.includes('Cannot find menu item with id') || 
      message.includes('chrome-extension://invalid/') ||
      message.includes('content-all.js')) {
    return;
  }
  originalError.apply(console, args);
};

// Polyfill for buffer and other Node.js modules
import { Buffer } from 'buffer'
window.Buffer = Buffer

// Polyfill for process
if (typeof window !== 'undefined') {
  (window as any).process = {
    env: {},
    version: '',
    versions: {},
    platform: 'browser',
    nextTick: (fn: Function) => setTimeout(fn, 0),
  };
}

// Suppress Lit dev mode warnings
if (typeof window !== 'undefined') {
  (window as any).litDisableBundleWarning = true;
}

// Debug wallet availability
if (typeof window !== 'undefined') {
  console.log('Window solana object:', (window as any).solana);
  console.log('Is Phantom available:', (window as any).solana?.isPhantom);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
