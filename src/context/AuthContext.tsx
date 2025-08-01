import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (token) {
          // Mock API call to validate token
          const user = await validateToken(token);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Session expired',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock API call
      const user = await mockLogin(credentials);
      localStorage.setItem('auth-token', 'mock-token');
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const register = async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock API call
      const user = await mockRegister(data);
      localStorage.setItem('auth-token', 'mock-token');
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
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

// Mock API functions
const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      id: '1',
      email: credentials.email,
      name: 'Test User',
      role: 'candidate',
      accessibilityPreferences: {
        highContrast: false,
        easyReading: false,
        keyboardNavigation: true,
        captions: false,
        screenReader: false,
      },
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockRegister = async (data: RegisterData): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    email: data.email,
    name: data.name,
    role: data.role,
    accessibilityPreferences: {
      highContrast: false,
      easyReading: false,
      keyboardNavigation: true,
      captions: false,
      screenReader: false,
    },
  };
};

const validateToken = async (token: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'candidate',
    accessibilityPreferences: {
      highContrast: false,
      easyReading: false,
      keyboardNavigation: true,
      captions: false,
      screenReader: false,
    },
  };
}; 