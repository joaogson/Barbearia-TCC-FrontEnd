"use client";
import "./Sidebar.css";
import Link from "next/link";
import { RoleGuard } from "../Auth/Guards/RoleGuard";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? " open" : " closed"}`}>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <Link href="/">
                <li>Inicio</li>
              </Link>
              <RoleGuard allowedRoles={["CLIENT"]}>
                <Link href="/AgendeSeuHorario">
                  <li>Agende seu horario</li>
                </Link>
              </RoleGuard>
              <RoleGuard allowedRoles={["BARBER"]}>
                <Link href="Servicos">
                  <li>Serviços</li>
                </Link>
              </RoleGuard>
              <RoleGuard allowedRoles={["CLIENT"]}>
                <Link href="Feedbacks">
                  <li>Envie seu Feedback</li>
                </Link>
              </RoleGuard>
              <Link href="/Atendimentos">
                <li>Atendimentos</li>
              </Link>
              <RoleGuard allowedRoles={["CLIENT", "BARBER"]}>
                <Link href="/perfil">
                  <li>Perfil: {user?.name}</li>
                </Link>
              </RoleGuard>
              <Link href="/login" onClick={logout}>
                <li>Sair</li>
              </Link>
            </>
          ) : (
            <>
              {/* === ITENS PARA USUÁRIOS DESLOGADOS === */}
              <li>
                <Link href="/login">Entrar</Link>
              </li>
              <li>
                <Link href="/register">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
