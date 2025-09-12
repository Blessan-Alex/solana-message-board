import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Users } from 'lucide-react';
import { MessageForm } from '@/components/message/MessageForm';
import { MessageList } from '@/components/message/MessageList';
import { WalletButton } from '@/components/wallet/WalletButton';
import { GlassButton } from '@/components/ui/GlassButton';

interface MessageBoardProps {
  onBackToLanding: () => void;
}

export const MessageBoard: React.FC<MessageBoardProps> = ({ onBackToLanding }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-soft via-cream-light/50 to-beige-soft">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cream-light/10 rounded-full blur-3xl" />
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
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-red to-cream-light rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-black-pure" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black-pure font-heading">
                  Solana Message Board
                </h1>
                <p className="text-black-pure/60 text-sm flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Decentralized community messages
                </p>
              </div>
            </div>
          </div>
          <WalletButton />
        </motion.header>

        {/* Main Content */}
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
      </div>
    </div>
  );
};
