
import { useState, useEffect } from 'react';
import { UserProfile } from '../types/index';
import { userService } from '../services/userService';
import { useAppContext } from '../context/AppContext';

export const useUserProfile = () => {
  const { user, setUser, isAuthenticated, setAuthenticated, setReputation } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      // In mock mode, we don't automatically log in
      setLoading(false);
    };

    checkSession();
  }, []);

  const loadUser = async (userId: string) => {
    try {
      setLoading(true);
      const data = await userService.getUserProfile(userId);
      if (data) {
        setUser(data);
        setReputation(data.reputation);
        setAuthenticated(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Identity verification failed');
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    // Simply load the mock user
    loadUser('mock-id');
  };

  const logout = async () => {
    setAuthenticated(false);
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout
  };
};
