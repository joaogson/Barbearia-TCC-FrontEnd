"use client";
import WorkTimeForm from "../../../components/workTimeForm/workTimeForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function Configuracoes() {
  const { user } = useAuth();
  return (
    <div style={{ color: "brown" }}>
      {user?.role === "CLIENT" && <div style={{ fontSize: "2rem", color: "#3e301b" }}> Voce não tem permissão para acessar essa página!</div>}
      <WorkTimeForm />
    </div>
  );
}
