import Link from "next/link";
import "./perfil.css";
import { useAuth } from "../../contexts/AuthContext";
import { getClient } from "../../services/ClientAPI";
import { useEffect, useState } from "react";
import { Client } from "../../types/Client";

export default function ListPerfil() {
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);

  useEffect(() => {
    async function fetchClientData() {
      try {
        const profileData = await getClient();
        setClient(profileData.data);
      } catch (error) {
        console.log("Este usuário não é um cliente.");
        setClient(null);
      } finally {
        setIsLoadingPlan(false);
      }
    }
    if (user?.role === "CLIENT") {
      fetchClientData();
    } else {
      setIsLoadingPlan(false);
    }
  }, [user?.role]);

  const renderPlanBlock = () => {
    if (user?.role !== "CLIENT") return null;

    if (isLoadingPlan) {
      return (
        <div className="profile-block">
          <span className="block-label">Plano Atual</span>
          <p className="block-value">Carregando...</p>
        </div>
      );
    }

    return (
      <div className="profile-block">
        <span className="block-label">Plano Atual</span>
        <p className="block-value">
          {client?.plan
            ? `${client.plan.id} - ${client.plan.haircutNumber} cortes - R$${client.plan.value}`
            : "Sem Plano Vinculado"}
        </p>
      </div>
    );
  };

  return (
    <div className="informations-container">
      {/* Card Principal com fundo Marrom e borda Verde */}
      <div className="profile-card">
        
        {/* Cabeçalho com o NOME GRANDE */}
        <div className="profile-header">
          <h1 className="label-name">{user?.name}</h1>
        </div>

        {/* Corpo com as informações menores */}
        <div className="profile-content">
          <div className="profile-block">
            <span className="block-label">Email</span>
            <p className="block-value">{user?.email}</p>
          </div>

          <div className="profile-block">
            <span className="block-label">Celular</span>
            <p className="block-value">{user?.phone}</p>
          </div>

          {/* Renderiza o plano se for cliente */}
          {renderPlanBlock()}
        </div>

        {/* Botão de Editar no rodapé do card */}
        <Link className="button-actions" href="/Perfil/editar">
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}