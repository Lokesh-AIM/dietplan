import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import { DietPlanProvider } from './context/DietPlanContext';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isComplete } = useOnboarding();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Set initial theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Listen for navigation events
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    
    // Handle internal navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = anchor.getAttribute('href') || '/';
        window.history.pushState({}, '', href);
        setCurrentPath(href);
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Handle auth redirects
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (currentPath === '/login' || currentPath === '/signup') {
          if (isComplete) {
            window.history.pushState({}, '', '/dashboard');
            setCurrentPath('/dashboard');
          } else {
            window.history.pushState({}, '', '/onboarding');
            setCurrentPath('/onboarding');
          }
        }
      } else {
        if (currentPath === '/dashboard' || currentPath === '/onboarding') {
          window.history.pushState({}, '', '/login');
          setCurrentPath('/login');
        }
      }
    }
  }, [isAuthenticated, isLoading, currentPath, isComplete]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-t-4 border-emerald-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render content based on path
  const renderContent = () => {
    // If user is authenticated, show appropriate page
    if (isAuthenticated) {
      if (currentPath === '/onboarding') {
        return <OnboardingPage />;
      }
      
      if (currentPath === '/dashboard' || isComplete) {
        return (
          <>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <div className="pt-16">
              <DashboardPage />
            </div>
            <Footer />
          </>
        );
      }
      
      // Default to onboarding if authenticated but not complete
      return <OnboardingPage />;
    }
    
    // For non-authenticated users
    if (currentPath === '/login') {
      return <AuthPage mode="login" />;
    }
    
    if (currentPath === '/signup') {
      return <AuthPage mode="signup" />;
    }
    
    // Default to landing page
    return (
      <>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <LandingPage />
        <Footer />
      </>
    );
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {renderContent()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <DietPlanProvider>
          <AppContent />
        </DietPlanProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;