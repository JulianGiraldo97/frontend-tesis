import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types';
import { apiClient } from '@/services/apiClient';
import { accessibilityUtils } from '@/utils/accessibilityUtils';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  validateSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async (): Promise<void> => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        try {
          await validateSession();
        } catch (err) {
          localStorage.removeItem('auth-token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.login(credentials);
      
      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        localStorage.setItem('auth-token', token);
        setUser(userData);
        setIsAuthenticated(true);
        
        accessibilityUtils.announceChange(
          `Sesión iniciada exitosamente. Bienvenido ${userData.name}`,
          'polite'
        );
      } else {
        throw new Error(response.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      
      accessibilityUtils.announceChange(
        `Error al iniciar sesión: ${errorMessage}`,
        'assertive'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.register(userData);
      
      if (response.success && response.data) {
        const { user: newUser, token } = response.data;
        
        localStorage.setItem('auth-token', token);
        setUser(newUser);
        setIsAuthenticated(true);
        
        accessibilityUtils.announceChange(
          `Cuenta creada exitosamente. Bienvenido ${newUser.name}`,
          'polite'
        );
      } else {
        throw new Error(response.message || 'Error al crear cuenta');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear cuenta';
      setError(errorMessage);
      
      accessibilityUtils.announceChange(
        `Error al crear cuenta: ${errorMessage}`,
        'assertive'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('auth-token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    accessibilityUtils.announceChange('Sesión cerrada exitosamente', 'polite');
  };

  const clearError = (): void => {
    setError(null);
  };

  const validateSession = async (): Promise<void> => {
    try {
      const response = await apiClient.validateToken();
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Token inválido');
      }
    } catch (err) {
      localStorage.removeItem('auth-token');
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    validateSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 