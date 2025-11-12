"use client";
import { useState } from "react";
import { api } from "../../../../services/api";
import "./forgot-password.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="forgot-password-title">Esqueceu sua senha?</h2>
      <p className="forgot-password-message">Não se preocupe. Digite seu e-mail e enviaremos um link de recuperação.</p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          className="forgot-password-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <button className="forgot-password-button" type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </div>
  );
}
