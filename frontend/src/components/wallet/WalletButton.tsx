import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { formatPublicKey } from '@/utils';

export const WalletButton: React.FC = () => {
  const { connected, publicKey, connecting } = useWallet();

  if (connected && publicKey) {
    return (
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-cream-light/80 backdrop-blur-lg border border-primary-red/20 rounded-xl px-3 py-2">
          <span className="text-black-pure/80 text-sm font-medium">
            {formatPublicKey(publicKey.toString())}
          </span>
        </div>
        <WalletDisconnectButton className="!bg-primary-red !text-cream-light !border !border-primary-red !rounded-xl hover:!bg-primary-red/80 !transition-all !duration-300 !font-medium !text-sm !px-4 !py-2" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <WalletMultiButton 
        className="!bg-primary-red !text-cream-light !border !border-primary-red !rounded-xl hover:!bg-primary-red/80 !transition-all !duration-300 !font-medium !text-sm !px-4 !py-2"
        disabled={connecting}
      />
    </motion.div>
  );
};
