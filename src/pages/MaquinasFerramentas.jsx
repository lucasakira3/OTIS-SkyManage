import React, { useState } from "react";
import { FaTools } from "react-icons/fa";

const mockMaquinas = [
  { id: 1, nome: "Elevador A", tipo: "Máquina", status: "Em operação" },
  { id: 2, nome: "Ferramenta X", tipo: "Ferramenta", status: "Disponível" },
  { id: 3, nome: "Elevador B", tipo: "Máquina", status: "Manutenção" },
];

const MaquinasFerramentas = () => {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const maquinasFiltradas = mockMaquinas.filter((m) => {
    const matchBusca =
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.tipo.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "Todos" || m.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaTools style={{ color: "#041c44" }} /> Máquinas / Ferramentas
        </h2>
      </div>
      <p style={{ color: "#6b7280" }}>
        Aqui você pode consultar e gerenciar máquinas e ferramentas.
      </p>

      {/* Filtros */}
      <div className="d-flex gap-3 mb-3">
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{
            width: "200px",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #d1d5db",
          }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Em operação">Em operação</option>
          <option value="Disponível">Disponível</option>
          <option value="Manutenção">Manutenção</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por nome ou tipo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            maxWidth: "300px",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #d1d5db",
          }}
        />

        <button
          style={{
            background: "#2ecc71",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          + Nova Máquina/Ferramenta
        </button>
      </div>

      {/* Tabela */}
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
            <th style={{ padding: 14, textAlign: "left" }}>#</th>
            <th style={{ padding: 14, textAlign: "left" }}>Nome</th>
            <th style={{ padding: 14, textAlign: "left" }}>Tipo</th>
            <th style={{ padding: 14, textAlign: "left" }}>Status</th>
            <th style={{ padding: 14, textAlign: "left" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {maquinasFiltradas.map((m, index) => (
            <tr
              key={m.id}
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "white",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e5f1ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  index % 2 === 0 ? "#f9fafb" : "white")
              }
            >
              <td style={{ padding: 12 }}>{m.id}</td>
              <td style={{ padding: 12 }}>{m.nome}</td>
              <td style={{ padding: 12 }}>{m.tipo}</td>
              <td style={{ padding: 12 }}>{m.status}</td>
              <td style={{ padding: 12 }}>
                <button
                  style={{
                    background: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    marginRight: 6,
                    cursor: "pointer",
                  }}
                >
                  Detalhes
                </button>
                <button
                  style={{
                    background: "#95a5a6",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Reservar
                </button>
              </td>
            </tr>
          ))}
          {maquinasFiltradas.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 12, textAlign: "center" }}>
                Nenhum item encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaquinasFerramentas;
