// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaTasks, FaUserCircle, FaSearch } from "react-icons/fa";
import { useAuth } from '../AuthContext'; // Importa o hook de autenticação
import "../css/Header.css";

const Header = ({ isSidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();             // ✅ Router hook
  const { user, logout } = useAuth();         // ✅ Obtém usuário e função de logout
  const [term, setTerm] = useState("");       // ✅ estado do campo

  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isTasksOpen, setTasksOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Nova notificação às 04:51 PM -03, 24/09/2025", time: "Há 5 min" },
    { id: 2, text: "Reunião agendada para amanhã", time: "Há 1 hora" },
  ];

  const tasks = [
    { id: 1, text: "Finalizar relatório de estoque", due: "Hoje" },
    { id: 2, text: "Reunião com equipe", due: "25/09/2025" },
  ];

  const handleSearch = () => {
    const q = term.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
    // (opcional) fecha dropdowns
    setNotificationsOpen(false);
    setTasksOpen(false);
    setProfileOpen(false);
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className={`header ${isSidebarCollapsed ? "collapsed" : "expanded"}`}>
      <div className="header-content">
        <div className="header-left">
          <FaBars className="hamburger-icon" onClick={toggleSidebar} />
        </div>

        <div className="header-center">
          <div className="header-search">
            <FaSearch className="search-icon" onClick={handleSearch} role="button" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              aria-label="Pesquisar"
            />
          </div>
        </div>

        <div className="header-right">
          <div className="dropdown">
            <FaBell className="dropdown-icon" onClick={() => setNotificationsOpen(!isNotificationsOpen)} />
            {isNotificationsOpen && (
              <div className="dropdown-menu">
                {notifications.map((notif) => (
                  <div key={notif.id} className="dropdown-item">
                    {notif.text} <span className="time">{notif.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown">
            <FaTasks className="dropdown-icon" onClick={() => setTasksOpen(!isTasksOpen)} />
            {isTasksOpen && (
              <div className="dropdown-menu">
                {tasks.map((task) => (
                  <div key={task.id} className="dropdown-item">
                    {task.text} <span className="due">{task.due}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Renderiza o ícone de perfil apenas se o usuário estiver logado */}
          {user && (
            <div className="dropdown">
              <FaUserCircle className="dropdown-icon profile-icon" onClick={() => setProfileOpen(!isProfileOpen)} />
              {isProfileOpen && (
                <div className="dropdown-menu profile-menu">
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <div className="text-muted small">{user.role}</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={() => navigate('/perfil')}>Perfil</div>
                  <div className="dropdown-item" onClick={() => navigate('/configuracoes')}>Configurações</div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={handleLogout}>Sair</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
