import { FormEvent, useEffect, useState } from "react";
import "./login.css";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, registredEmail, clearRegistredEmail } = useAuth();

  useEffect(() => {
    console.log(registredEmail);
    //Verifica se tem um email que veio da pagina register (função register)
    if (registredEmail) {
      setEmail(registredEmail);
      clearRegistredEmail();
    }
  }, [clearRegistredEmail, registredEmail]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      //Passa o email e a senha para a função login do AuthContext
      await login(email, password);
    } catch (err) {
      console.error("Falha ", err);
      setError("Falha ao fazer login. Verifique seu e-mail e senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-login">
      <h1 className="login-title">Entrar</h1>
      <form className="form-login" action="">
        <div className="style">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="style">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Link href={"../forgot-password"}>esqueci minha senha!</Link>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="submit-button" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        <p className="sem-conta">
          Não tem uma conta?{" "}
          <Link className="link-cadastrar" href="/register">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
