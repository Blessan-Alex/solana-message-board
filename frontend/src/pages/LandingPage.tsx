import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, Github, ExternalLink } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-red via-black-pure to-primary-red">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cream-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-beige-soft/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-red to-cream-light rounded-xl flex items-center justify-center">
              <span className="text-black-pure font-bold text-lg">S</span>
            </div>
            <span className="text-cream-light font-bold text-xl">Solana Message Board</span>
          </div>
          <GlassButton
            onClick={() => window.open('https://github.com', '_blank')}
            variant="ghost"
            className="flex items-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </GlassButton>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-cream-light mb-6 leading-tight font-heading">
            Solana Message Board
          </h1>
          <p className="text-xl md:text-2xl text-beige-soft mb-8 max-w-3xl mx-auto leading-relaxed">
            Share your thoughts securely on the Solana blockchain
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassButton
              onClick={onEnterApp}
              size="lg"
              className="flex items-center space-x-3 mx-auto text-lg px-8 py-4"
            >
              <span>Enter App</span>
              <ArrowRight className="w-5 h-5" />
            </GlassButton>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassCard className="text-center py-12">
            <h2 className="text-3xl font-bold text-cream-light mb-6 font-heading">Why On-Chain Messages Matter</h2>
            <p className="text-lg text-beige-soft max-w-4xl mx-auto leading-relaxed">
              Traditional messaging platforms are centralized and can be censored or shut down. 
              By storing messages on the Solana blockchain, we ensure that your thoughts are 
              permanent, immutable, and truly decentralized. Every message becomes part of 
              the blockchain's permanent record.
            </p>
          </GlassCard>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-cream-light text-center mb-12 font-heading">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <GlassCard className="text-center py-8 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary-red" />
                </div>
                <h3 className="text-xl font-bold text-cream-light mb-4 font-heading">Secure & Decentralized</h3>
                <p className="text-beige-soft leading-relaxed">
                  Your messages are stored on the Solana blockchain, ensuring they can never be censored or deleted.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <GlassCard className="text-center py-8 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary-red" />
                </div>
                <h3 className="text-xl font-bold text-cream-light mb-4 font-heading">Lightning Fast</h3>
                <p className="text-beige-soft leading-relaxed">
                  Solana's high-performance blockchain ensures your messages are posted instantly with minimal fees.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <GlassCard className="text-center py-8 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-primary-red" />
                </div>
                <h3 className="text-xl font-bold text-cream-light mb-4 font-heading">Transparent</h3>
                <p className="text-beige-soft leading-relaxed">
                  All messages are publicly verifiable on the blockchain, creating a transparent and open community.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="text-center py-8 border-t border-cream-light/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-red to-cream-light rounded-lg flex items-center justify-center">
                <span className="text-black-pure font-bold text-sm">S</span>
              </div>
              <span className="text-beige-soft">Built with Solana, React, and Framer Motion</span>
            </div>
            <div className="flex items-center space-x-4">
              <GlassButton
                onClick={() => window.open('https://solana.com', '_blank')}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Solana</span>
              </GlassButton>
              <GlassButton
                onClick={() => window.open('https://github.com', '_blank')}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Github className="w-3 h-3" />
                <span>Source Code</span>
              </GlassButton>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};
