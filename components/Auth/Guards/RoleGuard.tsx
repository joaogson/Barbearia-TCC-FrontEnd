// components/RoleGuard.tsx
import { ReactNode } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { User } from "../../../types/User";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: User["role"][];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user?.role) {
    return null;
  }

  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    return null;
  }
  return <>{children}</>;
};
