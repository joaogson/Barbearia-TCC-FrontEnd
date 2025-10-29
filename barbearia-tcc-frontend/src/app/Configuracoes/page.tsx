import { useAuth } from "../../../contexts/AuthContext";

export default function Configuracoes() {
  const { user } = useAuth();
  const teste = "teste";
  return (
    <div>
      {user?.role === "CLIENT" && <div style={{ fontSize: "2rem", color: "#3e301b" }}> Voce não tem permissão para acessar essa página!</div>}

		
    </div>
  );
}
