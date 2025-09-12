/**
 * Environment configuration for the Solana Message Board dApp
 * This centralizes all environment-dependent values
 */

export interface AppConfig {
  network: 'localnet' | 'devnet' | 'mainnet-beta';
  programId: string;
  rpcUrl: string;
}

// Default configuration (fallback values) - these should be overridden by environment variables
const defaultConfig: AppConfig = {
  network: 'devnet',
  programId: '', // Must be set via environment variable
  rpcUrl: 'https://api.devnet.solana.com',
};

/**
 * Get the current environment configuration
 * Uses environment variables if available, otherwise falls back to defaults
 */
export function getConfig(): AppConfig {
  // Try to get environment from Vite environment variables
  const envNetwork = (import.meta as any).env?.VITE_NETWORK as string;
  const envProgramId = (import.meta as any).env?.VITE_PROGRAM_ID as string;
  const envRpcUrl = (import.meta as any).env?.VITE_RPC_URL as string;

  // Validate required environment variables
  if (!envProgramId) {
    throw new Error(
      'VITE_PROGRAM_ID environment variable is required. Please create a .env file with your program ID.'
    );
  }

  // If environment variables are available, use them
  if (envNetwork && envProgramId && envRpcUrl) {
    return {
      network: envNetwork as 'localnet' | 'devnet' | 'mainnet-beta',
      programId: envProgramId,
      rpcUrl: envRpcUrl,
    };
  }

  // Fallback to default with environment program ID
  return {
    ...defaultConfig,
    programId: envProgramId || '',
    rpcUrl: envRpcUrl || defaultConfig.rpcUrl,
  };
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
  programId: '', // Must be set via environment variable
  rpcUrl: 'https://api.devnet.solana.com',
};
