"use client";

import { useState, useEffect } from "react";
import "./clientPlanLinker.css";
import { ClientForList, Plan } from "../../types/Plan";
import { getClientsForManagement, getPlans, updateClientPlan } from "../../services/planAPI";

export default function ClientPlanLinker() {
  const [clients, setClients] = useState<ClientForList[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para o Modal de Edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<ClientForList | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(""); // Usamos string para o <select>

  // 1. Busca todos os clientes e todos os planos
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [clientsData, plansData] = await Promise.all([getClientsForManagement(), getPlans()]);

        console.log("Clients", clientsData);
        console.log("Plans ", plansData);
        setClients(clientsData);
        setPlans(plansData);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [setClients]);

  // 2. Abre o modal para gerenciar um cliente
  const handleManageClick = (client: ClientForList) => {
    setCurrentClient(client);
    setSelectedPlanId(client.plan?.id?.toString() || "null"); // Define o valor atual do <select>
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentClient(null);
    setSelectedPlanId("");
  };

  // 3. Salva a alteração
  const handleSavePlan = async () => {
    if (!currentClient) return;

    try {
      const newPlanId = selectedPlanId === "null" ? null : parseInt(selectedPlanId, 10);

      const updatedClient = await updateClientPlan(currentClient.id, newPlanId);

      // Atualiza a lista de clientes na tela
      setClients((prevClients) => prevClients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));

      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar o plano", error);
      alert("Falha ao atualizar o plano.");
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="plan-container">
      <div className="plan--client-list-container">
        <h2 className="plan-title">Gerenciar Planos de Clientes</h2>
        <div className="plan-content">
          <div className="table-wrapper">
            <table className="client-table">
              <thead className="client-table-header">
                <tr>
                  <th>Cliente</th>
                  <th>Plano Atual</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody className="client-plan-content">
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.user.name}</td>
                    <td>{`${client.plan?.id} - ${client.plan?.haircutNumber} cortes por R$${client.plan?.value}` || "Sem Plano"}</td>
                    <td>
                      <button onClick={() => handleManageClick(client)}>{client.plan ? "Editar Plano" : "Vincular Plano"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODAL DE EDIÇÃO */}
          {isModalOpen && currentClient && (
            // 1.Wrapper que cobre a tela
            <div className="modal-wrapper" onClick={handleCloseModal}>
              {/* Caixa do modal*/}
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3 className="modal-title">Gerenciar Plano de {currentClient.user.name}</h3>
                </div>

                <div className="modal-block">
                  <div className="modal-content">
                    <p>Selecione um plano para vincular, trocar ou remover.</p>
                    <select value={selectedPlanId} onChange={(e) => setSelectedPlanId(e.target.value)} className="plan-select">
                      <option value="null">Remover Plano (Sem Plano)</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.id ? `${plan.id} - R$${plan.value} - ${plan.haircutNumber} p/mes` : "Sem plano"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-actions">
                    <button onClick={handleCloseModal}>Cancelar</button>
                    <button onClick={handleSavePlan}>Salvar Alterações</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
