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
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'profileSetup' | 'messageBoard'>('landing');
  const { connected, publicKey } = useWallet();
  const { hasProfile, setCurrentProfile } = useProfileStore();

  // Handle wallet connection and profile setup
  useEffect(() => {
    if (connected && publicKey) {
      setCurrentProfile(publicKey.toString());
      
      // Check if user has a profile set up
      if (hasProfile(publicKey.toString())) {
        setCurrentPage('messageBoard');
      } else {
        setCurrentPage('profileSetup');
      }
    }
  }, [connected, publicKey, hasProfile, setCurrentProfile]);

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
