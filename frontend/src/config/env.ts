/**
 * Environment configuration for the Solana Message Board dApp
 * This centralizes all environment-dependent values
 */

export interface AppConfig {
  network: 'localnet' | 'devnet' | 'mainnet-beta';
  programId: string;
  rpcUrl: string;
}

// Default configuration (fallback values)
const defaultConfig: AppConfig = {
  network: 'devnet',
  programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj',
  rpcUrl: 'https://api.devnet.solana.com',
};

// Environment-specific configurations
const configs: Record<string, AppConfig> = {
  localnet: {
    network: 'localnet',
    programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj',
    rpcUrl: 'http://127.0.0.1:8899',
  },
  devnet: {
    network: 'devnet',
    programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj',
    rpcUrl: 'https://api.devnet.solana.com',
  },
  'mainnet-beta': {
    network: 'mainnet-beta',
    programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  },
};

/**
 * Get the current environment configuration
 * Uses environment variables if available, otherwise falls back to defaults
 */
export function getConfig(): AppConfig {
  // Try to get environment from Vite environment variables
  const envNetwork = import.meta.env.VITE_NETWORK as string;
  const envProgramId = import.meta.env.VITE_PROGRAM_ID as string;
  const envRpcUrl = import.meta.env.VITE_RPC_URL as string;

  // If environment variables are available, use them
  if (envNetwork && envProgramId && envRpcUrl) {
    return {
      network: envNetwork as 'localnet' | 'devnet' | 'mainnet-beta',
      programId: envProgramId,
      rpcUrl: envRpcUrl,
    };
  }

  // Otherwise, try to detect environment from URL or use default
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return configs.localnet;
  }

  return defaultConfig;
}

// Export the current configuration
export const config = getConfig();

// Export individual configs for backward compatibility
export const defaultSolanaConfig = {
  network: config.network,
  programId: config.programId,
  rpcUrl: config.rpcUrl,
};

export const fallbackSolanaConfig = {
  network: 'devnet' as const,
  programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj',
  rpcUrl: 'https://api.devnet.solana.com',
};
