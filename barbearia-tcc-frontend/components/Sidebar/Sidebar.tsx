"use client";
import imagemBarraMenu from "../../public/BarraMenu.svg";
import Image from "next/image";
import "./Sidebar.css";
import Link from "next/link";

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
        <Link href="Servicos">
          <li>Serviços</li>
        </Link>
        <Link href="Feedback">
          <li>Envie seu Feedback</li>
        </Link>
        <Link href="/Atendimentos">
          <li>Atendimentos</li>
        </Link>
      </ul>
    </div>
  );
}
