import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, User } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useProfileStore } from '@/stores/profileStore';
import { useWallet } from '@/hooks/useWallet';

interface ProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ isOpen, onClose }) => {
  const { publicKey } = useWallet();
  const { currentProfile, updateDisplayName } = useProfileStore();
  const [displayName, setDisplayName] = useState(currentProfile?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    const trimmedName = displayName.trim();
    
    if (!trimmedName) {
      setError('Please enter a display name');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Display name must be at least 2 characters');
      return;
    }

    if (trimmedName.length > 20) {
      setError('Display name must be less than 20 characters');
      return;
    }

    if (trimmedName === currentProfile?.displayName) {
      onClose();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      updateDisplayName(publicKey.toString(), trimmedName);
      onClose();
    } catch (err) {
      setError('Failed to update display name');
    } finally {
      setLoading(false);
    }
  };

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
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-red" />
                  </div>
                  <h3 className="text-xl font-bold text-cream-light font-heading">
                    Edit Profile
                  </h3>
                </div>
                
                <GlassButton
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </GlassButton>
              </div>

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-red/10 border border-primary-red/30 rounded-lg p-3 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-primary-red" />
                    <span className="text-primary-red text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="displayName" className="block text-cream-light font-medium mb-2">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name..."
                    className="w-full bg-cream-light/50 border border-primary-red/20 rounded-xl px-4 py-3 text-black-pure placeholder-black-pure/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red/40 transition-all duration-200"
                    maxLength={20}
                    autoFocus
                  />
                  <p className="text-beige-soft/60 text-xs mt-2">
                    {displayName.length}/20 characters
                  </p>
                </div>

                <div className="flex space-x-3">
                  <GlassButton
                    type="button"
                    onClick={onClose}
                    variant="ghost"
                    className="flex-1"
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="submit"
                    loading={loading}
                    disabled={!displayName.trim() || loading || displayName.trim() === currentProfile?.displayName}
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save'}</span>
                  </GlassButton>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
