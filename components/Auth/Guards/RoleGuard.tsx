// components/RoleGuard.tsx
import { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { User } from "../../../types/User";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: User["role"][]; // Aceita um array de roles permitidas
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  // Se o usuário não estiver autenticado ou não tiver uma role definida,
  // não mostramos nada (ou poderíamos mostrar uma página de acesso negado).
  if (!isAuthenticated || !user?.role) {
    return null; // ou <AcessoNegado />
  }

  // Verificamos se a role do usuário está na lista de roles permitidas
  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    return null; // ou <AcessoNegado />
  }

  // Se tiver permissão, renderiza o conteúdo protegido.
  return <>{children}</>;
};
