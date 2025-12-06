import React from "react";
import { FaBuilding } from "react-icons/fa";

const Filiais = () => {
  const filiais = [
    { id: 1, nome: "Filial São Paulo", endereco: "Av. Paulista, 1000", telefone: "(11) 3333-1111", responsavel: "Carlos Souza", cnpj: "12.345.678/0001-01" },
    { id: 2, nome: "Filial Rio de Janeiro", endereco: "Rua das Laranjeiras, 500", telefone: "(21) 2222-2222", responsavel: "Mariana Oliveira", cnpj: "98.765.432/0001-02" },
    { id: 3, nome: "Filial Belo Horizonte", endereco: "Av. Afonso Pena, 1200", telefone: "(31) 4444-3333", responsavel: "Fernanda Silva", cnpj: "11.222.333/0001-03" },
    { id: 4, nome: "Filial Curitiba", endereco: "Rua XV de Novembro, 900", telefone: "(41) 5555-4444", responsavel: "Ricardo Almeida", cnpj: "22.333.444/0001-04" },
    { id: 5, nome: "Filial Porto Alegre", endereco: "Av. Borges de Medeiros, 700", telefone: "(51) 6666-5555", responsavel: "Juliana Costa", cnpj: "33.444.555/0001-05" },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Título */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaBuilding style={{ color: "#041c44" }} /> Filiais
        </h2>
      </div>

      <p style={{ color: "#6b7280" }}>
        Lista de filiais cadastradas no sistema OTIS.
      </p>

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
            <th style={{ padding: 14, textAlign: "left" }}>Endereço</th>
            <th style={{ padding: 14, textAlign: "left" }}>Telefone</th>
            <th style={{ padding: 14, textAlign: "left" }}>Responsável</th>
            <th style={{ padding: 14, textAlign: "left" }}>CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {filiais.map((f, index) => (
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
              <td style={{ padding: 12 }}>{f.endereco}</td>
              <td style={{ padding: 12 }}>{f.telefone}</td>
              <td style={{ padding: 12 }}>{f.responsavel}</td>
              <td style={{ padding: 12 }}>{f.cnpj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filiais;
