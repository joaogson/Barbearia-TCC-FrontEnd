import { FormEvent, useState } from "react";
import { useAuth, RegisterContextResult } from "../../../contexts/AuthContext";
import Link from "next/link";
import "./register.css";
import { RegisterCredentials } from "../../../services/AuthAPI";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [serverError, setServerError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    setServerError(null);

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
      errors.phone = "O telefone deve ter 10 ou 11 dígitos.";
    }
    if (!password.trim()) {
      errors.password = "A senha é obrigatória.";
    } else if (password.trim().length < 8) {
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setServerError(null);
    setValidationErrors({});

    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const credentials: RegisterCredentials = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
      };

      const result: RegisterContextResult = await register(credentials);

      if (!result.success) {
        if (result.message.includes("Email já cadastrado")) {
          setServerError("E-mail já cadastrado. Por favor, use outro e-mail.");
        } else {
          setServerError(result.message);
        }
      }
    } catch (err: unknown) {
      console.error("Erro final no handleSubmit do RegisterPage:", err);
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-box">
      <div className="container-register">
        <h1 className="register-title">Cadastrar</h1>
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="register-style">
            <label htmlFor="name">Nome Completo</label>
            <input id="name" type="text" name="name" value={name} onChange={handleChange} className={validationErrors.name ? "input-error" : ""} />
            {validationErrors.name && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.name}
              </p>
            )}
          </div>
          <div className="register-style">
            <label htmlFor="phone">Celular (apenas numeros, sem espaços)</label>
            <input
              id="phone"
              type="number"
              name="phone"
              value={phone}
              onChange={handleChange}
              className={validationErrors.phone ? "input-error" : ""}
            />

            {validationErrors.phone && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.phone}
              </p>
            )}
          </div>

          <div className="register-style">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={validationErrors.email ? "input-error" : ""}
            />
            {validationErrors.email && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="register-style">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={validationErrors.password ? "input-error" : ""}
            />
            {validationErrors.password && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.password}
              </p>
            )}
          </div>
          <div className="register-style">
            <label htmlFor="confirmPassword">Confirme a senha</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className={validationErrors.confirmPassword ? "input-error" : ""}
            />

            {validationErrors.confirmPassword && (
              <p style={{ color: "red" }} className="validation-error-message">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

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
