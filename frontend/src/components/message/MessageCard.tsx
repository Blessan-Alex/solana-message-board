import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Clock, User, Heart, Edit, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { DeleteDisclaimerModal } from '@/components/ui/DeleteDisclaimerModal';
import { formatPublicKey, formatTimestamp } from '@/utils';
import { Message } from '@/types';
import { useProfileStore } from '@/stores/profileStore';
import { ProfileModal } from '@/components/profile/ProfileModal';
import { solanaService } from '@/services/solanaService';

interface MessageCardProps {
  message: Message;
  index: number;
  onRefresh?: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, index, onRefresh }) => {
  const { publicKey, wallet } = useWallet();
  const { getProfile } = useProfileStore();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isOwnMessage = publicKey && message.author.equals(publicKey);
  const authorAddress = message.author.toString();
  const profile = getProfile(authorAddress);
  
  // Check if current user has liked this message
  const hasLiked = publicKey && message.likedBy?.some(pubkey => pubkey.equals(publicKey));
  
  // Memoize avatar generation to prevent recalculation on every render
  const { avatarColor, initials } = useMemo(() => {
    const avatarColors = [
      'from-primary-red to-cream-light',
      'from-cream-light to-beige-soft',
      'from-beige-soft to-primary-red',
      'from-primary-red/80 to-beige-soft/80',
      'from-cream-light/80 to-primary-red/80'
    ];
    const avatarIndex = parseInt(authorAddress.slice(-1), 16) % avatarColors.length;
    const avatarColor = avatarColors[avatarIndex];
    
    // Use display name initials if available, otherwise use wallet address initials
    const initials = profile?.displayName 
      ? profile.displayName.slice(0, 2).toUpperCase()
      : authorAddress.slice(0, 2).toUpperCase();
    
    return { avatarColor, initials };
  }, [authorAddress, profile?.displayName]);

  const handleLike = async () => {
    if (!publicKey || !message.accountAddress || isLiking) return;
    
    setIsLiking(true);
    setError(null);
    try {
      if (hasLiked) {
        await solanaService.unlikeMessage(
          { messageAccount: message.accountAddress, user: publicKey },
          wallet?.adapter,
          publicKey
        );
      } else {
        await solanaService.likeMessage(
          { messageAccount: message.accountAddress, user: publicKey },
          wallet?.adapter,
          publicKey
        );
      }
      // Refresh messages after like/unlike
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error liking message:', error);
      setError(error instanceof Error ? error.message : 'Failed to like message');
    } finally {
      setIsLiking(false);
    }
  };

  const handleEdit = async () => {
    if (!publicKey || !message.accountAddress || !isEditing) return;
    
    setError(null);
    try {
      await solanaService.editMessage(
        { messageAccount: message.accountAddress, author: publicKey, newContent: editContent },
        wallet?.adapter,
        publicKey
      );
      setIsEditing(false);
      // Refresh messages after edit
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error editing message:', error);
      setError(error instanceof Error ? error.message : 'Failed to edit message');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!publicKey || !message.accountAddress) return;
    
    setIsDeleting(true);
    setError(null);
    try {
      await solanaService.deleteMessage(
        { messageAccount: message.accountAddress, author: publicKey },
        wallet?.adapter,
        publicKey
      );
      setShowDeleteModal(false);
      // Refresh messages after delete
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

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
            <motion.button
              onClick={() => setShowProfileModal(true)}
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatarColor} flex items-center justify-center text-black-pure font-bold text-lg flex-shrink-0 shadow-md hover:scale-105 transition-transform cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {initials}
            </motion.button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="font-semibold text-cream-light text-lg font-heading">
                  {profile?.displayName || formatPublicKey(authorAddress)}
                </h3>
                {isOwnMessage && (
                  <span className="bg-primary-red text-cream-light text-xs px-2 py-1 rounded-full font-medium">
                    You
                  </span>
                )}
              </div>

              {/* Show wallet address if different from display name */}
              {profile?.displayName && (
                <div className="flex items-center space-x-1 text-beige-soft/50 mb-1">
                  <User className="w-3 h-3" />
                  <span className="text-xs font-mono">
                    {formatPublicKey(authorAddress)}
                  </span>
                </div>
              )}

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
            {isEditing ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-4 bg-gradient-to-r from-black-pure/20 to-black-pure/10 border-2 border-primary-red/20 rounded-xl text-cream-light placeholder-beige-soft/50 focus:outline-none focus:border-primary-red/40 focus:ring-2 focus:ring-primary-red/20 resize-none transition-all duration-300 shadow-lg"
                    rows={3}
                    maxLength={280}
                    placeholder="Edit your message..."
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-beige-soft/50">
                    {editContent.length}/280
                  </div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={handleEdit}
                    className="group relative px-6 py-2 bg-gradient-to-r from-primary-red to-pink-500 text-cream-light rounded-xl hover:from-primary-red/80 hover:to-pink-500/80 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-primary-red/20 border border-primary-red/30"
                    whileHover={{ 
                      scale: 1.05,
                      y: -1
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17 
                    }}
                  >
                    <span className="relative z-10">Save Changes</span>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1.2],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(message.content);
                    }}
                    className="group relative px-6 py-2 bg-gradient-to-r from-beige-soft/20 to-cream-light/20 text-cream-light rounded-xl hover:from-beige-soft/30 hover:to-cream-light/30 transition-all duration-300 text-sm font-semibold border border-beige-soft/30"
                    whileHover={{ 
                      scale: 1.05,
                      y: -1
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17 
                    }}
                  >
                    <span className="relative z-10">Cancel</span>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1.2],
                        opacity: [0, 0.2, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <p className="text-cream-light leading-relaxed whitespace-pre-wrap text-base">
                {message.content}
              </p>
            )}
          </div>

          {/* Error display */}
          {error && (
            <div className="pl-16 pt-3">
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400/70 hover:text-red-400 text-xs mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pl-16 pt-3 border-t border-cream-light/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Enhanced Like button */}
                <motion.button
                  onClick={handleLike}
                  disabled={!publicKey || isLiking}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    hasLiked 
                      ? 'bg-gradient-to-r from-primary-red/20 to-pink-500/20 text-primary-red border border-primary-red/30 shadow-lg shadow-primary-red/10' 
                      : 'bg-gradient-to-r from-beige-soft/10 to-cream-light/10 text-beige-soft hover:from-beige-soft/20 hover:to-cream-light/20 border border-beige-soft/20'
                  } ${!publicKey || isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}`}
                  whileHover={{ 
                    scale: publicKey && !isLiking ? 1.05 : 1,
                    y: publicKey && !isLiking ? -2 : 0
                  }}
                  whileTap={{ 
                    scale: publicKey && !isLiking ? 0.95 : 1,
                    y: publicKey && !isLiking ? 0 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                >
                  {/* Animated Heart Icon */}
                  <motion.div
                    className="relative"
                    animate={hasLiked ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 10, 0]
                    } : {}}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${
                        hasLiked 
                          ? 'fill-current text-primary-red drop-shadow-sm' 
                          : 'group-hover:text-primary-red/70'
                      } ${isLiking ? 'animate-pulse' : ''}`} 
                    />
                    
                    {/* Floating hearts animation on like */}
                    {hasLiked && (
                      <>
                        <motion.div
                          className="absolute inset-0 text-primary-red/60"
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            y: [0, -20, -40]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeOut"
                          }}
                        >
                          <Heart className="w-3 h-3 fill-current" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 text-primary-red/40"
                          animate={{
                            scale: [0, 1.2, 0],
                            opacity: [0, 0.8, 0],
                            y: [0, -15, -30],
                            x: [0, 5, 10]
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            repeatDelay: 2.5,
                            ease: "easeOut"
                          }}
                        >
                          <Heart className="w-2 h-2 fill-current" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Like count with animation */}
                  {(message.likes && message.likes > 0) && (
                    <motion.span 
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        hasLiked ? 'text-primary-red' : 'text-beige-soft group-hover:text-primary-red/70'
                      }`}
                      animate={isLiking ? {
                        opacity: [1, 0.5, 1]
                      } : {}}
                      transition={{
                        duration: 0.8,
                        repeat: isLiking ? Infinity : 0
                      }}
                    >
                      {isLiking ? '...' : message.likes}
                    </motion.span>
                  )}

                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-primary-red/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isLiking ? {
                      scale: [0, 1.5],
                      opacity: [0.6, 0]
                    } : {}}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  />
                </motion.button>

                {/* Edit count indicator */}
                {message.editCount && message.editCount > 0 && (
                  <div className="flex items-center space-x-1 text-beige-soft/50">
                    <Edit className="w-3 h-3" />
                    <span className="text-xs">
                      Edited {message.editCount} time{message.editCount > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Enhanced Owner actions */}
              {isOwnMessage && !message.isDeleted && (
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="group relative p-3 text-beige-soft hover:text-cream-light hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-500/20"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17 
                    }}
                  >
                    <Edit className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-blue-500/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1.2],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    className="group relative p-3 text-beige-soft hover:text-red-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ 
                      scale: isDeleting ? 1 : 1.05,
                      y: isDeleting ? 0 : -2
                    }}
                    whileTap={{ 
                      scale: isDeleting ? 1 : 0.95,
                      y: isDeleting ? 0 : 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17 
                    }}
                  >
                    <Trash2 className={`w-4 h-4 group-hover:text-red-400 transition-colors duration-300 ${isDeleting ? 'animate-pulse' : ''}`} />
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-red-500/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1.2],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    />
                  </motion.button>
                </div>
              )}
            </div>
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

      {/* Profile Modal - Rendered via Portal */}
      {profile && showProfileModal && createPortal(
        <ProfileModal
          profile={profile}
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          isOwnProfile={!!isOwnMessage}
        />,
        document.body
      )}

      {/* Delete Disclaimer Modal - Rendered via Portal */}
      <DeleteDisclaimerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        messageContent={message.content}
        isLoading={isDeleting}
      />
    </motion.div>
  );
};
