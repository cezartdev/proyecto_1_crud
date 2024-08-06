import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define las interfaces para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  userEmail: string | null;
  login: (token: string, userType: string, userEmail: string) => void;
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
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('userEmail');
  });

  const login = (token: string, userType: string, userEmail: string) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userType', userType);
    sessionStorage.setItem('userEmail', userEmail);
    setIsAuthenticated(true);
    setUserType(userType);
    setUserEmail(userEmail);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserType(null);
    setUserEmail(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');
    const userEmail = sessionStorage.getItem('userEmail');
    if (token) {
      setIsAuthenticated(true);
      setUserType(userType);
      setUserEmail(userEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userEmail, login, logout }}>
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