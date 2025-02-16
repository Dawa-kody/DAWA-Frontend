'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  exp?: number;
}

interface AuthContextType {
  token: string | null;
  userRole: string;
  isAdmin: boolean;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('UNKNOWN');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('access');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const role = decodedToken?.role || 'UNKNOWN';
      setUserRole(role);
      setIsAdmin(role === 'ROLE_TEACHER');  // <-- 여기서 isAdmin을 설정
    } catch (error) {
      console.error('토큰 디코딩 에러:', error);
    }
  }, [token]);
  

  return (
    <AuthContext.Provider value={{ token, userRole, isAdmin, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
