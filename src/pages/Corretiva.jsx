import React, { useState } from 'react';
import { FaWrench } from 'react-icons/fa';

const Corretiva = () => {
  const [ordens, setOrdens] = useState([
    { id: 1, cliente: "Shopping Paulista", elevador: "ELEV-101", status: "Aberta", data: "2025-09-01" },
    { id: 2, cliente: "Hospital Santa Casa", elevador: "ELEV-202", status: "Em andamento", data: "2025-09-02" },
    { id: 3, cliente: "Condomínio Azul", elevador: "ELEV-303", status: "Concluída", data: "2025-08-28" },
    { id: 4, cliente: "Escritório Central", elevador: "ELEV-404", status: "Aberta", data: "2025-09-03" },
  ]);

  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [novaOrdem, setNovaOrdem] = useState({
    cliente: "",
    elevador: "",
    status: "Aberta",
    data: new Date().toISOString().split("T")[0],
  });

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => {
    setMostrarModal(false);
    setNovaOrdem({
      cliente: "",
      elevador: "",
      status: "Aberta",
      data: new Date().toISOString().split("T")[0],
    });
  };

  const salvarOrdem = () => {
    if (!novaOrdem.cliente || !novaOrdem.elevador) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const nova = {
      id: ordens.length + 1,
      ...novaOrdem,
    };

    setOrdens([...ordens, nova]);
    fecharModal();
  };

  const ordensFiltradas = ordens.filter(ordem => {
    const matchStatus = filtroStatus === "Todos" || ordem.status === filtroStatus;
    const matchBusca = ordem.cliente.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaWrench style={{ color: "#041c44" }} /> Ordens Corretivas
        </h2>
      </div>
      <p style={{ color: "#6b7280" }}>
        Aqui você pode consultar todas as ordens corretivas de elevadores.
      </p>

      {/* 🔹 Filtros */}
      <div className="d-flex gap-3 mb-3">
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{ width: "200px", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Aberta">Aberta</option>
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
          onClick={abrirModal}
          style={{
            background: "#041c44",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          + Nova Ordem
        </button>
      </div>

      {/* 🔹 Tabela */}
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

      {/* 🔹 Modal */}
      {mostrarModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nova Ordem Corretiva</h5>
                <button className="btn-close" onClick={fecharModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={novaOrdem.cliente}
                    onChange={(e) => setNovaOrdem({ ...novaOrdem, cliente: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Elevador</label>
                  <input
                    type="text"
                    className="form-control"
                    value={novaOrdem.elevador}
                    onChange={(e) => setNovaOrdem({ ...novaOrdem, elevador: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={novaOrdem.status}
                    onChange={(e) => setNovaOrdem({ ...novaOrdem, status: e.target.value })}
                  >
                    <option value="Aberta">Aberta</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    value={novaOrdem.data}
                    onChange={(e) => setNovaOrdem({ ...novaOrdem, data: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={salvarOrdem}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Corretiva;
