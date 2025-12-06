import React, { useState } from 'react';
import { FaTools } from 'react-icons/fa';

const Instalacao = () => {
  const ordensIniciais = [
    { id: 1, cliente: "Shopping Iguatemi", elevador: "ELEV-901", status: "Planejada", data: "2025-09-15" },
    { id: 2, cliente: "Hospital Sírio-Libanês", elevador: "ELEV-902", status: "Em andamento", data: "2025-09-18" },
    { id: 3, cliente: "Condomínio Panorama", elevador: "ELEV-903", status: "Concluída", data: "2025-08-25" },
    { id: 4, cliente: "Estação Metro SP", elevador: "ELEV-904", status: "Planejada", data: "2025-09-20" },
  ];

  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [busca, setBusca] = useState("");

  const ordensFiltradas = ordensIniciais.filter(ordem => {
    const matchStatus = filtroStatus === "Todos" || ordem.status === filtroStatus;
    const matchBusca = ordem.cliente.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaTools style={{ color: "#041c44" }} /> Ordens de Instalação
        </h2>
      </div>
      <p style={{ color: "#6b7280" }}>
        Aqui você pode consultar todas as ordens de instalação de elevadores.
      </p>

      {/* Filtros */}
      <div className="d-flex gap-3 mb-3">
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{ width: "200px", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Planejada">Planejada</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ maxWidth: "300px", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        />

        <button
          style={{ background: "#f4a261", color: "white", padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}
        >
          + Nova Ordem
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
            <th style={{ padding: 14, textAlign: "left" }}>Cliente</th>
            <th style={{ padding: 14, textAlign: "left" }}>Elevador</th>
            <th style={{ padding: 14, textAlign: "left" }}>Status</th>
            <th style={{ padding: 14, textAlign: "left" }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {ordensFiltradas.map((ordem, index) => (
            <tr
              key={ordem.id}
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "white",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5f1ff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = index % 2 === 0 ? "#f9fafb" : "white")
              }
            >
              <td style={{ padding: 12 }}>{ordem.id}</td>
              <td style={{ padding: 12 }}>{ordem.cliente}</td>
              <td style={{ padding: 12 }}>{ordem.elevador}</td>
              <td style={{ padding: 12 }}>{ordem.status}</td>
              <td style={{ padding: 12 }}>{ordem.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Instalacao;