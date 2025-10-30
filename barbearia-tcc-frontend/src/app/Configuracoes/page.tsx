"use client";
import InactivePeriodsManager from "../../../components/inactivePeriods/inactivePeriodsManager";
import WorkTimeForm from "../../../components/workTimeForm/workTimeForm";
import { useAuth } from "../../../contexts/AuthContext";
import "./config.css";

export default function Configuracoes() {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === "CLIENT" && <div style={{ fontSize: "2rem", color: "#3e301b" }}> Voce não tem permissão para acessar essa página!</div>}
      <h1 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        Configurações
      </h1>
      <div className="config-container">
        <WorkTimeForm />

        <InactivePeriodsManager />
      </div>
    </div>
  );
}
