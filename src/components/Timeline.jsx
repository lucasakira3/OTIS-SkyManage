import React from "react";

const ETAPAS = [
  "Proposta",
  "Aprovação",
  "Execução",
  "Awarding",
  "Programação do Serviço",
  "Conclusão",
  "Feedback",
];

export default function Timeline({ statusAtual }) {
  const activeIdx = ETAPAS.indexOf(statusAtual);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {ETAPAS.map((etapa, i) => {
        const ativo = i <= activeIdx && activeIdx !== -1;
        return (
          <div key={etapa} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: 9999,
                background: ativo ? "#0f9d58" : "#e5e7eb",
                color: ativo ? "white" : "#111827",
                fontWeight: 700, display: "grid", placeItems: "center",
              }}
              title={etapa}
            >
              {i + 1}
            </div>
            <span style={{ fontWeight: ativo ? 700 : 500 }}>{etapa}</span>
            {i < ETAPAS.length - 1 && (
              <div style={{ width: 24, height: 2, background: ativo ? "#0f9d58" : "#e5e7eb" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
