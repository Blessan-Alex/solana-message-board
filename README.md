# Tunnel

A decentralized message board built on Solana blockchain with a beautiful glassmorphism UI.

## What is Tunnel?

Tunnel is your private space cut out from the real world - a decentralized message board where you can post and read messages stored permanently on the Solana blockchain.

## Features

- **Decentralized**: Messages stored on Solana blockchain
- **Glassmorphism UI**: Beautiful frosted glass design
- **Wallet Integration**: Connect with Phantom/Solflare wallets
- **Real-time**: Live message posting and fetching
- **Responsive**: Works on desktop and mobile

## Tech Stack

**Backend (Solana Program)**
- Rust + Anchor framework
- Program ID: `CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj`
- Features: Message posting with timestamps, content validation (280 char limit)

**Frontend**
- React 18 + TypeScript
- Vite + Tailwind CSS
- Wallet adapters for Solana
- Framer Motion animations

## Quick Start

### Prerequisites
- Node.js 18+
- Solana CLI
- Anchor CLI

### Installation

```bash
# Clone and install
git clone <your-repo>
cd solana-message-board
npm install

# Build Solana program
anchor build

# Start frontend
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `frontend/.env`:
```env
VITE_PROGRAM_ID=CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj
VITE_NETWORK=devnet
VITE_RPC_URL=https://api.devnet.solana.com
```

### Deployment

**Vercel (Frontend)**
1. Set environment variables in Vercel dashboard
2. Deploy automatically on push

**Solana (Program)**
```bash
anchor deploy --provider.cluster devnet
```

## Usage

1. Connect your Solana wallet (Phantom/Solflare)
2. Post messages (280 character limit)
3. View all messages in chronological order
4. Messages are stored permanently on blockchain

## Project Structure

```
├── programs/solana-message-board/    # Solana smart contract
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/              # UI components
│   │   ├── services/               # Blockchain integration
│   │   └── pages/                  # App pages
└── tests/                          # Program tests
```

## Commands

```bash
# Program
anchor build          # Build program
anchor test           # Run tests
anchor deploy         # Deploy to cluster

# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

## License

MIT License