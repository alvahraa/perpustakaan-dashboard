import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap } from 'lucide-react';
import './index.css';
import { Sidebar, Header } from './components/Layout';
import { DashboardPage, VisitorsPage, LoansPage, RecommendationsPage, LoginPage, ConsolePage } from './pages';
import { DataModeIndicator } from './components/Common';

/**
 * Main App Component
 * 
 * Prototype Dashboard Analytics
 * - Login: Halaman login dengan animasi wallpaper
 * - Layout: Sidebar + Header + Content
 * - Navigation: Dashboard, Visitors, Loans, Recommendations
 * - Page transitions with AnimatePresence
 * - Stealth Console: Ctrl+Shift+X to access hidden System Console
 */

// Page title mapping
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  visitors: 'Analisis Kunjungan',
  loans: 'Analisis Peminjaman',
  recommendations: 'Sistem Rekomendasi',
  console: 'System Console'
};

// Storage key for auth
const AUTH_KEY = 'prototype_auth';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { duration: 0.15 }
  }
};

// Stealth Toast Component
function StealthToast({ show, onComplete }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div 
            className="flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full"
            />
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-200">Initializing Root Access...</span>
            </div>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showStealthToast, setShowStealthToast] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) {
      try {
        const userData = JSON.parse(savedAuth);
        setUser(userData);
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsCheckingAuth(false);
  }, []);

  // God Mode Shortcut: Ctrl+Shift+X
  const handleGodMode = useCallback(() => {
    if (user) { // Only if authenticated
      setShowStealthToast(true);
    }
  }, [user]);

  const handleStealthComplete = useCallback(() => {
    setShowStealthToast(false);
    setActivePage('console');
  }, []);

  // Global keyboard listener for God Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Shift+X triggers stealth console
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        handleGodMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGodMode]);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    setActivePage('dashboard');
  };

  // Render active page with key for AnimatePresence
  const renderPage = () => {
    const pages = {
      dashboard: <DashboardPage />,
      visitors: <VisitorsPage />,
      loans: <LoansPage />,
      recommendations: <RecommendationsPage />,
      console: <ConsolePage />,
    };
    return pages[activePage] || <DashboardPage />;
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show dashboard if authenticated
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage}
        user={user}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        {/* Header - hide for console page */}
        {activePage !== 'console' && (
          <Header 
            title={PAGE_TITLES[activePage]} 
            activePage={activePage}
            user={user}
            onNavigate={setActivePage}
          />
        )}
        
        {/* Page Content with Transitions */}
        <main className={`flex-1 overflow-auto ${activePage !== 'console' ? 'p-6' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className={activePage === 'console' ? 'h-full' : ''}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Demo Mode Badge */}
      <DataModeIndicator />

      {/* Stealth Toast */}
      <StealthToast show={showStealthToast} onComplete={handleStealthComplete} />
    </div>
  );
}

export default App;
