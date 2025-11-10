"use client";
import InactivePeriodsManager from "../../../components/inactivePeriods/inactivePeriodsManager";
import ServiceManager from "../../../components/ManagerServices/ListServicos/managerServices";
import ClientPlanLinker from "../../../components/PlanManager/clientPlanLinker";
import PlanManager from "../../../components/PlanManager/planManager";
import WorkTimeForm from "../../../components/workTimeForm/workTimeForm";
import { useAuth } from "../../../contexts/AuthContext";
import "./config.css";

export default function Configuracoes() {
  const { user } = useAuth();
  return (
    <div className="page-config-container">
      {user?.role === "CLIENT" && <div style={{ fontSize: "2rem", color: "#3e301b" }}> Voce não tem permissão para acessar essa página!</div>}
      <h1
        style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
        }}
      >
        Configurações
      </h1>
      <div className="config-container">
        <div className="config-content">
          <h2
            style={{
              borderBottom: "3px solid #3e301b",
              width: "80%",
              textAlign: "start",
              color: "#3e301b",
              fontSize: "2rem",
              marginTop: "25px",
            }}
          >
            Horarios
          </h2>
          <div className="time-service-container">
            <WorkTimeForm />

            <InactivePeriodsManager />
          </div>
        </div>
      </div>
      <div className="config-content">
        <h2
          style={{
            borderBottom: "3px solid #3e301b",
            width: "80%",
            textAlign: "start",
            color: "#3e301b",
            fontSize: "2rem",
            marginTop: "25px",
          }}
        >
          Serviços
        </h2>
        <ServiceManager />
      </div>
      <div className="config-content">
        <h2
          style={{
            borderBottom: "3px solid #3e301b",
            width: "80%",
            textAlign: "start",
            color: "#3e301b",
            fontSize: "2rem",
            marginTop: "25px",
          }}
        >
          Planos
        </h2>
        <PlanManager />
      </div>

      <div className="config-content">
        <h2
          style={{
            borderBottom: "3px solid #3e301b",
            width: "80%",
            textAlign: "start",
            color: "#3e301b",
            fontSize: "2rem",
            marginTop: "25px",
          }}
        >
          Vincular Planos aos Clientes
        </h2>
        <ClientPlanLinker />
      </div>
    </div>
  );
}
