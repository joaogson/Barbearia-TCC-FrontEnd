"use client";
import imagemBarraMenu from "../../public/BarraMenu.svg";
import Image from "next/image";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div className={`sidebar ${isOpen ? " open" : " closed"}`}>
      <ul>
        <li>Inicio</li>
        <li>Agende seu horario</li>
        <li>Serviços</li>
        <li>Envie seu Feedback</li>
      </ul>
    </div>
  );
}
