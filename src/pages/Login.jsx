// src/pages/Login.jsx (Versão Final com Novo Design e Lógica RBAC)

import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"; // Mantém os imports do Bootstrap
import { FaUsers } from "react-icons/fa"; // Usado para o ícone no topo do card
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import { FAKE_USERS } from '../rbacConfig'; 
import "../css/Login.css"; // Importa o novo CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credential, setCredential] = useState("");
  const [error, setError] = useState(null);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 

    const foundUser = FAKE_USERS.find(
      (u) => 
        u.credential === credential && 
        u.username === username && 
        u.password === password
    );

    if (foundUser) {
      login(foundUser.id);
      navigate('/home', { replace: true });
    } else {
      setError("Credenciais inválidas. Verifique os dados e tente novamente.");
    }
  };
  
  // Função para deslogar
  const handleLogout = () => {
    logout(); 
    // Limpa o formulário após deslogar, caso o usuário já estivesse logado
    setUsername("");
    setPassword("");
    setCredential("");
    setError(null);
  };

  return (
    <div className="login-page-background"> {/* Wrapper para o fundo azul */}
      
      
      <div className="login-logo-container">
        <h1 className="logo-otis">OTIS</h1>
        <h2 className="logo-skymanage">SKYMANAGE</h2>
      </div>

      {/* Container Principal do Formulário */}
      <div className="login-form-container">
        <Card className="login-card-design"> {/* Card branco com bordas arredondadas */}
          <Card.Body className="p-4">
            
            <div className="text-center mb-4">
              <FaUsers size={28} style={{ color: '#041c44' }} />
              <Card.Title className="fs-5 mt-2">Login - OTIS Skymanage</Card.Title>
            </div>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formCredential">
                <Form.Control
                  type="text"
                  placeholder="Credencial"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="nome do usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Senha "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3 login-button-otis">
                Entrar
              </Button>
            </Form>
            <div className="text-center">
              <a href="/recuperar-senha" className="recuperar-senha-link">
                Esqueceu sua senha? 
              </a>
            </div>
          

          

          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;