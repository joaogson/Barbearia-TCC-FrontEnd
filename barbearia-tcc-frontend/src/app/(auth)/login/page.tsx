"use client"; // ESSENCIAL para páginas com interatividade e hooks

import { useState, FormEvent } from "react";
import { useAuth } from "../../../../contexts/AuthContext"; // Ajuste o caminho se necessário
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      // O redirecionamento já acontece dentro da função login do seu AuthContext
    } catch (err) {
      setError("Falha ao fazer login. Verifique seu e-mail e senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "10px" }}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Não tem uma conta? <Link href="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}
