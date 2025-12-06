import React, { useState } from "react";

// Placeholder for sending recovery email (simulate API call)
const sendRecoveryEmail = (email) => {
  // Simulate success
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const success = await sendRecoveryEmail(email);
      if (success) {
        setIsSuccess(true);
        setMessage("Um link de recuperação foi enviado para o seu email.");
      } else {
        setMessage("Erro ao enviar o email de recuperação. Tente novamente.");
      }
    } catch (error) {
      setMessage("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "40px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "white",
          padding: "30px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#041c44", marginBottom: 20 }}>
          Recuperação de Senha
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 30 }}>
          Digite seu email para receber um link de recuperação.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: 20,
              border: "1px solid #d1d5db",
              borderRadius: 8,
              boxSizing: "border-box",
              fontFamily: "Roboto, sans-serif",
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#041c44",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a2a66")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#041c44")}
          >
            {isSubmitting ? "Enviando..." : "Enviar Link de Recuperação"}
          </button>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: isSuccess ? "#198754" : "#dc3545", marginTop: 20 }}>
            {message}
          </p>
        )}
        <p style={{ textAlign: "center", marginTop: 20 }}>
          <a href="/login" style={{ color: "#041c44", textDecoration: "none" }}>
            Voltar para Login
          </a>
        </p>
      </div>
    </div>
  );
};
