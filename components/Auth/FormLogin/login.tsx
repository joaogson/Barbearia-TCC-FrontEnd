// pages/login.tsx

import { FormEvent, useEffect, useState } from "react";
import "./login.css"; // Seus estilos CSS
import { useAuth, LoginContextResult } from "../../../contexts/AuthContext"; // ✅ Importe LoginContextResult (se definido, senão precisaremos criar)
import Link from "next/link";
import { LoginCredentials } from "../../../services/AuthAPI"; // ✅ Importe LoginCredentials

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Renomeado `error` para `serverError` para clareza
  const [serverError, setServerError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ NOVO ESTADO: Para erros de validação de cada campo no frontend
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const { login, registredEmail, clearRegistredEmail } = useAuth();

  useEffect(() => {
    // console.log(registredEmail); // Manter para debug, mas pode remover no final
    if (registredEmail) {
      setEmail(registredEmail);
      clearRegistredEmail(); // Limpa o email registrado após usá-lo
    }
  }, [clearRegistredEmail, registredEmail]); // Dependências do useEffect

  // ✅ NOVO: Função de validação local do formulário
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      // Validação de formato de e-mail simples
      errors.email = "Formato de e-mail inválido.";
    }

    if (!password.trim()) {
      errors.password = "A senha é obrigatória.";
    }
    // Adicione outras validações de senha se houver (ex: minLength, complexidade)
    // } else if (password.trim().length < 6) {
    //   errors.password = "A senha deve ter no mínimo 6 caracteres.";
    // }

    setValidationErrors(errors); // Atualiza o estado de erros de validação
    return Object.keys(errors).length === 0; // Retorna true se não houver erros
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limpa o erro do campo atual ao digitar
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    // Limpa a mensagem de erro do servidor ao digitar em qualquer campo
    setServerError(null);

    // Atualiza o estado do campo correspondente
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    setServerError(null); // Limpa erros anteriores do servidor
    setIsSubmitting(true); // Ativa o estado de submissão
    setValidationErrors({}); // Limpa erros de validação anteriores

    // ✅ 1. Executa a validação do formulário no frontend
    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false); // Desativa o estado de submissão se houver erros de validação
      return; // Para aqui se houver erros de validação
    }

    try {
      // ✅ Passa um objeto de credenciais para a função login
      const credentials: LoginCredentials = { email: email.trim(), password: password.trim() };
      const result: LoginContextResult = await login(credentials); // Assumindo que 'login' do contexto retorna LoginContextResult

      if (!result.success) {
        // Se a função `login` do contexto indicou um erro do servidor
        setServerError(result.message);
      }
      // Se `result.success` for `true`, o redirecionamento já ocorreu dentro do contexto.
    } catch (err: unknown) {
      // ✅ Tipado como unknown
      console.error("Erro final no handleSubmit do LoginPage:", err);
      let errorMessage = "Falha ao fazer login. Verifique seu e-mail e senha."; // Mensagem padrão para erros inesperados
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false); // ✅ Desativa o estado de submissão no final
    }
  };

  return (
    <div className="login-box">
      <div className="container-login">
        <h1 className="login-title">Entrar</h1>
        {/* ✅ O FORMULÁRIO DEVE TER O onSubmit */}
        <form className="form-login" onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="style">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email" // ✅ Adicionar o atributo name
              value={email}
              onChange={handleChange}
              className={validationErrors.email ? "input-error" : ""} // Adiciona classe para estilizar
            />
            {/* ✅ Exibir o erro correto para o campo 'email' */}
            {validationErrors.email && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div className="style">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password" // ✅ Adicionar o atributo name
              value={password}
              onChange={handleChange}
              className={validationErrors.password ? "input-error" : ""}
            />
            {/* ✅ Exibir o erro correto para o campo 'password' */}
            {validationErrors.password && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.password}
              </p>
            )}

            <Link style={{ padding: "5px", width: "170px", alignSelf: "end", textAlign: "end" }} href={"../forgot-password"}>
              esqueci minha senha!
            </Link>
          </div>

          {/* Botão de Login (DENTRO do formulário) */}

          {/* Área para exibir mensagens de erro do SERVIDOR */}
          {serverError && (
            <p className="server-error-message" style={{ color: "red", marginTop: "1rem" }}>
              {serverError}
            </p>
          )}

          <p className="sem-conta">
            Não tem uma conta?{" "}
            <Link className="link-cadastrar" href="/register">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
      <button className="submit-button-login" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}
