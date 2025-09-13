import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ArrowRight, 
  Shield, 
  Lock,
  Eye
} from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { useWallet } from '@/hooks/useWallet';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const { connected } = useWallet();

  // Auto-redirect when wallet is connected
  React.useEffect(() => {
    if (connected) {
      onLoginSuccess();
    }
  }, [connected, onLoginSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-primary-red/20 to-black-pure">
      {/* Tunnel Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tunnel walls effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-red/10 via-transparent to-primary-red/10" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cream-light/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-beige-soft/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary-red/50 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-cream-light/20 rounded-full animate-pulse delay-3000" />
        
        {/* Tunnel depth effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary-red/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-cream-light/10 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Simple Back Button */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassButton
            onClick={onBackToLanding}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Landing</span>
          </GlassButton>
        </motion.div>

        {/* Main Login Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-cream-light/10 backdrop-blur-sm border border-primary-red/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Lock className="w-5 h-5 text-primary-red" />
              <span className="text-beige-soft font-medium">Secure Access Required</span>
              <Lock className="w-5 h-5 text-primary-red" />
            </motion.div>

            <motion.h2
              className="text-5xl font-bold text-cream-light mb-6 font-heading leading-tight"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              Connect Your Wallet
            </motion.h2>
            
            <motion.div
              className="flex items-center justify-center space-x-4 mb-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <motion.div 
                className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-red"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              />
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 1.2,
                  type: "spring",
                  stiffness: 150
                }}
              >
                <Eye className="w-6 h-6 text-primary-red" />
              </motion.div>
              <motion.div 
                className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-red"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              />
            </motion.div>

            <motion.p
              className="text-xl text-beige-soft mb-4 max-w-2xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              To enter the Tunnel, you need to connect your Solana wallet
            </motion.p>
            
            <motion.p
              className="text-lg text-cream-light/80 mb-12 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              This ensures secure access to the decentralized message board and protects your privacy.
            </motion.p>

            {/* Wallet Connection Button */}
            <motion.div
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="relative">
                <GlassButton
                  onClick={() => {}} // WalletButton will handle the actual connection
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-primary-red to-primary-red/80 hover:from-primary-red/90 hover:to-primary-red/70"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlassButton>
                
                {/* Hidden WalletButton for actual functionality */}
                <div className="absolute inset-0 opacity-0">
                  <WalletButton />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Wallet Support Notice */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <GlassCard className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary-red/5 to-cream-light/5">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-primary-red" />
                <h3 className="text-xl font-bold text-cream-light font-heading">Wallet Support</h3>
                <Wallet className="w-6 h-6 text-primary-red" />
              </div>
              <p className="text-beige-soft leading-relaxed mb-4">
                <span className="text-primary-red font-semibold">Phantom Wallet</span> is recommended for the best experience.
              </p>
              <p className="text-beige-soft/80 text-sm">
                Other supported wallets: Solflare, Torus, Ledger, MathWallet
              </p>
            </GlassCard>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <GlassCard className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary-red/5 to-cream-light/5">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-primary-red" />
                <h4 className="text-xl font-bold text-cream-light font-heading">Your Security Matters</h4>
                <Shield className="w-6 h-6 text-primary-red" />
              </div>
              <p className="text-beige-soft leading-relaxed">
                We never store your private keys or personal data. Your wallet connection is used only for 
                authentication and transaction signing. Your privacy and security are our top priorities.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
