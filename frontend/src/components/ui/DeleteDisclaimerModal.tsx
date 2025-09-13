import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';

interface DeleteDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  messageContent: string;
  isLoading?: boolean;
}

export const DeleteDisclaimerModal: React.FC<DeleteDisclaimerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  messageContent,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black-pure/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <GlassCard className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream-light font-heading">
                      Delete Message
                    </h3>
                    <p className="text-beige-soft/70 text-sm">
                      Message will be hidden from the board
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 text-beige-soft hover:text-cream-light hover:bg-beige-soft/10 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Warning Content */}
              <div className="space-y-4 mb-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Trash2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="text-red-400 font-semibold text-sm">
                        Message Deletion Warning
                      </h4>
                      <p className="text-red-300/80 text-sm leading-relaxed">
                        Once deleted, this message will be marked as deleted and hidden from the message board. 
                        The message data remains on the blockchain but will no longer be visible to users.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="bg-gradient-to-r from-black-pure/20 to-black-pure/10 border border-cream-light/10 rounded-xl p-4">
                  <h5 className="text-cream-light font-medium text-sm mb-2">Message to delete:</h5>
                  <div className="bg-black-pure/30 rounded-lg p-3 border border-beige-soft/10">
                    <p className="text-beige-soft/80 text-sm leading-relaxed line-clamp-3">
                      {messageContent}
                    </p>
                  </div>
                </div>

                {/* Additional Disclaimer */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-yellow-400 font-semibold text-sm mb-1">
                        Soft Delete Implementation
                      </h4>
                      <p className="text-yellow-300/80 text-sm leading-relaxed">
                        This uses a "soft delete" approach - the message is marked as deleted but the data 
                        remains on the blockchain. The deletion transaction will be recorded permanently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-beige-soft/20 to-cream-light/20 text-cream-light rounded-xl hover:from-beige-soft/30 hover:to-cream-light/30 transition-all duration-300 text-sm font-semibold border border-beige-soft/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: isLoading ? 1 : 1.02,
                    y: isLoading ? 0 : -1
                  }}
                  whileTap={{ 
                    scale: isLoading ? 1 : 0.98,
                    y: isLoading ? 0 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-cream-light rounded-xl hover:from-red-500/80 hover:to-red-600/80 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-red-500/20 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ 
                    scale: isLoading ? 1 : 1.02,
                    y: isLoading ? 0 : -1
                  }}
                  whileTap={{ 
                    scale: isLoading ? 1 : 0.98,
                    y: isLoading ? 0 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-cream-light/30 border-t-cream-light rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Hide Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
