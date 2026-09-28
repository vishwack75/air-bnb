import React from 'react';
import { cn } from '../../utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <main className={cn('max-w-[1280px] mx-auto px-6 min-h-[calc(100vh-200px)]', className)}>
      {children}
    </main>
  );
};
