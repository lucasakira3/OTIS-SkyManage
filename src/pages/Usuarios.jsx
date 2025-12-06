import React from "react";
import { FaUsers } from "react-icons/fa";


//Oia que daora, a gente virou funcionário da OTIS!
const USUARIOS = [
  { id: 1, nome: "Alan Carlos", cargo: "Técnico de Manutenção", email: "alan.carlos@otis.com" },
  { id: 2, nome: "Akira Teruya", cargo: "Engenheiro de Projetos", email: "akira.teruya@otis.com" },
  { id: 3, nome: "Pedro Dalmas", cargo: "Supervisor de Fabricação", email: "pedro.dalmas@otis.com" },
  { id: 4, nome: "João Benedet", cargo: "Supervisor de Instalações", email: "joao.benedet@otis.com" },
  { id: 5, nome: "Fabrício Magoga", cargo: "Atendimento ao Cliente", email: "fabricio.magoga@otis.com" },
  { id: 6, nome: "Mariana Silva", cargo: "Técnico de Manutenção", email: "mariana.silva@otis.com" },
  { id: 7, nome: "Lucas Pereira", cargo: "Engenheiro de Projetos", email: "lucas.pereira@otis.com" },
  { id: 8, nome: "Carla Souza", cargo: "Supervisor de Instalações", email: "carla.souza@otis.com" },
  { id: 9, nome: "Rafael Costa", cargo: "Atendimento ao Cliente", email: "rafael.costa@otis.com" },
  { id: 10, nome: "Juliana Lima", cargo: "Técnico de Manutenção", email: "juliana.lima@otis.com" },
  { id: 11, nome: "Thiago Almeida", cargo: "Engenheiro de Projetos", email: "thiago.almeida@otis.com" },
  { id: 12, nome: "Fernanda Oliveira", cargo: "Supervisor de Fabricação", email: "fernanda.oliveira@otis.com" },
  { id: 13, nome: "Gustavo Mendes", cargo: "Atendimento ao Cliente", email: "gustavo.mendes@otis.com" },
  { id: 14, nome: "Beatriz Santos", cargo: "Técnico de Manutenção", email: "beatriz.santos@otis.com" },
  { id: 15, nome: "Ricardo Ferreira", cargo: "Supervisor de Instalações", email: "ricardo.ferreira@otis.com" },
  { id: 16, nome: "Camila Rocha", cargo: "Engenheiro de Projetos", email: "camila.rocha@otis.com" },
  { id: 17, nome: "Diego Barbosa", cargo: "Técnico de Manutenção", email: "diego.barbosa@otis.com" },
  { id: 18, nome: "Larissa Gomes", cargo: "Atendimento ao Cliente", email: "larissa.gomes@otis.com" },
  { id: 19, nome: "Vinicius Ramos", cargo: "Supervisor de Fabricação", email: "vinicius.ramos@otis.com" },
  { id: 20, nome: "Patrícia Dias", cargo: "Engenheiro de Projetos", email: "patricia.dias@otis.com" },
  { id: 21, nome: "Eduardo Nogueira", cargo: "Técnico de Manutenção", email: "eduardo.nogueira@otis.com" },
];

// Role to code mapping
const CODIGOS_CARGO = {
  "Técnico de Manutenção": "TM-01",
  "Engenheiro de Projetos": "EP-02",
  "Supervisor de Fabricação": "SF-03",
  "Supervisor de Instalações": "SI-04",
  "Atendimento ao Cliente": "AC-04",
};

export default function Usuarios() {
  const handleNovoUsuario = () => {
    alert("Futuro modal que o Akira vai fazer (akira escreveu isso)");
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaUsers style={{ color: "#041c44" }} /> Usuários
        </h2>
      </div>
      <p style={{ color: "#6b7280" }}>
        Consulte os funcionários da OTIS cadastrados no sistema.
      </p>

      {/* New User Button */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={handleNovoUsuario}
          style={{
            background: "#041c44",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          + Novo Usuário
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          marginTop: 20,
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <thead
          style={{
            background: "linear-gradient(90deg, #041c44, #0a2a66)",
            color: "white",
          }}
        >
          <tr>
            <th style={{ padding: 14, textAlign: "left" }}>ID</th>
            <th style={{ padding: 14, textAlign: "left" }}>Código</th>
            <th style={{ padding: 14, textAlign: "left" }}>Nome</th>
            <th style={{ padding: 14, textAlign: "left" }}>Cargo</th>
            <th style={{ padding: 14, textAlign: "left" }}>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {USUARIOS.map((user, index) => (
            <tr
              key={user.id}
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "white",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5f1ff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = index % 2 === 0 ? "#f9fafb" : "white")
              }
            >
              <td style={{ padding: 12 }}>{user.id}</td>
              <td style={{ padding: 12 }}>{CODIGOS_CARGO[user.cargo]}</td>
              <td style={{ padding: 12 }}>{user.nome}</td>
              <td style={{ padding: 12 }}>{user.cargo}</td>
              <td style={{ padding: 12 }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}