import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default AuthGuard;
