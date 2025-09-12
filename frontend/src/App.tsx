import { useState } from 'react';
import { WalletContextProvider } from '@/components/wallet/WalletProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { MessageBoard } from '@/pages/MessageBoard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'messageBoard'>('landing');

  const handleEnterApp = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('messageBoard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <ErrorBoundary>
      <WalletContextProvider>
        <div className="App">
          {currentPage === 'landing' ? (
            <LandingPage onEnterApp={handleEnterApp} />
          ) : currentPage === 'login' ? (
            <LoginPage 
              onLoginSuccess={handleLoginSuccess} 
              onBackToLanding={handleBackToLanding} 
            />
          ) : (
            <MessageBoard onBackToLanding={handleBackToLogin} />
          )}
        </div>
      </WalletContextProvider>
    </ErrorBoundary>
  );
}

export default App;
