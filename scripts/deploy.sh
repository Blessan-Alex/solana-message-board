#!/bin/bash

# TUNNEL Deployment Script
# This script helps deploy the application to different environments

set -e

echo "🚀 TUNNEL Deployment Script"
echo "=========================="

# Function to deploy to devnet
deploy_devnet() {
    echo "📡 Deploying to Devnet..."
    
    # Build the program
    echo "🔨 Building smart contract..."
    anchor build
    
    # Deploy to devnet
    echo "🚀 Deploying to devnet..."
    anchor deploy --provider.cluster devnet
    
    echo "✅ Devnet deployment complete!"
    echo "📝 Update your frontend config with the new program ID"
}

# Function to deploy to mainnet
deploy_mainnet() {
    echo "⚠️  MAINNET DEPLOYMENT"
    echo "This will deploy to mainnet-beta and cost SOL!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📡 Deploying to Mainnet..."
        
        # Switch to mainnet
        solana config set --url https://api.mainnet-beta.solana.com
        
        # Build the program
        echo "🔨 Building smart contract..."
        anchor build
        
        # Deploy to mainnet
        echo "🚀 Deploying to mainnet-beta..."
        anchor deploy --provider.cluster mainnet-beta
        
        echo "✅ Mainnet deployment complete!"
        echo "📝 Update your frontend config with the new program ID"
        echo "💰 Remember to update Vercel environment variables"
    else
        echo "❌ Mainnet deployment cancelled"
    fi
}

# Function to build frontend
build_frontend() {
    echo "🎨 Building frontend..."
    cd frontend
    npm run build
    echo "✅ Frontend build complete!"
    echo "📁 Build files are in frontend/dist/"
}

# Function to test deployment
test_deployment() {
    echo "🧪 Testing deployment..."
    cd frontend
    npm run build
    npm run preview
}

# Main menu
case "$1" in
    "devnet")
        deploy_devnet
        ;;
    "mainnet")
        deploy_mainnet
        ;;
    "frontend")
        build_frontend
        ;;
    "test")
        test_deployment
        ;;
    *)
        echo "Usage: $0 {devnet|mainnet|frontend|test}"
        echo ""
        echo "Commands:"
        echo "  devnet   - Deploy smart contract to devnet"
        echo "  mainnet  - Deploy smart contract to mainnet-beta"
        echo "  frontend - Build frontend for production"
        echo "  test     - Test frontend build locally"
        echo ""
        echo "Examples:"
        echo "  $0 devnet    # Deploy to devnet"
        echo "  $0 frontend  # Build frontend"
        echo "  $0 test      # Test build locally"
        exit 1
        ;;
esac
