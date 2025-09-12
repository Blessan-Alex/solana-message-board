import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'backdrop-blur-lg border border-primary-red/20 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-red/30';
  
  const variantClasses: Record<string, string> = {
    primary: 'bg-primary-red text-cream-light hover:bg-primary-red/80 border-primary-red',
    secondary: 'bg-cream-light/80 text-black-pure hover:bg-cream-light border-cream-light/40',
    ghost: 'bg-transparent text-black-pure/70 hover:bg-cream-light/20 hover:text-black-pure border-transparent',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const loadingClasses = loading ? 'opacity-70 cursor-not-allowed' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loadingClasses,
        disabledClasses,
        className
      )}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...(props as any)}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
