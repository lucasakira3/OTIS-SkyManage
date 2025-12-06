import React, { useState } from "react";
import { FaCogs, FaPlus } from "react-icons/fa";

const Estoque = () => {
  const itensIniciais = [
    { id: 1, codigo: "PEC-001", descricao: "Motor de tração", quantidade: 5, local: "SP - Matriz" },
    { id: 2, codigo: "PEC-002", descricao: "Placa de controle", quantidade: 12, local: "RJ - Filial" },
    { id: 3, codigo: "PEC-003", descricao: "Cabos de aço", quantidade: 20, local: "SP - Matriz" },
    { id: 4, codigo: "PEC-004", descricao: "Painel de botões", quantidade: 8, local: "BH - Filial" },
    { id: 5, codigo: "PEC-005", descricao: "Amortecedor hidráulico", quantidade: 10, local: "SP - Matriz" },
    { id: 6, codigo: "PEC-006", descricao: "Sistema de freio", quantidade: 7, local: "RJ - Filial" },
    { id: 7, codigo: "PEC-007", descricao: "Contrapeso de segurança", quantidade: 15, local: "BH - Filial" },
    { id: 8, codigo: "PEC-008", descricao: "Sensor de movimento", quantidade: 9, local: "SP - Matriz" },
    { id: 9, codigo: "PEC-009", descricao: "Roda de tração", quantidade: 6, local: "RJ - Filial" },
    { id: 10, codigo: "PEC-010", descricao: "Porta automática", quantidade: 11, local: "BH - Filial" },
    { id: 11, codigo: "PEC-011", descricao: "Painel de emergência", quantidade: 4, local: "SP - Matriz" },
    { id: 12, codigo: "PEC-012", descricao: "Cabo de sinalização", quantidade: 13, local: "RJ - Filial" },
    { id: 13, codigo: "PEC-013", descricao: "Guia de trilho", quantidade: 8, local: "BH - Filial" },
    { id: 14, codigo: "PEC-014", descricao: "Sistema de iluminação", quantidade: 10, local: "SP - Matriz" },
    { id: 15, codigo: "PEC-015", descricao: "Bateria reserva", quantidade: 5, local: "RJ - Filial" },
    { id: 16, codigo: "PEC-016", descricao: "Mola de suspensão", quantidade: 7, local: "BH - Filial" },
    { id: 17, codigo: "PEC-017", descricao: "Chave de segurança", quantidade: 12, local: "SP - Matriz" },
    { id: 18, codigo: "PEC-018", descricao: "Ventilador interno", quantidade: 9, local: "RJ - Filial" },
    { id: 19, codigo: "PEC-019", descricao: "Trilho de guia", quantidade: 14, local: "BH - Filial" },
    { id: 20, codigo: "PEC-020", descricao: "Unidade de controle", quantidade: 6, local: "SP - Matriz" },
    { id: 21, codigo: "PEC-021", descricao: "Parafuso de fixação", quantidade: 25, local: "RJ - Filial" },
    { id: 22, codigo: "PEC-022", descricao: "Engrenagem de tração", quantidade: 8, local: "BH - Filial" },
    { id: 23, codigo: "PEC-023", descricao: "Sensor de peso", quantidade: 10, local: "SP - Matriz" },
    { id: 24, codigo: "PEC-024", descricao: "Correa de transmissão", quantidade: 12, local: "RJ - Filial" },
  ];

  const [itens, setItens] = useState(itensIniciais);
  const [busca, setBusca] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const itensFiltrados = itens.filter(
    (item) =>
      item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionarItem = (novoItem) => {
    const novoId = Math.max(...itens.map(item => item.id)) + 1;
    const itemCompleto = {
      ...novoItem,
      id: novoId
    };
    
    setItens([...itens, itemCompleto]);
    setModalOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Título */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaCogs style={{ color: "#041c44" }} /> Estoque de Peças
        </h2>
      </div>

      <p style={{ color: "#6b7280" }}>
        Aqui você pode consultar e gerenciar o estoque de peças e componentes da OTIS.
      </p>

      {/* Barra de busca e o botão */}
      <div className="d-flex gap-3 mb-3 align-items-center">
        <input
          type="text"
          placeholder="Buscar por código ou descrição..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ maxWidth: "300px", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
        />

        <button 
          onClick={() => setModalOpen(true)}
          style={{ 
            background: "#041c44", 
            color: "white", 
            padding: "8px 16px", 
            borderRadius: 6, 
            border: "none", 
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <FaPlus size={14} /> Novo Item
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
            <th style={{ padding: 14, textAlign: "left" }}>Código</th>
            <th style={{ padding: 14, textAlign: "left" }}>Descrição</th>
            <th style={{ padding: 14, textAlign: "left" }}>Quantidade</th>
            <th style={{ padding: 14, textAlign: "left" }}>Local</th>
          </tr>
        </thead>
        <tbody>
          {itensFiltrados.map((item, index) => (
            <tr
              key={item.id}
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
              <td style={{ padding: 12 }}>{item.id}</td>
              <td style={{ padding: 12 }}>{item.codigo}</td>
              <td style={{ padding: 12 }}>{item.descricao}</td>
              <td style={{ padding: 12 }}>{item.quantidade}</td>
              <td style={{ padding: 12 }}>{item.local}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de cadastro de novo item */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              width: 400,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <h2 style={{ marginBottom: 20, color: "#041c44" }}>Novo Item</h2>
            
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 5, color: "#374151", fontWeight: "500" }}>Código</label>
              <input 
                type="text" 
                placeholder="Ex: PEC-001" 
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} 
              />
            </div>
            
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 5, color: "#374151", fontWeight: "500" }}>Descrição</label>
              <input 
                type="text" 
                placeholder="Descrição do item" 
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} 
              />
            </div>
            
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 5, color: "#374151", fontWeight: "500" }}>Quantidade</label>
              <input 
                type="number" 
                placeholder="0" 
                min="0"
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} 
              />
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 5, color: "#374151", fontWeight: "500" }}>Local</label>
              <input 
                type="text" 
                placeholder="Ex: SP - Matriz" 
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button 
                onClick={() => setModalOpen(false)} 
                style={{ 
                  padding: "8px 16px", 
                  borderRadius: 6, 
                  border: "1px solid #d1d5db", 
                  background: "#fff",
                  color: "#374151",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button 
                style={{ 
                  padding: "8px 16px", 
                  borderRadius: 6, 
                  border: "none", 
                  background: "#041c44", 
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;