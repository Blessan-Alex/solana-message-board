import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPublicKey(publicKey: string | null, length: number = 8): string {
  if (!publicKey) return '';
  if (publicKey.length <= length * 2) return publicKey;
  return `${publicKey.slice(0, length)}...${publicKey.slice(-length)}`;
}

export function formatTimestamp(timestamp: number): string {
  // Handle invalid timestamps
  if (!timestamp || timestamp <= 0 || isNaN(timestamp)) {
    return 'Unknown time';
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
  
  // Handle very recent messages
  if (diff < 30000) return 'Just now'; // Less than 30 seconds
  if (diff < 60000) return '30s ago';
  if (diff < 120000) return '1m ago';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 7200000) return '1h ago';
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 172800000) return '1d ago';
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

export function generateGradient(): string {
  const gradients = [
    'from-purple-400 via-pink-500 to-red-500',
    'from-blue-400 via-purple-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-500',
    'from-yellow-400 via-red-500 to-pink-500',
    'from-indigo-400 via-purple-500 to-pink-500',
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
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
