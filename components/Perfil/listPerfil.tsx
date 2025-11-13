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
        // Tenta buscar o perfil de cliente
        const profileData = await getClient();
        setClient(profileData.data);
      } catch (error) {
        // Erro  se o usuário logado for um Barbeiro
        console.log("Este usuário não é um cliente.");
        setClient(null); // Garante que o perfil é nulo
      } finally {
        setIsLoadingPlan(false);
      }
    }
    if (user?.role === "CLIENT") {
      fetchClientData();
    } else {
      // Se for 'barber', não fazemos nada
      // e paramos o 'loading' imediatamente.
      setIsLoadingPlan(false);
    }
  }, [user?.role]);

  const renderPlanBlock = () => {
    // 1. Se não for um cliente, não renderiza o bloco.
    if (user?.role !== "CLIENT") {
      return null; // Retorna 'nada'
    }

    // 2. Se for cliente, mas ainda estiver carregando
    if (isLoadingPlan) {
      return (
        <div className="information-block">
          <div className="information-header">Plano</div>
          <p className="label">Carregando...</p>
        </div>
      );
    }

    // 3. Se for cliente e já carregou (com ou sem plano)
    return (
      <div className="information-block">
        <div className="information-header">Plano</div>

        <p className="label">{ client?.plan ? `Plano ${client?.plan?.id} - ${client?.plan?.haircutNumber} cortes por R$${client?.plan?.value}`: "Sem Plano"}</p>
      </div>
    );
  };

  return (
    <>
      <div className="informations-container">
        <div className="information-details">
          <Link className="button-actions" href="/Perfil/editar">
            editar
          </Link>
          <div className="information-card">
            <div className="information-block">
              <div className="information-header">Nome</div>
              <p className="label">{user?.name}</p>
            </div>

            <div className="information-block">
              <div className="information-header">Email</div>
              <p className="label"> {user?.email}</p>
            </div>

            <div className="information-block">
              <div className="information-header">Celular</div>
              <p className="label">{user?.phone}</p>
            </div>
            {renderPlanBlock()}
          </div>
        </div>
      </div>
    </>
  );
}
