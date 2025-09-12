# Solana Message Board Frontend

A beautiful, glassmorphism-based React frontend for the Solana Message Board dApp.

## ✨ Features

- **Glassmorphism UI**: Beautiful frosted glass effects with blur and transparency
- **Wallet Integration**: Seamless Phantom and Solflare wallet connection
- **Real-time Updates**: Live message posting and fetching from Solana blockchain
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: React 18, Vite, Tailwind CSS, Zustand

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana CLI (for local development)
- Anchor CLI (for program deployment)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable glassmorphism components
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassInput.tsx
│   │   └── GlassTextarea.tsx
│   ├── wallet/          # Wallet connection components
│   │   ├── WalletProvider.tsx
│   │   └── WalletButton.tsx
│   └── message/         # Message board components
│       ├── MessageForm.tsx
│       ├── MessageCard.tsx
│       └── MessageList.tsx
├── hooks/               # Custom React hooks
│   ├── useWallet.ts
│   └── useMessages.ts
├── services/            # Solana blockchain integration
│   └── solanaService.ts
├── stores/              # Zustand state management
│   ├── walletStore.ts
│   └── messagesStore.ts
├── types/               # TypeScript interfaces
│   └── index.ts
├── utils/               # Utility functions
│   └── index.ts
├── pages/               # Page components
│   ├── Home.tsx
│   └── NotFound.tsx
└── test/                # Test files
    ├── setup.ts
    ├── GlassButton.test.tsx
    └── utils.test.ts
```

## 🎨 Design System

### Glassmorphism Components

All UI components follow glassmorphism principles:

- **Backdrop blur**: `backdrop-blur-lg`
- **Transparency**: `bg-white/10` to `bg-white/20`
- **Subtle borders**: `border-white/20`
- **Soft shadows**: `shadow-lg`
- **Rounded corners**: `rounded-xl` to `rounded-2xl`

### Color Palette

- **Primary**: Purple gradients (`from-purple-500/20 to-pink-500/20`)
- **Background**: Dark gradient (`from-purple-900 via-blue-900 to-indigo-900`)
- **Text**: White with opacity variations (`text-white`, `text-white/80`, `text-white/60`)
- **Accents**: Solana purple (`#9945FF`), green (`#14F195`), blue (`#00D4FF`)

### Animations

- **Page transitions**: Fade in with slide up
- **Hover effects**: Scale and glow
- **Loading states**: Spinning indicators
- **Background**: Floating orbs with continuous motion

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_SOLANA_NETWORK=localnet
VITE_SOLANA_RPC_URL=http://127.0.0.1:8899
VITE_PROGRAM_ID=AEtjhvM2nkjjrvQF1K2xcPV9mERpbjqrZEvgKavmbuaR
```

### Solana Configuration

The app is configured for localnet development by default. To use devnet or mainnet:

1. Update `WalletContextProvider.tsx` endpoint
2. Update `solanaService.ts` configuration
3. Deploy your program to the target network

## 🧪 Testing

The project uses Vitest and React Testing Library for testing:

- **Unit tests**: Component behavior and utility functions
- **Integration tests**: Wallet and message interactions
- **Coverage**: Aim for 80%+ coverage

### Test Structure

```typescript
// Component tests
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Test rendering
  });
  
  it('handles user interactions', () => {
    // Test interactions
  });
});

// Utility tests
describe('utilityFunction', () => {
  it('handles edge cases', () => {
    // Test edge cases
  });
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment

```bash
# Build for production
npm run build

# The dist folder contains your static files
# Upload to any static hosting service
```

## 🔗 Integration with Backend

The frontend integrates with the Solana Message Board program:

1. **Program ID**: `AEtjhvM2nkjjrvQF1K2xcPV9mERpbjqrZEvgKavmbuaR`
2. **Instructions**: `initialize`, `postMessage`
3. **Accounts**: `MessageAccount` with `author` and `content` fields

### Key Integration Points

- **Wallet Connection**: Uses `@solana/wallet-adapter-react`
- **Transaction Signing**: Handled by wallet adapters
- **Account Management**: Automatic account creation for messages
- **Error Handling**: User-friendly error messages

## 🎯 Future Enhancements

- [ ] Message reactions and replies
- [ ] User profiles and avatars
- [ ] Message search and filtering
- [ ] Real-time notifications
- [ ] Dark/light theme toggle
- [ ] Mobile app (React Native)
- [ ] Social features (follow, mentions)
- [ ] NFT profile pictures
- [ ] Message encryption
- [ ] Offline support

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

- GitHub Issues: Report bugs and request features
- Discord: Join our community
- Twitter: Follow for updates

---

Built with ❤️ using Solana, React, and glassmorphism design principles.
