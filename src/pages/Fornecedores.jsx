import React from "react";
import { FaTruck } from "react-icons/fa";

const Fornecedores = () => {
  const fornecedores = [
    { id: 1, nome: "Metalúrgica Silva", contato: "(11) 99999-1111", email: "contato@metalurgicasilva.com", categoria: "Estruturas", cnpj: "12.345.678/0001-90" },
    { id: 2, nome: "Elétrica Luz Forte", contato: "(11) 98888-2222", email: "vendas@luzforte.com", categoria: "Elétrica", cnpj: "98.765.432/0001-12" },
    { id: 3, nome: "Vidraçaria Cristal", contato: "(11) 97777-3333", email: "atendimento@cristal.com", categoria: "Vidros", cnpj: "11.222.333/0001-44" },
    { id: 4, nome: "Hidráulica Aqua", contato: "(11) 96666-4444", email: "suporte@aqua.com", categoria: "Hidráulica", cnpj: "55.666.777/0001-88" },
    { id: 5, nome: "Pinturas Premium", contato: "(11) 95555-5555", email: "orcamento@premium.com", categoria: "Pintura", cnpj: "99.888.777/0001-22" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaTruck style={{ color: "#041c44" }} /> Fornecedores
        </h2>
        <button
          style={{
            background: "#041c44",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          + Adicionar Fornecedor
        </button>
      </div>

      <p style={{ color: "#6b7280" }}>
        Lista dos fornecedores cadastrados para suprimentos e serviços.
      </p>

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
            <th style={{ padding: 14, textAlign: "left" }}>Contato</th>
            <th style={{ padding: 14, textAlign: "left" }}>E-mail</th>
            <th style={{ padding: 14, textAlign: "left" }}>Categoria</th>
            <th style={{ padding: 14, textAlign: "left" }}>CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((f, index) => (
            <tr
              key={f.id}
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
              <td style={{ padding: 12 }}>{f.id}</td>
              <td style={{ padding: 12 }}>{f.nome}</td>
              <td style={{ padding: 12 }}>{f.contato}</td>
              <td style={{ padding: 12 }}>{f.email}</td>
              <td style={{ padding: 12 }}>{f.categoria}</td>
              <td style={{ padding: 12 }}>{f.cnpj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fornecedores;