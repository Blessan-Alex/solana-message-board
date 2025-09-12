import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';
import { WalletState } from '@/types';

interface WalletStore extends WalletState {
  setConnected: (connected: boolean) => void;
  setPublicKey: (publicKey: PublicKey | null) => void;
  setConnecting: (connecting: boolean) => void;
  setDisconnecting: (disconnecting: boolean) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  connected: false,
  publicKey: null,
  connecting: false,
  disconnecting: false,
  
  setConnected: (connected) => set({ connected }),
  setPublicKey: (publicKey) => set({ publicKey }),
  setConnecting: (connecting) => set({ connecting }),
  setDisconnecting: (disconnecting) => set({ disconnecting }),
  
  reset: () => set({
    connected: false,
    publicKey: null,
    connecting: false,
    disconnecting: false,
  }),
}));
