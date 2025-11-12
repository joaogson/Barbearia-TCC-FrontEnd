import { FormEvent, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Lógica para chamar a função de registro da API
    try {
      if(confirmPassword === password){
      const user = await register(email, password, phone, name);
      console.log("Usuario criado: ", user);
      } else {
       throw error
      }
    } catch (err) {
      if(confirmPassword != password){
        setError("As senhas não batem")
      } else{
      console.error("Erro: ", err);
      setError("Falha ao registrar. Tente outro e-mail.");
      }
    }
  };

  return (
    <div className="container-register">
      <h1>Cadastrar</h1>
      <form className="form-register" action="">
        <div className="register-style">
          <label htmlFor="name">Nome Completo</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="register-style">
          <label htmlFor="phone">Celular</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="register-style">
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
        <div className="register-style">
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

        <div className="register-style">
          <label htmlFor="Confirmpassword">Confirme a senha</label>
          <input
            id="Confirmpassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button className="submit-button-register" type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "10px" }} onClick={handleSubmit}>
          {isSubmitting ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>
      <p className="sem-conta" style={{ marginTop: "1rem", textAlign: "center" }}>
        Já tem uma conta?{" "}
        <Link className="link-cadastrar" href="/login">
          Faça login
        </Link>
      </p>
    </div>
  );
}
