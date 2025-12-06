// src/components/Sidebar.jsx (VERSÃO COM FILTRO RBAC)

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import { MENU_ITEMS } from '../sidebarConfig'; 
import '../css/Sidebar.css';


const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, can, logout } = useAuth(); 
  const navigate = useNavigate();

  // Estado para controlar o submenu de Ordens de Serviço
  const [isOSMenuOpen, setIsOSMenuOpen] = useState(false);
  
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    // Redireciona para a página de login após o logout
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Cabeçalho com informações do usuário */}
      <div className="sidebar-header text-center">
        <h5 className="mt-2">Olá, {user.name.split(' ')[0]}</h5>
        <p className="text-muted small">{user.role}</p> 
      </div>
      
      <ul className="nav flex-column flex-grow-1">
        {/* Renderiza o link Home estaticamente */}
        <li className="nav-item">
          <NavLink to="/home" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            {/* Espaço para o ícone a ser adicionado depois */}
            {!isCollapsed && <span>Home</span>}
          </NavLink>
        </li>

        {/* Bloco para Ordens de Serviço com submenu como irmão */}
        <>
          <li className="nav-item">
            <a 
              href="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                setIsOSMenuOpen(!isOSMenuOpen);
              }}
              aria-expanded={isOSMenuOpen}
            >
              <span style={{ marginRight: '10px', width: '10px' }}>{isOSMenuOpen ? '▼' : '▶'}</span>
              {!isCollapsed && <span>Ordens de Serviço</span>}
            </a>
          </li>
          {/* O submenu é renderizado FORA do <li> para garantir o fluxo vertical */}
          <ul className={`submenu ${isOSMenuOpen && !isCollapsed ? 'active' : ''}`}>
            {can('VISUALIZAR_CORRETIVA') && (
              <li><NavLink to="/corretiva" className="nav-link sub-link">Corretiva</NavLink></li>
            )}
            {can('VISUALIZAR_PREVENTIVA') && (
              <li><NavLink to="/preventiva" className="nav-link sub-link">Preventiva</NavLink></li>
            )}
            <li><NavLink to="/instalacao" className="nav-link sub-link">Instalação</NavLink></li>
          </ul>
        </>

        {/* Mapeia os itens restantes, excluindo os que já foram tratados */}
        {MENU_ITEMS
          // Filtra apenas os itens que foram movidos para o submenu "Ordens de Serviço"
          .filter(item => !['/', '/corretiva', '/preventiva', '/instalacao'].includes(item.path)) 
          .map((item) => {
            const isPermRequired = item.requiredPermission;
            if (!isPermRequired || can(isPermRequired)) {
              return (
                <li className="nav-item" key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    {/* Espaço para o ícone a ser adicionado depois */}
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              );
            }
            return null;
          })}

        {/* Botão de Sair / Trocar Usuário */}
        <li className="nav-item mt-auto mb-2">
          <button onClick={handleLogout} className="nav-link text-start w-100">
            {!isCollapsed && <span>Sair</span>}
          </button>
        </li>
      </ul>
      
    </div>
  );
};

export default Sidebar;