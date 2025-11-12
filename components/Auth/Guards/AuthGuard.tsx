// components/AuthGuard.tsx
import { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { loading } = useAuth();

  // Enquanto o AuthContext estiver verificando o token,
  // mostramos uma tela de carregamento global.
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Carregando...</h1>
        {/* Você pode substituir isso por um componente de Spinner/Loading mais bonito */}
      </div>
    );
  }

  // Quando o carregamento terminar, renderiza o conteúdo real da página.
  return <>{children}</>;
};
