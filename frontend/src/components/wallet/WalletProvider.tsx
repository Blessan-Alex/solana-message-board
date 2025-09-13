import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { MathWalletAdapter } from '@solana/wallet-adapter-mathwallet';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { config } from '@/config/env';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';
import '@/styles/wallet-modal.css';

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  // Use configured RPC endpoint
  const endpoint = useMemo(() => config.rpcUrl, []);

  // Create wallet adapters with Phantom as default
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.error('Wallet error:', error);
          // Don't throw the error, just log it
        }}
      >
        <WalletModalProvider 
          className="wallet-modal-wrapper"
        >
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
