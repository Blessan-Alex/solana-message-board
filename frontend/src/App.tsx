import { useState, useEffect } from 'react';
import { WalletContextProvider } from '@/components/wallet/WalletProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { MessageBoard } from '@/pages/MessageBoard';
import { ProfileSetup } from '@/components/profile/ProfileSetup';
import { useWallet } from '@/hooks/useWallet';
import { useProfileStore } from '@/stores/profileStore';
import './App.css';

// Inner component that has access to wallet context
function AppContent() {
  // Initialize state from localStorage to persist across refreshes
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'profileSetup' | 'messageBoard'>(() => {
    const savedPage = localStorage.getItem('currentPage') as 'landing' | 'login' | 'profileSetup' | 'messageBoard';
    return savedPage || 'landing';
  });
  
  const { connected, publicKey } = useWallet();
  const { hasProfile, setCurrentProfile } = useProfileStore();

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Handle wallet connection and profile setup
  useEffect(() => {
    if (connected && publicKey) {
      setCurrentProfile(publicKey.toString());
      
      // Check if user has a profile set up
      if (hasProfile(publicKey.toString())) {
        // Only redirect to messageBoard if we're not already there or if we're on landing/login
        if (currentPage === 'landing' || currentPage === 'login') {
          setCurrentPage('messageBoard');
        }
      } else {
        // Only redirect to profileSetup if we're not already there or if we're on landing/login
        if (currentPage === 'landing' || currentPage === 'login') {
          setCurrentPage('profileSetup');
        }
      }
    } else if (!connected && (currentPage === 'messageBoard' || currentPage === 'profileSetup')) {
      // If wallet disconnects while in chat, go back to login
      setCurrentPage('login');
    }
  }, [connected, publicKey, hasProfile, setCurrentProfile, currentPage]);

  const handleEnterApp = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    // This will be handled by the useEffect above
  };

  const handleProfileSetupComplete = () => {
    setCurrentPage('messageBoard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onEnterApp={handleEnterApp} />
      ) : currentPage === 'login' ? (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess} 
          onBackToLanding={handleBackToLanding} 
        />
      ) : currentPage === 'profileSetup' ? (
        <ProfileSetup onComplete={handleProfileSetupComplete} />
      ) : (
        <MessageBoard onBackToLanding={handleBackToLogin} />
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WalletContextProvider>
        <AppContent />
      </WalletContextProvider>
    </ErrorBoundary>
  );
}

export default App;
