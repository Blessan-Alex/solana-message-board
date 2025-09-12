import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Clock, User } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatPublicKey, formatTimestamp } from '@/utils';
import { Message } from '@/types';

interface MessageCardProps {
  message: Message;
  index: number;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, index }) => {
  const { publicKey } = useWallet();
  const isOwnMessage = publicKey && message.author.equals(publicKey);
  
  // Generate consistent avatar color based on author public key
  const avatarColors = [
    'from-primary-red to-cream-light',
    'from-cream-light to-beige-soft',
    'from-beige-soft to-primary-red',
    'from-primary-red/80 to-beige-soft/80',
    'from-cream-light/80 to-primary-red/80'
  ];
  const avatarIndex = parseInt(message.author.toString().slice(-1), 16) % avatarColors.length;
  const avatarColor = avatarColors[avatarIndex];
  
  // Generate initials from public key
  const initials = message.author.toString().slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="mb-6"
    >
      <GlassCard className={`hover:shadow-lg transition-all duration-300 ${isOwnMessage ? 'ring-2 ring-primary-red/20' : ''}`}>
        <div className="space-y-4">
          {/* Header with avatar and user info */}
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatarColor} flex items-center justify-center text-black-pure font-bold text-lg flex-shrink-0 shadow-md`}>
              {initials}
            </div>
            
            <div className="flex-1 min-w-0">
                     <div className="flex items-center space-x-3 mb-1">
                       <h3 className="font-semibold text-cream-light text-lg font-heading">
                         {formatPublicKey(message.author.toString())}
                       </h3>
                       {isOwnMessage && (
                         <span className="bg-primary-red text-cream-light text-xs px-2 py-1 rounded-full font-medium">
                           You
                         </span>
                       )}
                     </div>

                     {message.timestamp && (
                       <div className="flex items-center space-x-1 text-beige-soft/70">
                         <Clock className="w-3 h-3" />
                         <span className="text-sm">
                           {formatTimestamp(message.timestamp)}
                         </span>
                       </div>
                     )}
            </div>
          </div>

          {/* Message content */}
          <div className="pl-16">
            <p className="text-cream-light leading-relaxed whitespace-pre-wrap text-base">
              {message.content}
            </p>
          </div>

          {/* Account address (for debugging) */}
          {message.accountAddress && (
            <div className="pl-16 pt-3 border-t border-cream-light/10">
              <div className="flex items-center space-x-2 text-beige-soft/50">
                <User className="w-3 h-3" />
                <span className="text-xs font-mono">
                  Account: {formatPublicKey(message.accountAddress.toString(), 4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};
