# Solana Message Board

A simple Solana program built with Anchor that allows users to post messages on a decentralized message board.

## Features

- ✅ Post messages with content validation
- ✅ Author tracking for each message
- ✅ Account initialization with proper space allocation
- ✅ Error handling for content length limits
- ✅ Integration with Solana System Program

## Program Structure

### Smart Contract (Rust/Anchor)
- **File**: `programs/solana-message-board/src/lib.rs`
- **Program ID**: `AEtjhvM2nkjjrvQF1K2xcPV9mERpbjqrZEvgKavmbuaR`

### Key Components

#### MessageAccount Struct
```rust
#[account]
pub struct MessageAccount {
    pub author: Pubkey,
    pub content: String,
}
```

#### post_message Instruction
```rust
pub fn post_message(ctx: Context<PostMessage>, content: String) -> Result<()> {
    require!(content.len() <= MAX_CONTENT_LENGTH, MessageError::ContentTooLong);
    
    let message_account = &mut ctx.accounts.message;
    message_account.author = ctx.accounts.author.key();
    message_account.content = content;
    
    Ok(())
}
```

## Prerequisites

- Rust (latest stable)
- Solana CLI (v1.18.23)
- Anchor CLI (v0.31.1)
- Node.js and npm
- Java 21 (for yarn compatibility)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd solana-message-board
```

2. Install dependencies:
```bash
npm install
```

3. Build the program:
```bash
anchor build
```

## Usage

### Running Tests
```bash
anchor test
```

### Deploying to Localnet
```bash
# Start local validator
solana-test-validator

# Deploy program
anchor deploy
```

## Development

### Project Structure
```
solana-message-board/
├── Anchor.toml              # Anchor configuration
├── Cargo.toml              # Rust workspace config
├── package.json            # Node.js dependencies
├── programs/
│   └── solana-message-board/
│       ├── Cargo.toml      # Program dependencies
│       ├── src/
│       │   └── lib.rs      # Main program code
│       └── Xargo.toml      # SBPF target config
├── tests/
│   └── solana-message-board.js  # Test suite
└── migrations/
    └── deploy.js           # Deployment script
```

### Available Commands

- `anchor build` - Build the program
- `anchor test` - Run tests
- `anchor deploy` - Deploy to configured cluster
- `anchor build --verifiable` - Build with Docker for verification

## License

This project is licensed under the MIT License.
