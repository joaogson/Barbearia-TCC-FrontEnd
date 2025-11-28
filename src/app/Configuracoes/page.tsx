"use client";
import ListInactivePeriods from "components/inactivePeriods/ListInactivePeriods/listInactivePeriods";
import InactivePeriodsManager from "../../../components/inactivePeriods/inactivePeriodsManager";
import ServiceManager from "../../../components/ManagerServices/managerServices";
import ClientPlanLinker from "../../../components/PlanManager/clientPlanLinker";
import PlanManager from "../../../components/PlanManager/planManager";
import WorkTimeForm from "../../../components/workTimeForm/workTimeForm";
import { useAuth } from "../../../contexts/AuthContext";
import "./config.css";
import { useEffect, useState } from "react";
import { InactivePeriods } from "types/Barber";
import { createInactivePeriod, deleteInactivePeriod, getInactivePeriods } from "services/barberAPI";
import ProtectedRoute from "components/ProtectedRoute/protectedRoute";

export default function Configuracoes() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periods, setPeriods] = useState<InactivePeriods[]>([]);

  const { user } = useAuth();

  const fetchPeriods = async (dateToFetch: Date) => {
    const dateString = dateToFetch.toISOString().split("T")[0];
    const data = await getInactivePeriods(dateString);
    setPeriods(data.data);
  };

  useEffect(() => {
    fetchPeriods(selectedDate);
  }, [selectedDate]);

  const handleAddPeriod = async (newPeriod: { startTime: string; endTime: string }) => {
    const dataToSend = {
      date: selectedDate.toISOString().split("T")[0],
      ...newPeriod,
    };
    await createInactivePeriod(dataToSend);

    fetchPeriods(selectedDate);
  };

  const handleDelete = async (periodId: number) => {
    if (!window.confirm("Tem certeza que deseja remover este bloqueio?")) return;
    await deleteInactivePeriod(periodId);
    setPeriods((currentPeriods) => currentPeriods.filter((p) => p.id !== periodId));
  };

  return (
    <ProtectedRoute allowedRoles={["BARBER", "CLIENT", "ADMIN"]}>
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
                width: "100%",
                textAlign: "start",
                color: "#3e301b",
                fontSize: "2rem",
                marginTop: "25px",
              }}
            >
              Horarios
            </h2>
            <div className="time-service-container">
              <div className="time-service-manager">
                <WorkTimeForm />

                <InactivePeriodsManager selectedDate={selectedDate} onDateChange={setSelectedDate} onAddPeriod={handleAddPeriod} />
              </div>
              <div className="list-periods">
                <ListInactivePeriods periods={periods} onDelete={handleDelete} />
              </div>
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
    </ProtectedRoute>
  );
}
