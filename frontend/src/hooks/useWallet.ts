import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

// Simple wrapper around Solana wallet adapter - no redundant state management
export const useWallet = () => {
  return useSolanaWallet();
};
