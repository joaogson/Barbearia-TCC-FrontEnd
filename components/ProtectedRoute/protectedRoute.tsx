// components/ProtectedRoute/ProtectedRoute.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext"; // Ajuste o caminho

// Tipos das Props que o componente aceita
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Ex: ["BARBER", "ADMIN"]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // 1. Se estiver carregando, apenas espere.
    if (loading) {
      return;
    }

    // 2. Se NÃO estiver carregando E NÃO tiver usuário, redirecione para o login.
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    // 3. Se tiver usuário, mas a role dele NÃO estiver na lista de permissão
    if (user && !allowedRoles.includes(user.role)) {
      // Redireciona para uma página segura (ex: a home ou o dashboard)
      router.push("/");
    }
  }, [user, loading, router, allowedRoles]);

  // Enquanto carrega ou se o usuário não for válido, mostre um loading.
  // Isso previne "piscar" a página protegida antes do redirecionamento.
  if (loading || !user || !allowedRoles.includes(user.role)) {
    return <p>Carregando...</p>; // Ou um componente de Spinner/Loading
  }

  // Se passou em tudo, mostre a página!
  return <>{children}</>;
}
