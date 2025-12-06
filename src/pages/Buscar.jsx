// src/pages/Buscar.jsx
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchAll } from "../data/searchIndex";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const badgeByType = {
  pedido: "primary",
  estoque: "dark",
  cliente: "success",
  filial: "info",
  fornecedor: "warning",
  ordem_corretiva: "danger",
  ordem_instalacao: "secondary",
};

export default function Buscar() {
  const q = useQuery().get("q") || "";
  const results = useMemo(() => searchAll(q), [q]);

  return (
    <div className="container-fluid p-3">
      <h2 className="page-header">Resultados para “{q}”</h2>
      <p className="page-subtitle">
        {results.length} {results.length === 1 ? "resultado" : "resultados"} encontrados
      </p>

      <div className="card-panel">
        {results.length === 0 && (
          <div className="text-muted">Nada encontrado. Tente termos como código (ex.: PEC-001), cliente (ex.: Paulista) ou pedido (ex.: 1023).</div>
        )}

        <div className="list-group">
          {results.map((r, i) => (
            <Link key={i} to={r.route} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">{r.title}</div>
                <div className="text-muted">{r.subtitle}</div>
              </div>
              <span className={`badge bg-${badgeByType[r.type] || "secondary"}`}>{r.type}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="muted-note mt-2">Dica: você pode pesquisar por clientes, peças, ordens, filiais, fornecedores e pedidos.</div>
    </div>
  );
}
