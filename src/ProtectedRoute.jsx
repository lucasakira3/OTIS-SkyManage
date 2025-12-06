// src/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROUTE_PERMISSIONS } from './rbacConfig';

const ProtectedRoute = ({ element }) => {
  const { user, can } = useAuth();
  const location = useLocation();

  // 1. Não logado: Redireciona para a tela de Login
  if (!user) {
    // Redireciona e mantém a rota original como state para, talvez, tentar redirecionar após o login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  
  // 2. Logado, mas checando permissão da rota
  const requiredPermission = ROUTE_PERMISSIONS[location.pathname];

  // Se a rota requer uma permissão específica E o usuário NÃO a tem
  if (requiredPermission && !can(requiredPermission)) {
    // Redireciona para a Home (ou uma página de "Acesso Negado")
    console.warn(`Acesso negado: Usuário ${user.role} tentou acessar ${location.pathname} sem a permissão ${requiredPermission}.`);
    return <Navigate to="/" replace />;
  }

  // 3. Logado e com permissão: Renderiza o elemento (a página)
  return element;
};

export default ProtectedRoute;