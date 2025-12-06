// src/AuthContext.jsx

import React, { createContext, useContext, useState, useMemo } from 'react';
import { PERMISSIONS_MAP, FAKE_USERS } from './rbacConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Inicializa o usuário lendo do localStorage para simular "manter logado"
  // Ou inicia como null se não houver nada
  const initialUser = JSON.parse(localStorage.getItem('fakeUser')) || null;
  const [user, setUser] = useState(initialUser); 
  
  // Função que simula o login
  const login = (userId) => {
    
    const foundUser = FAKE_USERS.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      // Salva o usuário no storage para persistir (simulação)
      localStorage.setItem('fakeUser', JSON.stringify(foundUser)); 
    }
  };

  // Função para deslogar o usuário
  const logout = () => {
    setUser(null);
    localStorage.removeItem('fakeUser');
    // O redirecionamento será feito no componente que chamar o logout
  };
  
  // Função principal do RBAC: Checa se o usuário tem a permissão
  const can = (permission) => {
    if (!user) {
      return false; // Não logado, não tem permissão
    }
    
    // Pega as permissões do papel do usuário
    const userPermissions = PERMISSIONS_MAP[user.role] || [];
    
    // Checa a permissão coringa (RESP_GERAL)
    if (userPermissions.includes('EDITAR_TUDO')) {
      return true;
    }

    // Checa se a permissão requerida está na lista do usuário
    return userPermissions.includes(permission);
  };
  
  const value = useMemo(() => ({
    user,
    login,
    logout, // Exporta a função logout
    can
  }), [user]); // A dependência do useMemo continua sendo 'user'

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext);