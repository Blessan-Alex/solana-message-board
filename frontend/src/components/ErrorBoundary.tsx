import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component to catch and handle React component errors
 * Provides a user-friendly error display with retry functionality
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-black-pure via-primary-red/10 to-black-pure flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <GlassCard className="text-center">
              <div className="space-y-6">
                {/* Error Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="w-8 h-8 text-primary-red" />
                </motion.div>

                {/* Error Message */}
                <div>
                  <h2 className="text-xl font-semibold text-cream-light mb-2">
                    Something went wrong
                  </h2>
                  <p className="text-beige-soft/70 text-sm">
                    The application encountered an unexpected error. This has been logged for our team to investigate.
                  </p>
                </div>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left">
                    <summary className="text-sm text-beige-soft/60 cursor-pointer hover:text-beige-soft/80">
                      Error Details (Development)
                    </summary>
                    <div className="mt-2 p-3 bg-black-pure/20 rounded-lg text-xs font-mono text-beige-soft/60 overflow-auto max-h-32">
                      <div className="mb-2">
                        <strong>Error:</strong> {this.state.error.message}
                      </div>
                      {this.state.error.stack && (
                        <div>
                          <strong>Stack:</strong>
                          <pre className="whitespace-pre-wrap mt-1">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <GlassButton
                    onClick={this.handleRetry}
                    variant="primary"
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </GlassButton>
                  
                  <GlassButton
                    onClick={this.handleReload}
                    variant="secondary"
                    className="flex-1"
                  >
                    Reload Page
                  </GlassButton>
                </div>

                {/* Additional Help */}
                <div className="text-xs text-beige-soft/50">
                  If the problem persists, please try refreshing the page or contact support.
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary for functional components
 * Note: This is a workaround since hooks can't catch errors
 * Use the class-based ErrorBoundary for actual error catching
 */
export const ErrorBoundaryWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
