import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { GlassmorphismProps } from '@/types';

interface GlassCardProps extends GlassmorphismProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'card',
  hover = true,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'backdrop-blur-lg border border-cream-light/20 rounded-2xl shadow-lg';
  
  const variantClasses: Record<string, string> = {
    card: 'bg-cream-light/10 backdrop-blur-lg border-cream-light/20 p-6',
    button: 'bg-beige-soft/5 p-4 cursor-pointer transition-all duration-300',
    modal: 'bg-cream-light/15 p-8 max-w-md mx-auto',
    input: 'bg-beige-soft/5 p-4',
  };

  const hoverClasses = hover && !disabled ? 'hover:bg-cream-light/20 hover:border-cream-light/30 hover:shadow-xl' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        disabledClasses,
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={hover && !disabled ? { scale: 1.02 } : {}}
      whileTap={hover && !disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
