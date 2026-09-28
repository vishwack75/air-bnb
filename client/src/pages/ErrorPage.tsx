import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';

interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetErrorBoundary }) => {
  return (
    <PageContainer className="flex items-center justify-center py-20 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Something went wrong</h1>
        <p className="text-gray-600 text-sm">
          {error?.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <Button
          variant="primary"
          onClick={() => (resetErrorBoundary ? resetErrorBoundary() : window.location.reload())}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    </PageContainer>
  );
};
