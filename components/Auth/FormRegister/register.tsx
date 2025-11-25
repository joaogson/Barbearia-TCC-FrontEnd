// pages/register.tsx (ou onde quer que seu componente Register esteja)

import { FormEvent, useState } from "react";
import { useAuth, RegisterContextResult } from "../../../contexts/AuthContext";
import Link from "next/link";
import "./register.css"; // Seus estilos CSS
import { RegisterCredentials } from "../../../services/AuthAPI"; // Ajuste o caminho

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ RENOMEADO: `serverError` para erros que vêm do backend
  const [serverError, setServerError] = useState<string | null>(null);

  // ✅ CORRIGIDO: `isSubmitting` com seu setter
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para erros de validação de cada campo no frontend
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limpa o erro do campo atual ao digitar
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; // Remove o erro específico do campo
      return newErrors;
    });

    // Limpa a mensagem de erro do servidor ao digitar em qualquer campo
    setServerError(null);

    // Atualiza o estado do campo correspondente
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validação de campos obrigatórios e formato
    if (!name.trim()) {
      errors.name = "O nome é obrigatório.";
    }
    if (!email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = "Formato de e-mail inválido.";
    }
    if (!phone.trim()) {
      errors.phone = "O telefone é obrigatório.";
    } else if (!/^\d{10,11}$/.test(phone.trim())) {
      // Ajuste a regex se o formato for diferente
      errors.phone = "O telefone deve ter 10 ou 11 dígitos.";
    }
    if (!password.trim()) {
      errors.password = "A senha é obrigatória.";
    } else if (password.trim().length < 8) {
      // Mínimo de 8 caracteres, por exemplo
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (password !== confirmPassword) {
      // Senhas devem coincidir
      errors.confirmPassword = "As senhas não coincidem.";
    }

    setValidationErrors(errors); // Atualiza o estado de erros de validação
    return Object.keys(errors).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    setIsSubmitting(true); // Ativa o estado de submissão
    setServerError(null); // Limpa erros anteriores do servidor
    setValidationErrors({}); // Limpa erros de validação anteriores

    // 1. Executa a validação do formulário no frontend
    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false); // Desativa o estado de submissão se houver erros de validação
      return; // Para aqui se houver erros de validação
    }

    try {
      const credentials: RegisterCredentials = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        // Não inclua confirmPassword aqui, pois não é enviado ao backend
      };

      // 2. Chama a função `register` do contexto
      const result: RegisterContextResult = await register(credentials);

      if (!result.success) {
        // Se a função `register` do contexto indicou um erro do servidor
        if (result.message.includes("Email já cadastrado")) {
          setServerError("E-mail já cadastrado. Por favor, use outro e-mail.");
        } else {
          setServerError(result.message); // Exibe a mensagem de erro genérica do servidor
        }
      }
      // Se `result.success` for `true`, o redirecionamento já ocorreu dentro do contexto.
      // Não há `else` aqui para o caso de sucesso.
    } catch (err: unknown) {
      // Este catch é para erros muito inesperados (ex: JS error antes da chamada)
      console.error("Erro final no handleSubmit do RegisterPage:", err);
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false); // ✅ Desativa o estado de submissão no final, independente do resultado
    }
  };

  return (
    <div className="register-box">
      <div className="container-register">
        <h1 className="register-title">Cadastrar</h1>
        {/* ✅ O FORMULÁRIO DEVE TER O onSubmit */}
        <form className="form-register" onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="register-style">
            <label htmlFor="name">Nome Completo</label>
            <input
              id="name"
              type="text"
              name="name" // ✅ Adicionar o atributo name para handleChange funcionar
              value={name}
              onChange={handleChange}
              className={validationErrors.name ? "input-error" : ""} // Adiciona classe para estilizar
            />
            {/* ✅ Exibir o erro correto para o campo 'name' */}
            {validationErrors.name && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Campo Celular */}
          <div className="register-style">
            <label htmlFor="phone">Celular (apenas numeros, sem espaços)</label>
            <input
              id="phone"
              type="number" // Considere 'tel' para números de telefone, 'number' pode ser problemático com ddd e formatação
              name="phone" // ✅ Adicionar o atributo name
              value={phone}
              onChange={handleChange}
              className={validationErrors.phone ? "input-error" : ""}
            />
            {/* ✅ Exibir o erro correto para o campo 'phone' */}
            {validationErrors.phone && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.phone}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div className="register-style">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email" // ✅ Adicionar o atributo name
              value={email}
              onChange={handleChange}
              className={validationErrors.email ? "input-error" : ""}
            />
            {/* ✅ Exibir o erro correto para o campo 'email' */}
            {validationErrors.email && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div className="register-style">
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
          </div>

          {/* Campo Confirme a senha */}
          <div className="register-style">
            <label htmlFor="confirmPassword">Confirme a senha</label> {/* ✅ Corrigido id para 'confirmPassword' */}
            <input
              id="confirmPassword" // ✅ Corrigido id
              type="password"
              name="confirmPassword" // ✅ Adicionar o atributo name
              value={confirmPassword}
              onChange={handleChange}
              className={validationErrors.confirmPassword ? "input-error" : ""}
            />
            {/* ✅ Exibir o erro correto para o campo 'confirmPassword' */}
            {validationErrors.confirmPassword && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botão de Cadastro (DENTRO do formulário) */}

          {/* Área para exibir mensagens de erro do SERVIDOR */}
          {serverError && (
            <p className="server-error-message" style={{ color: "red", marginTop: "1rem" }}>
              {serverError}
            </p>
          )}
        </form>

        <p className="sem-conta" style={{ marginTop: "1rem", textAlign: "center" }}>
          Já tem uma conta?{" "}
          <Link className="link-cadastrar" href="/login">
            Faça login
          </Link>
        </p>
      </div>
      <button
        className="submit-button-register"
        type="submit"
        disabled={isSubmitting}
        style={{ width: "100%", padding: "10px" }}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Criando conta..." : "Cadastrar"}
      </button>
    </div>
  );
}
