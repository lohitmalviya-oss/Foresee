
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundMesh } from './components/shared/BackgroundMesh';
import { Navbar } from './components/layout/Navbar';
import { AuthModal } from './components/shared/AuthModal';
import { ShareModal } from './components/shared/ShareModal';
import { EventDetail } from './components/prediction/EventDetail';
import { Landing } from './components/dashboard/Landing';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './components/leaderboard/Leaderboard';
import { Profile } from './components/profile/Profile';
import { ForecasterProfile } from './components/profile/ForecasterProfile';
import { ThemeLab } from './pages/ThemeLab';
import { Methodology, Privacy, Support } from './components/static/StaticPages';
import { Prediction, LeaderboardEntry } from './types/index';
import { usePredictions } from './hooks/usePredictions';
import { useUserProfile } from './hooks/useUserProfile';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { AppProvider } from './context/AppContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Prediction | null>(null);
  const [selectedForecaster, setSelectedForecaster] = useState<LeaderboardEntry | null>(null);

  const { predictions, filter, setFilter, loading: predictionsLoading, error: predictionsError } = usePredictions();
  const { user, isAuthenticated, login, loading: userLoading, error: userError } = useUserProfile();

  const isLoading = predictionsLoading || userLoading;
  const globalError = predictionsError || userError;

  const featuredPredictions = useMemo(() => predictions.slice(0, 6), [predictions]);

  useEffect(() => {
    (window as any).activateThemeLab = () => setActiveTab('themelab');
    const openAuth = () => setShowAuthModal(true);
    window.addEventListener('open-auth-modal', openAuth);
    return () => window.removeEventListener('open-auth-modal', openAuth);
  }, []);

  const handleStart = useCallback(() => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAuthSuccess = useCallback(() => {
    login();
    setShowAuthModal(false);
    if (activeTab === 'landing') {
      setActiveTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [login, activeTab]);

  const navigateBack = () => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-inter selection:bg-[var(--primary)] selection:text-white pb-20 transition-colors duration-300">
      <BackgroundMesh />
      
      {activeTab !== 'themelab' && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isAuthenticated={isAuthenticated} 
          onAuthClick={() => setShowAuthModal(true)} 
          user={user || {} as any}
        />
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />

      {user && (
        <ShareModal 
          isOpen={showShareModal} 
          onClose={() => setShowShareModal(false)} 
          user={user} 
        />
      )}

      <AnimatePresence>
        {selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            isAuthenticated={isAuthenticated} 
            onAuthClick={() => setShowAuthModal(true)} 
            user={user || {} as any}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedForecaster && (
          <ForecasterProfile 
            forecaster={selectedForecaster} 
            onClose={() => setSelectedForecaster(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(isLoading || globalError) && activeTab !== 'themelab' && activeTab !== 'landing' && (
          <motion.div key="loader-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[var(--bg-page)] flex flex-col items-center justify-center">
            {globalError ? (
              <div className="text-center p-6">
                <div className="text-rose-500 font-black uppercase tracking-widest mb-4">Error Detected</div>
                <div className="text-[var(--text-main)] text-xl font-bold mb-6">{globalError}</div>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-[var(--primary-bg)] border border-[var(--border-color)] rounded-xl text-[var(--primary)] font-bold">Try Again</button>
              </div>
            ) : (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-[var(--primary-bg)] border-t-[var(--primary)] rounded-full mb-6" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="text-[var(--primary)] font-black tracking-[0.4em] uppercase">Synchronizing Nodes</motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main key={activeTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
        {activeTab === 'landing' && (
          <Landing 
            onStart={handleStart} 
            featuredPredictions={featuredPredictions}
            onSelectEvent={setSelectedEvent}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={user || undefined} 
            predictions={predictions} 
            filter={filter} 
            setFilter={setFilter} 
            onSelectEvent={setSelectedEvent} 
          />
        )}

        {activeTab === 'leaderboard' && <Leaderboard onSelectUser={(u) => setSelectedForecaster(u)} />}
        {activeTab === 'profile' && user && <Profile user={user} onShare={() => setShowShareModal(true)} />}
        
        {activeTab === 'methodology' && <Methodology onBack={navigateBack} />}
        {activeTab === 'privacy' && <Privacy onBack={navigateBack} />}
        {activeTab === 'support' && <Support onBack={navigateBack} />}

        {activeTab === 'themelab' && (
          <ThemeLab onBack={() => setActiveTab('landing')} />
        )}
      </motion.main>
    </div>
  );
};

export const App: React.FC = () => (
  <ErrorBoundary>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </ErrorBoundary>
);
