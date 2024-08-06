import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define las interfaces para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  login: (token: string, userType: string) => void;
  logout: () => void;
}

// Provee un valor por defecto para el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('authToken');
  });
  const [userType, setUserType] = useState<string | null>(() => {
    return sessionStorage.getItem('userType');
  });

  const login = (token: string, userType: string) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userType', userType);
    setIsAuthenticated(true);
    setUserType(userType);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserType(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');
    if (token) {
      setIsAuthenticated(true);
      setUserType(userType);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
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