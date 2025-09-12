# 🚀 Vercel Deployment Guide - Solana Message Board

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Solana Program Deployed**: Your Anchor program should be deployed to devnet

## 🔧 Environment Variables for Vercel

### Required Environment Variables:

```bash
VITE_NETWORK=devnet
VITE_PROGRAM_ID=CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj
VITE_RPC_URL=https://api.devnet.solana.com
```

### Optional Environment Variables:

```bash
# Custom RPC endpoint (if you want to use a different one)
VITE_RPC_URL=https://your-custom-rpc-endpoint.com

# Analytics (if you plan to add them)
VITE_ANALYTICS_ID=your-analytics-id
```

## 🚀 Deployment Steps

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

5. **Set Environment Variables**:
   ```bash
   vercel env add VITE_NETWORK
   # Enter: devnet
   
   vercel env add VITE_PROGRAM_ID
   # Enter: CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj
   
   vercel env add VITE_RPC_URL
   # Enter: https://api.devnet.solana.com
   ```

6. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Connect GitHub Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add the three required variables listed above

4. **Deploy**:
   - Click "Deploy"

## 📁 Project Structure for Deployment

```
solana-message-board/
├── frontend/                 # ← Deploy this directory
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vercel.json          # ← Already configured for devnet
│   ├── vite.config.ts
│   └── .env.example         # ← Reference for environment variables
├── programs/                # ← Not needed for frontend deployment
├── target/                  # ← Not needed for frontend deployment
└── ...
```

## ✅ Pre-Deployment Checklist

- [ ] **Build Test**: Run `npm run build` locally - should succeed
- [ ] **Environment Variables**: All required variables are set
- [ ] **Program Deployed**: Solana program is deployed to devnet
- [ ] **GitHub Repository**: Code is pushed to GitHub
- [ ] **Vercel Configuration**: `vercel.json` is properly configured

## 🔍 Post-Deployment Verification

1. **Check Build Logs**: Ensure no build errors
2. **Test Wallet Connection**: Connect wallet on deployed site
3. **Test Message Posting**: Post a test message
4. **Check Timestamps**: Verify timestamps are working correctly
5. **Test Message Loading**: Refresh and verify messages persist

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check if all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally

2. **Environment Variables Not Working**:
   - Verify variable names start with `VITE_`
   - Redeploy after adding environment variables

3. **Wallet Connection Issues**:
   - Ensure you're using the correct network (devnet)
   - Check if the program ID is correct

4. **Messages Not Loading**:
   - Verify RPC URL is accessible
   - Check if program is deployed to devnet

## 📊 Performance Optimization

The app is already optimized with:
- ✅ **Code Splitting**: Automatic with Vite
- ✅ **Tree Shaking**: Unused code removed
- ✅ **Minification**: Assets are minified
- ✅ **Caching**: Static assets cached by Vercel

## 🔒 Security Notes

- ✅ **Environment Variables**: Sensitive data in environment variables
- ✅ **Input Sanitization**: DOMPurify prevents XSS
- ✅ **No Hardcoded Secrets**: All secrets moved to environment variables

## 📈 Monitoring

After deployment, monitor:
- **Build Success Rate**: Check Vercel dashboard
- **User Interactions**: Wallet connections, message posts
- **Error Rates**: Check browser console for errors
- **Performance**: Core Web Vitals in Vercel Analytics

---

## 🎉 You're Ready to Deploy!

Your Solana Message Board is production-ready with:
- ✅ Secure environment configuration
- ✅ Optimized build process
- ✅ Proper error handling
- ✅ Modern web3 best practices

**Happy Deploying!** 🚀
