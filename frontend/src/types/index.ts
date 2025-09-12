import React from 'react';
import { PublicKey } from '@solana/web3.js';

export interface Message {
  author: PublicKey;
  content: string;
  timestamp?: number;
  accountAddress?: PublicKey;
}

export interface MessageAccount {
  author: PublicKey;
  content: string;
}

export interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  connecting: boolean;
  disconnecting: boolean;
}

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  wallet: WalletState;
  messages: MessagesState;
}

export interface SolanaConfig {
  network: 'localnet' | 'devnet' | 'mainnet-beta';
  programId: string;
  rpcUrl?: string;
}

export interface ProgramAccounts {
  message: PublicKey;
  author: PublicKey;
  systemProgram: PublicKey;
}

export interface PostMessageParams {
  content: string;
  author: PublicKey;
}

export interface GlassmorphismProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'card' | 'button' | 'modal' | 'input';
  hover?: boolean;
}

export interface WalletAdapter {
  name: string;
  url: string;
  icon: string;
  adapter: any;
}

// Standard Wallet API types
declare global {
  interface Window {
    solana?: {
      publicKey: PublicKey | null;
      isConnected: boolean;
      signTransaction: (transaction: any) => Promise<any>;
      signAllTransactions: (transactions: any[]) => Promise<any[]>;
      sendTransaction: (transaction: any, connection: any, options?: any) => Promise<string>;
      connect: () => Promise<{ publicKey: PublicKey }>;
      disconnect: () => Promise<void>;
    };
  }
}