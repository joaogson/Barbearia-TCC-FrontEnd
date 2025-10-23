"use client";

import { useState, FormEvent } from "react";
// import { useAuth } from '@/contexts/AuthContext'; // Descomente quando tiver a função register
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { register } = useAuth(); // Você precisará criar esta função

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Lógica para chamar a função de registro da sua API
    console.log({ name, email, password });
    // try {
    //   await register(name, email, password);
    // } catch (err) {
    //   setError("Falha ao registrar. Tente outro e-mail.");
    // }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h1>Cadastrar</h1>
      <form onSubmit={handleSubmit}>
        {/* Adicione o campo de Nome */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Nome Completo</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>

        {/* Campos de Email e Senha (similares ao de login) */}
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
          {isSubmitting ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Já tem uma conta? <Link href="/login">Faça login</Link>
      </p>
    </div>
  );
}
