import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'name' | 'email'>>) => void;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string): boolean => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return password.length >= 8 && hasUpper && hasLower && hasNumber;
  };

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const persistedUser = localStorage.getItem('auth-user');
      let mockUser: User = {
        id: '1',
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        role: 'candidate',
      };
      if (persistedUser) {
        try {
          mockUser = JSON.parse(persistedUser) as User;
        } catch {
          mockUser = {
            id: '1',
            name: 'María González',
            email: 'maria.gonzalez@email.com',
            role: 'candidate',
          };
        }
      }
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock login - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'María González',
          email: credentials.email,
          role: 'candidate'
        };
        
        localStorage.setItem('auth-token', 'mock-token');
        localStorage.setItem('auth-user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isValidEmail(userData.email)) {
        throw new Error('El correo electrónico no tiene un formato válido');
      }

      if (!isStrongPassword(userData.password)) {
        throw new Error(
          'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número'
        );
      }

      // Mock registration - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
      
      localStorage.setItem('auth-token', 'mock-token');
      localStorage.setItem('auth-user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear cuenta';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (data: Partial<Pick<User, 'name' | 'email'>>): void => {
    setUser(prev => {
      if (!prev) return prev;
      const updatedUser: User = {
        ...prev,
        ...data,
      };
      localStorage.setItem('auth-user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logout = (): void => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    updateProfile,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
