import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Github, 
  ExternalLink,
  MessageSquare,
  Lock,
  Globe,
  Clock,
  Heart,
  Star,
  Rocket,
  Sparkles,
  Eye,
  RefreshCw,
  Wallet,
  Hash,
  TrendingUp,
  Camera,
  Bell,
  Search,
  ThumbsUp,
  MessageCircle,
  UserPlus,
  Crown,
  Award,
  Target,
  Layers,
  Smartphone
} from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const currentFeatures = [
    {
      icon: Wallet,
      title: "Wallet Integration",
      description: "Connect with Phantom, Solflare, and other Solana wallets seamlessly"
    },
    {
      icon: MessageSquare,
      title: "Decentralized Messaging",
      description: "Post messages directly to the Solana blockchain with instant confirmation"
    },
    {
      icon: Clock,
      title: "Real-Time Timestamps",
      description: "Accurate blockchain timestamps showing when messages were actually posted"
    },
    {
      icon: RefreshCw,
      title: "Live Updates",
      description: "Real-time message fetching and display with automatic refresh capabilities"
    },
    {
      icon: Shield,
      title: "Immutable Storage",
      description: "Messages stored permanently on-chain, tamper-proof and verifiable"
    },
    {
      icon: Globe,
      title: "Public Transparency",
      description: "All messages are publicly verifiable and transparent on the blockchain"
    }
  ];

  const futureFeatures = [
    {
      icon: Camera,
      title: "Media Sharing",
      description: "Upload and share images, videos, and files on-chain"
    },
    {
      icon: UserPlus,
      title: "User Profiles",
      description: "Create detailed profiles with avatars, bios, and social stats"
    },
    {
      icon: Hash,
      title: "Hashtags & Topics",
      description: "Organize conversations with hashtags and trending topics"
    },
    {
      icon: ThumbsUp,
      title: "Reactions & Engagement",
      description: "Like, react, and engage with posts using blockchain-native features"
    },
    {
      icon: MessageCircle,
      title: "Direct Messages",
      description: "Private encrypted messaging between users"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Real-time notifications for mentions, likes, and new followers"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Search through all on-chain messages with powerful filters"
    },
    {
      icon: Crown,
      title: "Creator Economy",
      description: "Monetize content with tips, subscriptions, and NFT integration"
    },
    {
      icon: TrendingUp,
      title: "Social Analytics",
      description: "Track engagement, reach, and growth with detailed analytics"
    },
    {
      icon: Layers,
      title: "Multi-Chain Support",
      description: "Expand beyond Solana to support multiple blockchain networks"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android apps for seamless mobile experience"
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Gamified experience with badges, levels, and community recognition"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-pure via-primary-red/20 to-black-pure">
      {/* Tunnel Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tunnel walls effect */}
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

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 bg-cream-light/10 backdrop-blur-sm border border-primary-red/20 rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-primary-red" />
            <span className="text-beige-soft font-medium">Welcome to the Future of Social</span>
            <Sparkles className="w-5 h-5 text-primary-red" />
          </motion.div>

          <motion.h1
            className="text-7xl font-bold text-cream-light mb-6 font-heading leading-tight"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            Tunnel
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <motion.div 
              className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-red"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ 
                duration: 1.0, 
                delay: 1.2,
                type: "spring",
                stiffness: 150
              }}
            >
              <Eye className="w-6 h-6 text-primary-red" />
            </motion.div>
            <motion.div 
              className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-red"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
          </motion.div>

          <motion.p
            className="text-2xl text-beige-soft mb-4 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Your Private Space Cut Out From The Real World
          </motion.p>
          
          <motion.p
            className="text-lg text-cream-light/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Step into a decentralized social experience where your messages live forever on the Solana blockchain. 
            Connect, share, and build community in a space that's truly yours.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <GlassButton
              onClick={onEnterApp}
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-primary-red to-primary-red/80 hover:from-primary-red/90 hover:to-primary-red/70"
            >
              Enter the Tunnel
              <ArrowRight className="w-5 h-5 ml-2" />
            </GlassButton>
            
            <div className="flex items-center space-x-4 text-cream-light/60">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Decentralized</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Current Features Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary-red/10 border border-primary-red/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <Star className="w-4 h-4 text-primary-red" />
              <span className="text-primary-red font-medium text-sm">Currently Available</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-cream-light mb-4 font-heading">
              Core Features
            </h2>
            <p className="text-lg text-beige-soft max-w-2xl mx-auto">
              Experience the foundation of decentralized social media with these powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.8 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                  <motion.div 
                    className="flex items-center space-x-4 mb-4"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 2.0 + index * 0.15 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-primary-red/20 to-cream-light/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-6 h-6 text-primary-red" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-cream-light font-heading">
                      {feature.title}
                    </h3>
                  </motion.div>
                  <motion.p 
                    className="text-beige-soft/80 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 + index * 0.15 }}
                  >
                    {feature.description}
                  </motion.p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-red/20 to-cream-light/20 border border-primary-red/30 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              <Rocket className="w-5 h-5 text-primary-red" />
              <span className="text-primary-red font-medium">Future Vision</span>
              <Rocket className="w-5 h-5 text-primary-red" />
            </motion.div>
            <h2 className="text-4xl font-bold text-cream-light mb-4 font-heading">
              Roadmap to Social Media
            </h2>
            <p className="text-lg text-beige-soft max-w-3xl mx-auto mb-8">
              We're building Chat Tunnel into a full-fledged social media platform based on Solana. 
              Here's what's coming next in our journey to revolutionize decentralized social interaction.
            </p>
            
            <motion.div
              className="bg-gradient-to-r from-primary-red/10 via-cream-light/5 to-primary-red/10 border border-primary-red/20 rounded-2xl p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-primary-red" />
                <h3 className="text-2xl font-bold text-cream-light font-heading">Our Vision</h3>
                <Target className="w-6 h-6 text-primary-red" />
              </div>
              <p className="text-lg text-beige-soft leading-relaxed">
                Chat Tunnel will evolve into a comprehensive social media ecosystem where users own their data, 
                creators are fairly compensated, and communities thrive in a censorship-resistant environment. 
                We're not just building another social platform—we're creating the future of human connection.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 2.6 + index * 0.08,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <GlassCard className="p-5 h-full hover:scale-105 transition-all duration-300 group border-primary-red/10">
                  <motion.div 
                    className="flex items-center space-x-3 mb-3"
                    initial={{ x: -15 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 2.8 + index * 0.08 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-primary-red/15 to-cream-light/15 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-5 h-5 text-primary-red" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-cream-light font-heading">
                      {feature.title}
                    </h3>
                  </motion.div>
                  <motion.p 
                    className="text-beige-soft/70 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.0 + index * 0.08 }}
                  >
                    {feature.description}
                  </motion.p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
          >
            <GlassCard className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary-red/5 to-cream-light/5">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-primary-red" />
                <h3 className="text-2xl font-bold text-cream-light font-heading">Join the Journey</h3>
                <Heart className="w-6 h-6 text-primary-red" />
              </div>
              <p className="text-beige-soft leading-relaxed mb-6">
                Be part of the revolution. Your feedback, ideas, and participation will shape Chat Tunnel 
                into the social media platform the world needs—decentralized, user-owned, and truly free.
              </p>
              <GlassButton
                onClick={onEnterApp}
                className="bg-gradient-to-r from-primary-red to-primary-red/80 hover:from-primary-red/90 hover:to-primary-red/70"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlassButton>
            </GlassCard>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <GlassCard className="p-8 bg-gradient-to-r from-primary-red/5 to-cream-light/5">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-beige-soft hover:text-cream-light transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href="https://solana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-beige-soft hover:text-cream-light transition-colors group"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Solana</span>
              </a>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cream-light rounded-full animate-pulse delay-500" />
              <div className="w-2 h-2 bg-beige-soft rounded-full animate-pulse delay-1000" />
            </div>
            <p className="text-cream-light/60">
              Built with ❤️ on Solana • Powered by Anchor • Shaping the Future of Social
            </p>
          </GlassCard>
        </motion.footer>
      </div>
    </div>
  );
};