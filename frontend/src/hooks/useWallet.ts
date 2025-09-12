import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWalletStore } from '@/stores/walletStore';
import { useEffect } from 'react';

export const useWallet = () => {
  const solanaWallet = useSolanaWallet();
  const { setConnected, setPublicKey, setConnecting, setDisconnecting } = useWalletStore();

  useEffect(() => {
    setConnected(solanaWallet.connected);
    setPublicKey(solanaWallet.publicKey);
    setConnecting(solanaWallet.connecting);
    setDisconnecting(solanaWallet.disconnecting);
  }, [
    solanaWallet.connected,
    solanaWallet.publicKey,
    solanaWallet.connecting,
    solanaWallet.disconnecting,
    setConnected,
    setPublicKey,
    setConnecting,
    setDisconnecting,
  ]);

  return solanaWallet;
};
