import { 
  Connection, 
  PublicKey, 
  Keypair,
  SystemProgram
} from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { SolanaConfig, Message, PostMessageParams } from '@/types';
import { config, defaultSolanaConfig, fallbackSolanaConfig } from '@/config/env';

// Import the actual generated IDL from Anchor
const IDL = {
  "address": config.programId,
  "metadata": {
    "name": "solana_message_board",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "post_message",
      "discriminator": [
        214,
        50,
        100,
        209,
        38,
        34,
        7,
        76
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true,
          "signer": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "MessageAccount",
      "discriminator": [
        97,
        144,
        24,
        58,
        225,
        40,
        89,
        223
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ContentTooLong",
      "msg": "Content exceeds maximum length"
    }
  ],
  "types": [
    {
      "name": "MessageAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export class SolanaService {
  private connection!: Connection;
  private program: Program | null = null;
  private programId!: PublicKey;
  private isInitialized = false;

  constructor(config: SolanaConfig) {
    this.initializeService(config);
  }


  private async initializeService(config: SolanaConfig) {
    try {
      this.programId = new PublicKey(config.programId);
      
      // Use configured RPC URL
      const rpcUrl = config.rpcUrl || 'https://api.devnet.solana.com';
      this.connection = new Connection(rpcUrl, 'confirmed');
      
      // Test connection with timeout
      const connectionPromise = this.connection.getVersion();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      );
      
      await Promise.race([connectionPromise, timeoutPromise]);
      
      // Create a dummy wallet for the provider (we'll use the user's wallet in actual calls)
      const dummyWallet = {
        publicKey: Keypair.generate().publicKey,
        signTransaction: async (tx: any) => tx,
        signAllTransactions: async (txs: any[]) => txs,
      };
      const provider = new AnchorProvider(this.connection, dummyWallet as any, {});
      
      // Use the program ID from the IDL instead of config
      this.program = new Program(IDL as any, provider);
      this.isInitialized = true;
      console.log('SolanaService initialized successfully with program ID:', this.programId.toString());
    } catch (error) {
      console.error('Failed to initialize SolanaService:', error);
      this.isInitialized = false;
      // Don't throw here, let the service handle initialization failures gracefully
    }
  }

  async postMessage(params: PostMessageParams, wallet: any, publicKey: any): Promise<string> {
    console.log('SolanaService.postMessage called with:', {
      isInitialized: this.isInitialized,
      hasProgram: !!this.program,
      wallet: wallet ? 'present' : 'missing',
      publicKey: publicKey?.toString(),
      paramsContent: params.content,
      paramsAuthor: params.author.toString()
    });

    if (!this.isInitialized || !this.program) {
      throw new Error('SolanaService not properly initialized');
    }

    if (!publicKey) {
      throw new Error('Public key not available');
    }

    try {
      // Create a new keypair for the message account
      const messageAccount = Keypair.generate();
      
      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash('confirmed');
      
      // Create the transaction using the correct method name from IDL
      const tx = await this.program.methods
        .postMessage(params.content)
        .accounts({
          message: messageAccount.publicKey,
          author: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([messageAccount])
        .transaction();

      // Set the recent blockhash and fee payer
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      // Sign the transaction with the message account first
      tx.sign(messageAccount);

      // Sign with the wallet - use the wallet adapter's signTransaction method
      let signedTx;
      if (wallet && wallet.signTransaction) {
        console.log('Using wallet adapter signTransaction');
        signedTx = await wallet.signTransaction(tx);
      } else if (window.solana && window.solana.signTransaction) {
        console.log('Using Standard Wallet API signTransaction');
        signedTx = await window.solana.signTransaction(tx);
      } else {
        throw new Error('No signing method available');
      }

      // Send the transaction
      const signature = await this.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      // Wait for confirmation
      await this.connection.confirmTransaction(signature, 'confirmed');
      
      // The timestamp is now stored on-chain in the message account
      // We'll get it when we fetch messages, so use current time as fallback
      const timestamp = Date.now();
      console.log('Message posted successfully - timestamp stored on-chain');
      
      // Return both signature and timestamp for the frontend to use
      return JSON.stringify({
        signature,
        timestamp: timestamp
      });
    } catch (error) {
      console.error('Error posting message:', error);
      throw new Error(`Failed to post message: ${error}`);
    }
  }

  async fetchMessages(): Promise<Message[]> {
    // Wait for initialization if not ready yet
    if (!this.isInitialized || !this.program) {
      // Since we're using devnet, try devnet directly
      await this.initializeService(fallbackSolanaConfig);
      
      if (!this.isInitialized || !this.program) {
        throw new Error('Failed to connect to Solana devnet. Please check your internet connection.');
      }
    }

    console.log('🔄 Fetching messages from updated program with on-chain timestamps...');

    try {
      // Fetch all message accounts using the correct account name from the IDL
      const accounts = await (this.program.account as any).messageAccount.all() as any[];
      
      // Read timestamps directly from the on-chain account data
      // Handle both old messages (without timestamp) and new messages (with timestamp)
      const messagesWithTimestamps = accounts.map((account: any, index: number) => {
        let timestamp: number;
        
        if (account.account.timestamp && account.account.timestamp > 0) {
          // New messages: timestamp stored on-chain
          timestamp = account.account.timestamp * 1000; // Convert Unix timestamp to milliseconds
          console.log(`✅ New message with on-chain timestamp:`, {
            account: account.publicKey.toString(),
            onChainTimestamp: account.account.timestamp,
            formatted: new Date(timestamp).toLocaleString()
          });
        } else {
          // Old messages: use relative timing based on account order
          const baseTime = Date.now();
          timestamp = baseTime - (index * 2000); // Each old message is 2 seconds older
          console.log(`⚠️ Old message with zero timestamp, using fallback:`, {
            account: account.publicKey.toString(),
            onChainTimestamp: account.account.timestamp,
            fallbackTimestamp: timestamp,
            formatted: new Date(timestamp).toLocaleString()
          });
        }
        
        const messageData = {
          author: account.account.author,
          content: account.account.content,
          accountAddress: account.publicKey,
          timestamp: timestamp,
        };
        
        return messageData;
      });
      
      // Sort messages by timestamp (newest first)
      return messagesWithTimestamps.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Failed to connect to Solana devnet. Please check your internet connection.');
      }
      throw new Error(`Failed to fetch messages: ${error}`);
    }
  }

  async initializeProgram(): Promise<string> {
    if (!this.isInitialized || !this.program) {
      throw new Error('SolanaService not properly initialized');
    }

    try {
      const tx = await this.program.methods
        .initialize()
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error initializing program:', error);
      throw new Error(`Failed to initialize program: ${error}`);
    }
  }

  getConnection(): Connection {
    return this.connection;
  }

  getProgram(): Program | null {
    return this.program;
  }

  getProgramId(): PublicKey {
    return this.programId;
  }

  isReady(): boolean {
    const ready = this.isInitialized && this.program !== null;
    return ready;
  }
}

// Export the service instance using the current configuration
export const solanaService = new SolanaService(defaultSolanaConfig);
