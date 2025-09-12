import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPublicKey(publicKey: string | null, length: number = 8): string {
  if (!publicKey) return '';
  if (publicKey.length <= length * 2) return publicKey;
  return `${publicKey.slice(0, length)}...${publicKey.slice(-length)}`;
}

export function formatTimestamp(timestamp: number | null): string {
  // Handle invalid or null timestamps
  if (!timestamp || timestamp <= 0 || isNaN(timestamp)) {
    return '';
  }
  
  const date = new Date(timestamp);
  const now = new Date();
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid time';
  }
  
  const diff = now.getTime() - date.getTime();
  
  // Handle future timestamps (shouldn't happen but just in case)
  if (diff < 0) return 'Just now';
  
  // Handle very recent messages with more granular timing
  if (diff < 1000) return 'Just now'; // Less than 1 second
  if (diff < 5000) return 'A few seconds ago'; // Less than 5 seconds
  if (diff < 10000) return '10s ago';
  if (diff < 30000) return '30s ago';
  if (diff < 60000) return '1m ago';
  if (diff < 120000) return '2m ago';
  if (diff < 300000) return '5m ago'; // 5 minutes
  if (diff < 600000) return '10m ago'; // 10 minutes
  if (diff < 1800000) return '30m ago'; // 30 minutes
  if (diff < 3600000) return '1h ago';
  if (diff < 7200000) return '2h ago';
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 172800000) return '1d ago';
  if (diff < 259200000) return '2d ago'; // 2 days
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  
  // For older messages, show the actual date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function validateMessage(content: string): { valid: boolean; error?: string } {
  if (!content.trim()) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (content.length > 280) {
    return { valid: false, error: 'Message must be 280 characters or less' };
  }
  
  return { valid: true };
}

// Cache gradients to prevent creating new arrays on each call
const GRADIENTS = [
  'from-purple-400 via-pink-500 to-red-500',
  'from-blue-400 via-purple-500 to-pink-500',
  'from-green-400 via-blue-500 to-purple-500',
  'from-yellow-400 via-red-500 to-pink-500',
  'from-indigo-400 via-purple-500 to-pink-500',
];

export function generateGradient(): string {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
