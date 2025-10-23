"use client";
import "./Sidebar.css";
import Link from "next/link";
import { RoleGuard } from "../Auth/RoleGuard";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div className={`sidebar ${isOpen ? " open" : " closed"}`}>
      <ul>
        <Link href="/">
          <li>Inicio</li>
        </Link>
        <Link href="/AgendeSeuHorario">
          <li>Agende seu horario</li>
        </Link>
        <RoleGuard allowedRoles={["BARBER"]}>
          <Link href="Servicos">
            <li>Serviços</li>
          </Link>
        </RoleGuard>
        <RoleGuard allowedRoles={["CLIENT"]}>
          <Link href="Feedback">
            <li>Envie seu Feedback</li>
          </Link>
        </RoleGuard>
        <Link href="/Atendimentos">
          <li>Atendimentos</li>
        </Link>
        <Link href="/perfil">
          <li>Perfil</li>
        </Link>
      </ul>
    </div>
  );
}
