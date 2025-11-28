import { FormEvent, useEffect, useState } from "react";
import "./login.css";
import { useAuth, LoginContextResult } from "../../../contexts/AuthContext";
import Link from "next/link";
import { LoginCredentials } from "../../../services/AuthAPI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const { login, registredEmail, clearRegistredEmail } = useAuth();

  useEffect(() => {
    if (registredEmail) {
      setEmail(registredEmail);
      clearRegistredEmail();
    }
  }, [clearRegistredEmail, registredEmail]);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = "Formato de e-mail inválido.";
    }

    if (!password.trim()) {
      errors.password = "A senha é obrigatória.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
    setServerError(null);

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setServerError(null);
    setIsSubmitting(true);
    setValidationErrors({});

    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const credentials: LoginCredentials = { email: email.trim(), password: password.trim() };
      const result: LoginContextResult = await login(credentials);

      if (!result.success) {
        setServerError(result.message);
      }
    } catch (err: unknown) {
      console.error("Erro final no handleSubmit do LoginPage:", err);
      let errorMessage = "Falha ao fazer login. Verifique seu e-mail e senha.";
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
    <div className="login-box">
      <div className="container-login">
        <h1 className="login-title">Entrar</h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="style">
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
          <div className="style">
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

            <Link style={{ padding: "5px", width: "170px", alignSelf: "end", textAlign: "end" }} href={"../forgot-password"}>
              esqueci minha senha!
            </Link>
          </div>
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
