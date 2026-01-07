import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loginSuccess, logout } from '../store/slices/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check for stored auth data on app start
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUser = await AsyncStorage.getItem('authUser');
        
        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser);
          dispatch(loginSuccess({ user, token: storedToken }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
