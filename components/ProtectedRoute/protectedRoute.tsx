// components/ProtectedRoute/ProtectedRoute.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user && !allowedRoles.includes(user.role)) {
      router.push("/");
    }
  }, [user, loading, router, allowedRoles]);
  if (loading || !user || !allowedRoles.includes(user.role)) {
    return <p>Carregando...</p>;
  }
  return <>{children}</>;
}
