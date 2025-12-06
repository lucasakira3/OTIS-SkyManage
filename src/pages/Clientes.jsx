import React, { useState } from "react";
import { FaUserTie, FaPlus } from "react-icons/fa";

const Clientes = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const clientes = [
    { id: 1, nome: "Shopping Paulista", contato: "Fernanda Ribeiro", telefone: "(11) 4002-8922", email: "fernanda@shoppingpaulista.com" },
    { id: 2, nome: "Hospital Santa Casa", contato: "Dr. João Alves", telefone: "(11) 3333-4444", email: "joao@santacasa.org" },
    { id: 3, nome: "Condomínio Azul", contato: "Marcos Silva", telefone: "(11) 95555-1111", email: "marcos@condominioazul.com" },
    { id: 4, nome: "Escritório Central", contato: "Patrícia Gomes", telefone: "(21) 92222-3333", email: "patricia@centraloffice.com" },
    { id: 5, nome: "Hotel Copacabana", contato: "Ricardo Torres", telefone: "(21) 93333-2222", email: "ricardo@copahotel.com" },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Título */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8, color: "#041c44" }}>
          <FaUserTie /> Clientes
        </h2>
      </div>

      <p style={{ color: "#6b7280" }}>Aqui estão os clientes cadastrados no sistema OTIS.</p>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* Card "Novo Cliente" */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            background: "linear-gradient(135deg, #f9fafc, #e9eef6)", // mesmo gradiente dos outros
            border: "1px solid #d1d5db",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaPlus size={24} color="#041c44" />
          <h3 style={{ marginTop: 10, color: "#041c44", display: "flex", alignItems: "center", gap: 6 }}>
            Novo Cliente
          </h3>
          <p style={{ color: "#374151", fontSize: 14, textAlign: "center" }}>
            Clique para adicionar um novo cliente
          </p>
        </div>

        {/* Cards existentes */}
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            style={{
              background: "linear-gradient(135deg, #f9fafc, #e9eef6)",
              border: "1px solid #d1d5db",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ margin: 0, color: "#041c44", display: "flex", alignItems: "center", gap: 6 }}>
              <FaUserTie /> {cliente.nome}
            </h3>
            <p style={{ margin: "6px 0", color: "#374151" }}>
              <strong>Contato:</strong> {cliente.contato}
            </p>
            <p style={{ margin: "6px 0", color: "#374151" }}>
              <strong>Telefone:</strong> {cliente.telefone}
            </p>
            <p style={{ margin: "6px 0", color: "#374151" }}>
              <strong>Email:</strong> {cliente.email}
            </p>
          </div>
        ))}
      </div>

      {/* Modal de cadastro */}
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
            }}
          >
            <h2 style={{ marginBottom: 20 }}>Novo Cliente</h2>
            <input type="text" placeholder="Nome" style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <input type="text" placeholder="Contato" style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <input type="text" placeholder="Telefone" style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <input type="email" placeholder="Email" style={{ width: "100%", marginBottom: 20, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setModalOpen(false)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#d1d5db" }}>Cancelar</button>
              <button style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#041c44", color: "#fff" }}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
