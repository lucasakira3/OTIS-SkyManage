import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "chatTemporarioMessages";

const ChatTemporario = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        from: "Sistema",
        text: "Chat temporário criado. Use para comunicação rápida da equipa.",
        ts: Date.now(),
      },
    ];
  });
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
    // auto-scroll to bottom
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "Você", text: text.trim(), ts: Date.now() },
    ]);
    setText("");
  };

  return (
    <div>
      <h2>Chat Temporário — Equipa da Ordem de Serviço</h2>

      <div
        ref={listRef}
        className="mb-3 bg-white"
        style={{
          border: "1px solid #dee2e6",
          padding: 12,
          height: 300,
          overflowY: "auto",
          borderRadius: 6,
        }}
      >
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <div className="d-flex justify-content-between">
              <strong>{m.from}</strong>
              <small className="text-muted">
                {new Date(m.ts).toLocaleTimeString()}
              </small>
            </div>
            <div className="card p-2 mt-1" style={{ background: "#f8fafc" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="d-flex" style={{ gap: 8 }}>
        <input
          type="text"
          placeholder="Escreva uma mensagem..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatTemporario;