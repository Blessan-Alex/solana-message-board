import { describe, it, expect } from 'vitest';
import { formatPublicKey, formatTimestamp, validateMessage, generateGradient } from '@/utils';

describe('Utils', () => {
  describe('formatPublicKey', () => {
    it('formats public key correctly', () => {
      const key = '11111111111111111111111111111111';
      expect(formatPublicKey(key, 4)).toBe('1111...1111');
    });

    it('returns empty string for null', () => {
      expect(formatPublicKey(null)).toBe('');
    });

    it('returns full key if shorter than length', () => {
      const key = '123';
      expect(formatPublicKey(key, 4)).toBe('123');
    });
  });

  describe('formatTimestamp', () => {
    it('formats recent timestamps', () => {
      const now = Date.now();
      expect(formatTimestamp(now - 30000)).toBe('Just now');
    });

    it('formats minutes ago', () => {
      const now = Date.now();
      expect(formatTimestamp(now - 120000)).toBe('2m ago');
    });

    it('formats hours ago', () => {
      const now = Date.now();
      expect(formatTimestamp(now - 7200000)).toBe('2h ago');
    });
  });

  describe('validateMessage', () => {
    it('validates empty message', () => {
      const result = validateMessage('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message cannot be empty');
    });

    it('validates whitespace-only message', () => {
      const result = validateMessage('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message cannot be empty');
    });

    it('validates message too long', () => {
      const longMessage = 'a'.repeat(281);
      const result = validateMessage(longMessage);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message must be 280 characters or less');
    });

    it('validates good message', () => {
      const result = validateMessage('Hello Solana!');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('generateGradient', () => {
    it('returns a gradient string', () => {
      const gradient = generateGradient();
      expect(gradient).toMatch(/from-\w+-\d+ via-\w+-\d+ to-\w+-\d+/);
    });
  });
});
