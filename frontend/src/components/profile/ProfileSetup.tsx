import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Check, AlertCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useProfileStore } from '@/stores/profileStore';
import { useWallet } from '@/hooks/useWallet';

interface ProfileSetupProps {
  onComplete: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const { publicKey, wallet } = useWallet();
  const { updateDisplayName, setCurrentProfile } = useProfileStore();
  const [displayName, setDisplayName] = useState('');
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

    setLoading(true);
    setError(null);

    try {
      // Update the profile with the display name
      updateDisplayName(publicKey.toString(), trimmedName);
      
      // Complete the setup
      onComplete();
    } catch (err) {
      setError('Failed to set up profile');
    } finally {
      setLoading(false);
    }
  };

  const walletAddress = publicKey?.toString() || '';
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-primary-red/20 to-black-pure flex items-center justify-center">
      {/* Tunnel Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-8 bg-gradient-to-r from-primary-red/5 to-cream-light/5">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-primary-red" />
              </div>
              
              <h2 className="text-3xl font-bold text-cream-light mb-4 font-heading">
                Welcome to Tunnel
              </h2>
              
              <p className="text-beige-soft/80 leading-relaxed">
                Set up your profile to start connecting with the community
              </p>
            </motion.div>

            {/* Wallet Info */}
            <motion.div
              className="bg-cream-light/10 border border-primary-red/20 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-red/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-red" />
                </div>
                <div>
                  <p className="text-cream-light font-medium text-sm">
                    {wallet?.adapter?.name || 'Wallet'}
                  </p>
                  <p className="text-beige-soft/60 text-xs font-mono">
                    {shortAddress}
                  </p>
                </div>
              </div>
            </motion.div>

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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label htmlFor="displayName" className="block text-cream-light font-medium mb-2">
                  Choose Your Display Name
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
                  This will be how others see you in the Tunnel
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <GlassButton
                  type="submit"
                  loading={loading}
                  disabled={!displayName.trim() || loading}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{loading ? 'Setting up...' : 'Complete Setup'}</span>
                </GlassButton>
              </motion.div>
            </form>

            {/* Info */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="text-beige-soft/60 text-xs">
                You can change your display name anytime from your profile
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
