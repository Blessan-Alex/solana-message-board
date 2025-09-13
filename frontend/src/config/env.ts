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
  programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj', // Default program ID
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

  // Use environment variables if available, otherwise use defaults
  const programId = envProgramId || defaultConfig.programId;
  const network = envNetwork || defaultConfig.network;
  const rpcUrl = envRpcUrl || defaultConfig.rpcUrl;

  // Return configuration with environment variables or defaults
  return {
    network: network as 'localnet' | 'devnet' | 'mainnet-beta',
    programId: programId,
    rpcUrl: rpcUrl,
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
  programId: 'CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj', // Default program ID
  rpcUrl: 'https://api.devnet.solana.com',
};
