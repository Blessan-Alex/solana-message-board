import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MessageCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { MessageCard } from './MessageCard';
import { useMessagesStore } from '@/stores/messagesStore';
import { solanaService } from '@/services/solanaService';

export const MessageList: React.FC = () => {
  const { messages, loading, error, setMessages, setLoading, setError } = useMessagesStore();

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMessages = await solanaService.fetchMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading && messages.length === 0) {
    return (
      <GlassCard className="text-center py-12">
        <div className="flex items-center justify-center mb-4">
          <RefreshCw className="w-8 h-8 text-black-pure/60 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-black-pure mb-2 font-heading">Loading Messages</h3>
        <p className="text-black-pure/60">Fetching messages from the Solana blockchain...</p>
      </GlassCard>
    );
  }

  if (error && messages.length === 0) {
    const isSolanaValidatorError = error.includes('Solana validator is not running');
    
    return (
      <GlassCard className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-primary-red" />
          </div>
          
          <h3 className="text-2xl font-bold text-black-pure mb-4 font-heading">Solana Validator Required</h3>
          
          {isSolanaValidatorError ? (
            <div className="space-y-6">
              <p className="text-black-pure/70 text-lg leading-relaxed">
                The Solana local validator is not running. This application requires a local Solana blockchain to function.
              </p>
              
              <div className="bg-cream-light/80 border border-primary-red/30 rounded-xl p-6 text-left">
                <h4 className="text-black-pure font-semibold text-lg mb-4 flex items-center font-heading">
                  <span className="w-2 h-2 bg-primary-red rounded-full mr-3"></span>
                  Quick Setup Guide
                </h4>
                <ol className="text-black-pure/80 space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary-red/30 text-cream-light text-sm font-mono px-2 py-1 rounded mr-3 mt-0.5">1</span>
                    <span>Open your terminal or command prompt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-red/30 text-cream-light text-sm font-mono px-2 py-1 rounded mr-3 mt-0.5">2</span>
                    <span>Run: <code className="bg-primary-red/40 px-2 py-1 rounded text-sm font-mono">solana-test-validator</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-red/30 text-cream-light text-sm font-mono px-2 py-1 rounded mr-3 mt-0.5">3</span>
                    <span>Wait for the validator to initialize (you'll see "Ledger location: test-ledger")</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-red/30 text-cream-light text-sm font-mono px-2 py-1 rounded mr-3 mt-0.5">4</span>
                    <span>Refresh this page to connect to the blockchain</span>
                  </li>
                </ol>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <GlassButton onClick={fetchMessages} className="flex items-center space-x-2 px-6 py-3">
                  <RefreshCw className="w-5 h-5" />
                  <span>Check Connection</span>
                </GlassButton>
                <GlassButton 
                  onClick={() => window.open('https://docs.solana.com/developing/test-validator', '_blank')}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-red/20 hover:bg-primary-red/30 border-primary-red/30"
                >
                  <span>📚</span>
                  <span>View Docs</span>
                </GlassButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-black-pure/70">{error}</p>
              <GlassButton onClick={fetchMessages} className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </GlassButton>
            </div>
          )}
        </div>
      </GlassCard>
    );
  }

  if (messages.length === 0) {
    return (
      <GlassCard className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-black-pure/60 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-black-pure mb-2 font-heading">No Messages Yet</h3>
        <p className="text-black-pure/60 mb-4">
          Be the first to post a message to the Solana Message Board!
        </p>
        <GlassButton onClick={fetchMessages} className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </GlassButton>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black-pure font-heading">
          Community Messages ({messages.length})
        </h2>
        <GlassButton
          onClick={fetchMessages}
          loading={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </GlassButton>
      </div>

      {/* Error banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-primary-red" />
            <span className="text-primary-red text-sm">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Messages Feed */}
      <div className="space-y-4">
        {messages.map((message, index) => (
          <MessageCard key={index} message={message} index={index} />
        ))}
      </div>
    </div>
  );
};
