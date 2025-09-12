import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { Send, AlertCircle } from 'lucide-react';
import DOMPurify from 'dompurify';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { validateMessage } from '@/utils';
import { useMessagesStore } from '@/stores/messagesStore';
import { solanaService } from '@/services/solanaService';

export const MessageForm: React.FC = () => {
  const { connected, publicKey, wallet } = useWallet();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addMessage, setError: setStoreError } = useMessagesStore();
  const prevWalletState = useRef<{connected: boolean, publicKey: string | undefined, wallet: string | undefined} | null>(null);

  // Debug wallet connection state only when it changes
  useEffect(() => {
    const currentState = { 
      connected, 
      publicKey: publicKey?.toString(), 
      wallet: wallet?.adapter?.name || 'Unknown'
    };
    
    const prevState = prevWalletState.current;
    
    // Only log if the state has actually changed
    if (!prevState || 
        prevState.connected !== currentState.connected ||
        prevState.publicKey !== currentState.publicKey ||
        prevState.wallet !== currentState.wallet) {
      console.log('MessageForm - Wallet state changed:', currentState);
      prevWalletState.current = currentState;
    }
  }, [connected, publicKey, wallet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey) {
      setError('Wallet not connected');
      return;
    }

    if (!solanaService.isReady()) {
      setError('Solana Validator Required');
      return;
    }

    // Sanitize input to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(content.trim());
    
    const validation = validateMessage(sanitizedContent);
    if (!validation.valid) {
      setError(validation.error || 'Invalid message');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting message post with wallet:', {
        connected,
        publicKey: publicKey?.toString(),
        walletName: wallet?.adapter?.name || 'Standard Wallet'
      });

      // Use the wallet adapter's signTransaction method if available, otherwise use Standard Wallet API
      const result = await solanaService.postMessage(
        { content: sanitizedContent, author: publicKey },
        wallet, // Pass the actual wallet adapter
        publicKey // Pass the publicKey separately
      );

      // Parse the result to get signature and timestamp
      let signature: string;
      let timestamp: number;
      
      try {
        const parsedResult = JSON.parse(result);
        signature = parsedResult.signature;
        timestamp = parsedResult.timestamp;
        console.log('✅ Message posted with signature:', signature);
      } catch (error) {
        // Fallback for old format (just signature)
        signature = result;
        timestamp = Date.now();
        console.warn('Failed to parse result, using fallback timestamp:', error);
      }

      // The timestamp is now stored on-chain in the message account
      // We'll get the real timestamp when we fetch messages from blockchain
      // Don't override with local time - let the blockchain timestamp be authoritative

      // Add message to local store (timestamp will be updated when we fetch from blockchain)
      addMessage({
        author: publicKey,
        content: sanitizedContent,
        timestamp: timestamp,
      });

      setContent('');
      console.log('✅ Message posted successfully! Timestamp will be updated from blockchain on next refresh.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post message';
      setError(errorMessage);
      setStoreError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="text-center py-8 bg-black-pure/20 border-cream-light/10">
          <AlertCircle className="w-12 h-12 text-primary-red mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-cream-light mb-2 font-heading">Connect Your Wallet</h3>
          <p className="text-beige-soft/70 text-sm">
            Please connect your wallet to post messages to the Tunnel.
          </p>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="bg-black-pure/20 border-cream-light/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-cream-light font-heading">Enter the Tunnel</h2>
          <p className="text-beige-soft/70 text-sm">Share your thoughts in this private space</p>
        </div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-red/10 border border-primary-red/30 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-primary-red" />
              <span className="text-primary-red text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share it with the Solana community..."
              className="w-full bg-cream-light/50 border border-primary-red/20 rounded-xl px-4 py-3 text-black-pure placeholder-black-pure/50 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red/40 transition-all duration-200"
              rows={4}
              maxLength={280}
            />
            
            {/* Character count */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-beige-soft/50">
                {content.length > 200 ? `${content.length}/280` : 'Share your thoughts'}
              </span>
              {content.length > 200 && (
                <span className={`text-xs ${content.length >= 280 ? 'text-primary-red' : 'text-beige-soft/60'}`}>
                  {280 - content.length} characters left
                </span>
              )}
            </div>
          </div>

          <GlassButton
            type="submit"
            loading={loading}
            disabled={!content.trim() || loading}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Posting...' : 'Post Message'}</span>
          </GlassButton>
        </form>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};
