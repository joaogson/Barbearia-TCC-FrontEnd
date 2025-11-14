"use client"; // Esta página precisa ser um Componente de Cliente para usar hooks

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "../../../../services/api";
import { AxiosError } from "axios";
import "./reset-password.css";
import Router from "next/navigation";
/**
 * 1. O Componente de Lógica
 * Este componente contém o formulário e só funciona porque
 * está "embrulhado" pelo <Suspense> abaixo.
 */
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pega o token da URL (ex: ?token=abc123)
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Se o usuário chegar aqui sem um token, mostre um erro.
  if (!token) {
    return (
      <div className="form-reset-container">
        <h2>Erro</h2>
        <p style={{ color: "red" }}>Token inválido ou ausente. Por favor, solicite um novo link de redefinição.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reseta os erros
    setError("");
    setMessage("");
    
    // Validação 1: Senha bate com a confirmação?
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    // Validação 2: Senha tem tamanho mínimo? (Opcional, mas recomendado)
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      // Chama a API que criamos no back-end
      const response = await api.post("/auth/reset-password", {
        token: token,
        password: password,
      });

      setMessage(response.data.message);

      // Sucesso! Redireciona para o login após 3 segundos.
      setTimeout(() => {
        router.push("/login"); // Mude para sua página de login
      }, 3000);
    } catch (err) {
      let errorMessage = "Erro ao redefinir a senha.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Se o formulário foi enviado com sucesso, mostre apenas a mensagem.
  if (message) {
    return (
      <div className="form-container">
        <h2>Sucesso!</h2>
        <p style={{ color: "green" }}>{message}</p>
        <p>Redirecionando para o login...</p>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2 className="reset-title">Crie sua nova senha</h2>
      <p className="reset-title">Digite e confirme sua nova senha de acesso.</p>
      <div className="form-reset-container">
        {" "}
        {/* Use seu próprio estilo */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nova Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a nova senha"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirme a Senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              required
            />
          </div>
          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Nova Senha"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

/**
 * 2. O Componente de Página (Wrapper)
 * O Next.js exige que qualquer componente que use 'useSearchParams'
 * seja filho de um <Suspense> boundary.
 */
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Carregando token...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
