import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  loginWithGoogle: async () => {},
  loginWithApple: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, check local storage or cookies for auth token
        const savedUser = localStorage.getItem('dietPlannerUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to authenticate
      // This is a mock implementation
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
      
      setUser(mockUser);
      localStorage.setItem('dietPlannerUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to register user
      // This is a mock implementation
      const mockUser: User = {
        id: '1',
        name,
        email,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
      
      setUser(mockUser);
      localStorage.setItem('dietPlannerUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dietPlannerUser');
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Mock implementation for Google login
      const mockUser: User = {
        id: '2',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
      
      setUser(mockUser);
      localStorage.setItem('dietPlannerUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    try {
      // Mock implementation for Apple login
      const mockUser: User = {
        id: '3',
        name: 'Apple User',
        email: 'user@icloud.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
      
      setUser(mockUser);
      localStorage.setItem('dietPlannerUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        loginWithGoogle,
        loginWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};