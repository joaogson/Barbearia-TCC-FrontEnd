// components/AuthGuard.tsx
import { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return <>{children}</>;
};
