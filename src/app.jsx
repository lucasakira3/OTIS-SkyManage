// src/App.jsx (CÓDIGO CORRIGIDO)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// IMPORTS NECESSÁRIOS PARA RBAC
import { AuthProvider } from './AuthContext.jsx'; 
import ProtectedRoute from './ProtectedRoute.jsx'; 

import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ChatGerenteCliente from './pages/ChatGerenteCliente.jsx';
import ChatTemporario from './pages/ChatTemporario.jsx';
import MaquinasFerramentas from './pages/MaquinasFerramentas.jsx';
import Home from './pages/Home.jsx';
import RecuperarSenha from './pages/RecuperarSenha.jsx';
import Corretiva from './pages/Corretiva.jsx';
import Preventiva from './pages/Preventiva.jsx';
import Instalacao from './pages/Instalacao.jsx';
import Rastreamento from './pages/Rastreamento.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Estoque from './pages/Estoque.jsx';
import Fornecedores from './pages/Fornecedores.jsx';
import Filiais from './pages/Filiais.jsx';
import Clientes from './pages/Clientes.jsx';
import Login from './pages/Login.jsx';
import Buscar from "./pages/Buscar.jsx";
import Catalogo from './pages/Catalogo.jsx';
import './css/App.css';


// Componente que contém a lógica de layout e rotas
const AppContent = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Rotas onde o layout (Header/Sidebar) deve ser escondido
  const hideLayoutOnRoutes = ['/', '/login', '/recuperar-senha'];
  const hideLayout = hideLayoutOnRoutes.includes(location.pathname);

  return (
    <div className="app">
      {/* Renderiza o layout apenas se a rota não estiver na lista de exceções */}
      {!hideLayout && (
        <>
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <Header 
            isSidebarCollapsed={isSidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
            className={isSidebarCollapsed ? 'collapsed' : 'expanded'} 
          />
        </>
      )}
      
      
      <div className="main-content" style={{ marginTop: hideLayout ? '0' : '60px', marginLeft: hideLayout || isSidebarCollapsed ? '0' : '220px' }}>
        <Routes>
          {/* ROTAS PÚBLICAS (sem layout principal) */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />

          {/* ROTAS PROTEGIDAS (com layout principal) */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/corretiva" element={<ProtectedRoute element={<Corretiva />} />} />
          <Route path="/preventiva" element={<ProtectedRoute element={<Preventiva />} />} />
          <Route path="/instalacao" element={<ProtectedRoute element={<Instalacao />} />} />
          <Route path="/rastreamento" element={<ProtectedRoute element={<Rastreamento />} />} />
          <Route path="/usuarios" element={<ProtectedRoute element={<Usuarios />} />} />
          <Route path="/estoque" element={<ProtectedRoute element={<Estoque />} />} />
          <Route path="/fornecedores" element={<ProtectedRoute element={<Fornecedores />} />} />
          <Route path="/filiais" element={<ProtectedRoute element={<Filiais />} />} />
          <Route path="/clientes" element={<ProtectedRoute element={<Clientes />} />} />
          <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} />} />

          {/* Outras rotas que podem ou não ser protegidas */}
          <Route path="/chat-temporario" element={<ChatTemporario/>} />
          <Route path="/chat-gerente-cliente" element={<ChatGerenteCliente />} />
          <Route path="/maquinas-ferramentas" element={<MaquinasFerramentas />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;