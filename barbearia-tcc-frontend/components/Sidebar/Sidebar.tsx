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
    <>
      {/* 1. O OVERLAY: Aparece quando 'isOpen' é true e fecha a sidebar ao ser clicado */}
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={toggleSidebar} />

      {/* 2. SUA SIDEBAR: A classe 'open' controla a animação de entrada/saída */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                {/* ESTRUTURA HTML CORRIGIDA: <li> envolve <Link> */}
                <li>
                  <Link href="/" onClick={toggleSidebar}>
                    Inicio
                  </Link>
                </li>
                <RoleGuard allowedRoles={["CLIENT"]}>
                  <li>
                    <Link href="/AgendeSeuHorario" onClick={toggleSidebar}>
                      Agende seu horario
                    </Link>
                  </li>
                </RoleGuard>
                <RoleGuard allowedRoles={["BARBER"]}>
                  <li>
                    <Link href="/Servicos" onClick={toggleSidebar}>
                      Serviços
                    </Link>
                  </li>
                </RoleGuard>
                <RoleGuard allowedRoles={["CLIENT"]}>
                  <li>
                    <Link href="/Feedbacks" onClick={toggleSidebar}>
                      Envie seu Feedback
                    </Link>
                  </li>
                </RoleGuard>
                <li>
                  <Link href="/Atendimentos" onClick={toggleSidebar}>
                    Atendimentos
                  </Link>
                </li>
                <RoleGuard allowedRoles={["CLIENT", "BARBER"]}>
                  <li>
                    <Link href="/Perfil" onClick={toggleSidebar}>
                      Perfil: {user?.name}
                    </Link>
                  </li>
                </RoleGuard>
                <RoleGuard allowedRoles={["BARBER"]}>
                  <li>
                    <Link href={"/Configuracoes"} onClick={toggleSidebar}>
                      Painel de Configurações
                    </Link>
                  </li>
                </RoleGuard>
                <li>
                  {/* LINK DE SAIR CORRIGIDO: usa a função handleLogout */}
                  <Link href="/login" onClick={logout}>
                    Sair
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={toggleSidebar}>
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link href="/register" onClick={toggleSidebar}>
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}
