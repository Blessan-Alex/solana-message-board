import { useState } from 'react';
import { WalletContextProvider } from '@/components/wallet/WalletProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LandingPage } from '@/pages/LandingPage';
import { MessageBoard } from '@/pages/MessageBoard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'messageBoard'>('landing');

  const handleEnterApp = () => {
    setCurrentPage('messageBoard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <ErrorBoundary>
      <WalletContextProvider>
        <div className="App">
          {currentPage === 'landing' ? (
            <LandingPage onEnterApp={handleEnterApp} />
          ) : (
            <MessageBoard onBackToLanding={handleBackToLanding} />
          )}
        </div>
      </WalletContextProvider>
    </ErrorBoundary>
  );
}

export default App;
