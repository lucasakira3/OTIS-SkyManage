import React, { useMemo, useState } from "react";
import Timeline from "../components/Timeline";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PEDIDOS } from "../data/mockPedidos";

export default function Rastreamento() {
  const params = new URLSearchParams(window.location.search);
  const initialId = params.get("id") || PEDIDOS[0].id;

  const [pedidoId, setPedidoId] = useState(initialId);

  const pedido = useMemo(
    () => PEDIDOS.find((p) => p.id === pedidoId) || PEDIDOS[0],
    [pedidoId]
  );

  return (
    <div
      style={{
        marginLeft: "220px",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
        background: "#f9fafb",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 920 }}>
        <h2 style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <FaMapMarkerAlt style={{ color: "#041c44" }} /> Acompanhar Pedido
        </h2>
        <p style={{ color: "#6b7280", textAlign: "center" }}>
          Visualize as etapas do pedido, previsão e responsável atual.
        </p>

        <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
          {/* seletor de pedido */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label htmlFor="pedido" style={{ fontWeight: 600 }}>
              Selecione o pedido:
            </label>
            <select
              id="pedido"
              value={pedidoId}
              onChange={(e) => setPedidoId(e.target.value)}
              style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
            >
              {PEDIDOS.map((p) => (
                <option key={p.id} value={p.id}>
                  #{p.id} — {p.cliente} — {p.obra}
                </option>
              ))}
            </select>
          </div>

          {/* cartão com informações */}
          <div
            style={{
              padding: 16,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: 0 }}>Pedido #{pedido.id}</h3>
            <div style={{ color: "#6b7280", marginTop: 4 }}>
              Cliente:{" "}
              <strong style={{ color: "#111827" }}>{pedido.cliente}</strong>{" "}
              &nbsp;•&nbsp; Obra:{" "}
              <strong style={{ color: "#111827" }}>{pedido.obra}</strong>
            </div>

            <div style={{ marginTop: 16 }}>
              <Timeline statusAtual={pedido.status} />
            </div>

            <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
              <div>
                <strong>Modelo:</strong> {pedido.modelo}
              </div>
              <div>
                <strong>Status atual:</strong> {pedido.status}
              </div>
              <div>
                <strong>Previsão de entrega:</strong>{" "}
                {new Date(pedido.previsaoEntrega).toLocaleDateString()}
              </div>
              <div>
                <strong>Responsável atual:</strong> {pedido.responsavelAtual}
              </div>
              <div>
                <strong>Observações:</strong> {pedido.observacoes}
              </div>
            </div>
          </div>

          {/* observação */}
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            * Lead time mínimo considerado para instalação: 30 dias. Itens
            importados: 60–90 dias (para efeito de planejamento na venda).
          </div>
        </div>
      </div>
    </div>
  );
}