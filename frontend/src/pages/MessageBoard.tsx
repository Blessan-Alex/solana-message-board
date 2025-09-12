import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Wallet } from 'lucide-react';
import { MessageForm } from '@/components/message/MessageForm';
import { MessageList } from '@/components/message/MessageList';
import { WalletButton } from '@/components/wallet/WalletButton';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { useWallet } from '@/hooks/useWallet';

interface MessageBoardProps {
  onBackToLanding: () => void;
}

export const MessageBoard: React.FC<MessageBoardProps> = ({ onBackToLanding }) => {
  const { connected } = useWallet();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-primary-red/10 to-black-pure">
      {/* Dark tunnel background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-red/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-primary-red/2 via-transparent to-transparent rounded-full blur-2xl" />
        
        {/* Floating particles for tunnel effect */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-primary-red/40 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-cream-light/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-beige-soft/30 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-60 right-1/3 w-0.5 h-0.5 bg-primary-red/50 rounded-full animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <GlassButton
              onClick={onBackToLanding}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </GlassButton>
            <div className="flex items-center space-x-4">
              {/* Enhanced Tunnel Logo */}
              <motion.div 
                className="relative w-16 h-16 bg-gradient-to-br from-primary-red via-primary-red/80 to-black-pure rounded-2xl flex items-center justify-center shadow-2xl ring-2 ring-cream-light/20"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Tunnel entrance effect */}
                <div className="absolute inset-2 bg-gradient-to-br from-cream-light/20 to-transparent rounded-xl"></div>
                
                {/* Tunnel icon - stylized T */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="w-6 h-1 bg-cream-light rounded-full mb-1"></div>
                  <div className="w-1 h-4 bg-cream-light rounded-full"></div>
                  <div className="absolute -bottom-1 w-3 h-1 bg-primary-red/60 rounded-full"></div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/30 to-transparent rounded-2xl blur-sm"></div>
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-cream-light font-heading tracking-tight"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tunnel
                </motion.h1>
                <motion.p 
                  className="text-beige-soft/80 text-sm flex items-center font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Users className="w-4 h-4 mr-2 text-primary-red" />
                  Your private space cut out from the real world
                </motion.p>
              </div>
            </div>
          </div>
          <WalletButton />
        </motion.header>

        {/* Main Content */}
        {connected ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Message Form */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-8">
                <MessageForm />
              </div>
            </motion.div>

            {/* Main Feed - Messages */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MessageList />
            </motion.div>
          </div>
        ) : (
          /* Wallet Not Connected State */
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-10 h-10 text-primary-red" />
                </div>
                
                <h3 className="text-2xl font-bold text-cream-light mb-4 font-heading">Wallet Required</h3>
                
                <p className="text-beige-soft/80 text-lg leading-relaxed mb-8">
                  You need to connect your wallet to access the Tunnel's message board. 
                  This ensures secure access to the decentralized features.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <WalletButton />
                  <GlassButton 
                    onClick={onBackToLanding}
                    variant="ghost"
                    className="flex items-center space-x-2 px-6 py-3"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Landing</span>
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};
