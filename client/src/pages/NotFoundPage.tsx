import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer className="flex items-center justify-center py-20 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-extrabold text-airbnb-red">404</h1>
        <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 text-sm">
          We can't seem to find the page you're looking for.
        </p>
        <Link to="/">
          <Button variant="primary" className="mt-4">
            Return Home
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
};
