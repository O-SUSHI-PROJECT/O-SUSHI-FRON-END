'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api';

interface AuthContextType {
  apiKey: string | null;
  isAuthenticated: boolean;
  login: (apiKey: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há uma API key salva no localStorage
    const savedApiKey = localStorage.getItem('o-sushi-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      apiService.setApiKey(savedApiKey);
    }
    setLoading(false);
  }, []);

  const login = async (newApiKey: string): Promise<boolean> => {
    try {
      setLoading(true);
      apiService.setApiKey(newApiKey);
      
      // Testar a API key fazendo uma chamada de health check
      await apiService.checkHealth();
      
      setApiKey(newApiKey);
      localStorage.setItem('o-sushi-api-key', newApiKey);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      apiService.clearApiKey();
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setApiKey(null);
    apiService.clearApiKey();
    localStorage.removeItem('o-sushi-api-key');
  };

  const value: AuthContextType = {
    apiKey,
    isAuthenticated: !!apiKey,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 