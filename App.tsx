
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
import { Prediction, LeaderboardEntry, UserProfile } from './types/index';
import { usePredictions } from './hooks/usePredictions';
import { useUserProfile } from './hooks/useUserProfile';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Prediction | null>(null);
  const [selectedForecaster, setSelectedForecaster] = useState<LeaderboardEntry | null>(null);

  const { predictions, filter, setFilter, loading: predictionsLoading, error: predictionsError } = usePredictions();
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth();

  const isLoading = predictionsLoading || authLoading;
  const globalError = predictionsError;

  const featuredPredictions = useMemo(() => predictions.slice(0, 6), [predictions]);

  useEffect(() => {
    (window as any).activateThemeLab = () => setActiveTab('themelab');
    
    // Listen for custom global auth events
    const handleGlobalAuthRequest = () => setIsAuthModalOpen(true);
    window.addEventListener('open-auth-modal', handleGlobalAuthRequest);
    return () => window.removeEventListener('open-auth-modal', handleGlobalAuthRequest);
  }, []);

  const handleStart = useCallback(() => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateBack = () => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync authUser to legacy user structure for UI compatibility
  const currentUser: UserProfile | null = useMemo(() => {
    if (!authUser) return null;
    return {
      id: authUser.id,
      username: authUser.name,
      reputation: authUser.credibilityScore || 0,
      accuracy: 85,
      accuracyDelta: 0,
      percentile: 50,
      contrarianWins: 0,
      streak: 1,
      rank: 1000,
      level: 'Observer',
      tierScore: 0,
      predictionsCount: 0,
      referralCode: 'MOCK',
      expertise: { Economy: 0, Politics: 0, Science: 0, Sports: 0, Culture: 0 },
      history: []
    };
  }, [authUser]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-inter selection:bg-[var(--primary)] selection:text-white pb-20 transition-colors duration-300">
      <BackgroundMesh />
      
      {activeTab !== 'themelab' && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isAuthenticated={isAuthenticated} 
          onAuthClick={() => setIsAuthModalOpen(true)} 
          user={currentUser || {} as any}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {currentUser && (
        <ShareModal 
          isOpen={showShareModal} 
          onClose={() => setShowShareModal(false)} 
          user={currentUser} 
        />
      )}

      <AnimatePresence>
        {selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            isAuthenticated={isAuthenticated} 
            onAuthClick={() => setIsAuthModalOpen(true)} 
            user={currentUser || {} as any}
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
            user={currentUser || undefined} 
            predictions={predictions} 
            filter={filter} 
            setFilter={setFilter} 
            onSelectEvent={setSelectedEvent} 
          />
        )}

        {activeTab === 'leaderboard' && <Leaderboard onSelectUser={(u) => setSelectedForecaster(u)} />}
        {activeTab === 'profile' && currentUser && <Profile user={currentUser} onShare={() => setShowShareModal(true)} />}
        
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
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  </ErrorBoundary>
);
