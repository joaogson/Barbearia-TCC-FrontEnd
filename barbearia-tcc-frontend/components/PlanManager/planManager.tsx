"use client";

import { useState, useEffect, FormEvent } from "react";
import { getPlans, createPlan, deletePlan, updatePlan } from "../../services/planAPI";
import "./managerPlan.css";
import { Plan, ClientForList, createPlanDto } from "../../types/Plan";

const initialState: createPlanDto = { haircutNumber: 0, value: 0 };

export default function PlanManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formData, setFormData] = useState<createPlanDto>(initialState);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca inicial dos serviços (sem mudanças)
  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (error) {
        console.error("Falha ao carregar serviços", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  // ✅ Função de edição simplificada, sem 'price'
  const handleEdit = (plan: Plan) => {
    setEditingPlanId(plan.id);
    setFormData({ haircutNumber: plan.haircutNumber, value: plan.value });
  };

  const handleCancelEdit = () => {
    setEditingPlanId(null);
    setFormData(initialState);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este plano?")) return;
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Falha ao excluir plano", error);
      alert("Não foi possível excluir o plano.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // ✅ Validação simplificada, sem 'price'
    if (!formData.haircutNumber || formData.value <= 0) {
      alert("Por favor, preencha a numero de cortes e o valor corretamente.");
      return;
    }

    try {
      if (editingPlanId) {
        // Atualizar
        const updatePlanConst = await updatePlan(editingPlanId, formData);
        setPlans((prev) => prev.map((s) => (s.id === editingPlanId ? updatePlanConst : s)));
      } else {
        // Criar
        const newPlan = await createPlan(formData);
        setPlans((prev) => [...prev, newPlan]);
      }
      handleCancelEdit(); // Limpa o formulário
    } catch (error) {
      console.error("Falha ao salvar o serviço", error);
      alert("Não foi possível salvar o serviço.");
    }
  };

  return (
    <>
      <div className="plan-container">
        <div className="plan-form-container">
          <h2 className="plan-title">Gerenciar Serviços</h2>
          <form onSubmit={handleSubmit} className="plan-form">
            <label htmlFor="haircutNumber">{editingPlanId ? "Editar Plano" : "Adicionar Novo Plano"}</label>
            <input
              id="haircutNumber"
              name="haircutNumber"
              value={formData.haircutNumber}
              onChange={handleInputChange}
              placeholder="Numero de Cortes"
            />
            <label htmlFor="value">Valor</label>
            <input id="value" name="value" value={formData.value} onChange={handleInputChange} type="number" />
            <div className="plan-button">
              <button className="button-plan" type="submit">
                {editingPlanId ? "Salvar Alterações" : "Adicionar Plano"}
              </button>
              {editingPlanId && (
                <button className="button-plan" type="button" onClick={handleCancelEdit}>
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="plan-list-container">
          <h3>Planos Cadastrados</h3>
          <div className="plan-list">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="plan-ul">
                {plans.map((plan) => (
                  <li key={plan.id}>
                    <div className="plan-details">
                      <div className="plan-text">
                        <span>{plan.haircutNumber}</span>
                        <span> - R$ {plan.value}</span>
                      </div>
                      <div className="list-buttons">
                        <button onClick={() => handleEdit(plan)}>Editar</button>
                        <button onClick={() => handleDelete(plan.id)}>Remover</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
