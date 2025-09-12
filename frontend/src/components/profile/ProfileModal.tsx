import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Wallet,
  Edit3,
  Sparkles
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { UserProfile } from '@/stores/profileStore';

interface ProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  isOwnProfile?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onEdit,
  isOwnProfile = false
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profile.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shortAddress = `${profile.walletAddress.slice(0, 6)}...${profile.walletAddress.slice(-6)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 99999 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black-pure/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: 99998 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 99999 }}
          >
            <div className="p-6 bg-gradient-to-r from-primary-red/5 to-cream-light/5 border-2 border-primary-red/20 shadow-2xl backdrop-blur-lg rounded-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream-light font-heading">
                      {profile.displayName}
                    </h3>
                    <p className="text-beige-soft/60 text-sm">
                      {isOwnProfile ? 'Your Profile' : 'User Profile'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isOwnProfile && onEdit && (
                    <GlassButton
                      onClick={onEdit}
                      variant="ghost"
                      size="sm"
                      className="p-2"
                    >
                      <Edit3 className="w-4 h-4" />
                    </GlassButton>
                  )}
                  <GlassButton
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </GlassButton>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-cream-light font-medium text-sm flex items-center space-x-2">
                    <Wallet className="w-4 h-4" />
                    <span>Wallet Address</span>
                  </label>
                  <GlassButton
                    onClick={copyAddress}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 px-2 py-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </GlassButton>
                </div>
                <div className="bg-cream-light/10 border border-primary-red/20 rounded-lg p-3">
                  <p className="text-beige-soft font-mono text-sm break-all">
                    {profile.walletAddress}
                  </p>
                </div>
              </div>

              {/* Wallet Info */}
              {profile.walletName && (
                <div className="mb-6">
                  <label className="text-cream-light font-medium text-sm flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Wallet</span>
                  </label>
                  <div className="bg-cream-light/10 border border-primary-red/20 rounded-lg p-3">
                    <p className="text-beige-soft text-sm">
                      {profile.walletName}
                    </p>
                  </div>
                </div>
              )}

              {/* Profile Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cream-light/10 border border-primary-red/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-primary-red" />
                    <span className="text-cream-light font-medium text-sm">Joined</span>
                  </div>
                  <p className="text-beige-soft/80 text-xs">
                    {formatDate(profile.createdAt)}
                  </p>
                </div>
                
                <div className="bg-cream-light/10 border border-primary-red/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-primary-red" />
                    <span className="text-cream-light font-medium text-sm">Last Active</span>
                  </div>
                  <p className="text-beige-soft/80 text-xs">
                    {formatDate(profile.lastActive)} at {formatTime(profile.lastActive)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <GlassButton
                  onClick={copyAddress}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </GlassButton>
                
                {isOwnProfile && onEdit && (
                  <GlassButton
                    onClick={onEdit}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </GlassButton>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
