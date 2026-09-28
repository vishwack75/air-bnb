import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AuthModal } from '../features/auth/components/AuthModal';
import { useAuth } from '../features/auth/hooks/useAuth';
import { GalleryProvider } from '../context/GalleryContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const headerVariant = location.pathname === '/' ? 'home' : 'compact';

  return (
    <GalleryProvider>
      <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-gray-900">
        <Header
          variant={headerVariant}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={logout}
        />
        <div className="flex-1">{children}</div>
        <Footer />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </GalleryProvider>
  );
};
