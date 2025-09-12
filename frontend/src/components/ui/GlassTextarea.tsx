import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
  showCounter?: boolean;
}

export const GlassTextarea: React.FC<GlassTextareaProps> = ({
  label,
  error,
  maxLength,
  showCounter = true,
  className,
  ...props
}) => {
  const currentLength = (props.value as string)?.length || 0;
  const isNearLimit = maxLength && currentLength > maxLength * 0.8;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <label className="block text-sm font-medium text-cream-light/80">
          {label}
        </label>
      )}
      
      <div className="relative">
        <motion.textarea
          className={cn(
            'w-full backdrop-blur-lg bg-cream-light/10 border border-cream-light/20 rounded-xl px-4 py-3 text-cream-light placeholder-beige-soft/50 focus:outline-none focus:ring-2 focus:ring-cream-light/30 focus:border-cream-light/40 transition-all duration-300 resize-none',
            error && 'border-primary-red/50 focus:ring-primary-red/30',
            className
          )}
          whileFocus={{ scale: 1.02 }}
          {...(props as any)}
        />
        
        {showCounter && maxLength && (
          <div className="absolute bottom-2 right-3 text-xs text-beige-soft/50">
            <span className={cn(
              isNearLimit && 'text-yellow-400',
              currentLength >= maxLength && 'text-primary-red'
            )}>
              {currentLength}/{maxLength}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          className="text-primary-red text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
