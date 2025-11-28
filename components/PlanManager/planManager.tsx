"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { getPlans, createPlan, deletePlan, updatePlan } from "../../services/planAPI";
import "./managerPlan.css";
import "../style/list.css";
import { Plan, createPlanDto } from "../../types/Plan";

const initialState: createPlanDto = { haircutNumber: 0, value: 0 };

export default function PlanManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formData, setFormData] = useState<createPlanDto>(initialState);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
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

  const handleEdit = (plan: Plan) => {
    setEditingPlanId(plan.id);
    setFormData({ haircutNumber: plan.haircutNumber, value: plan.value });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    if (!formData.haircutNumber || formData.value <= 0) {
      alert("Por favor, preencha a numero de cortes e o valor corretamente.");
      return;
    }

    try {
      if (editingPlanId) {
        const updatePlanConst = await updatePlan(editingPlanId, formData);
        setPlans((prev) => prev.map((s) => (s.id === editingPlanId ? updatePlanConst : s)));
      } else {
        const newPlan = await createPlan(formData);

        setPlans((prev) => [...prev, newPlan]);
      }
      handleCancelEdit();
    } catch (error) {
      console.error("Falha ao salvar o serviço", error);
      alert("Não foi possível salvar o serviço.");
    }
  };

  return (
    <>
      <div className="plan-manager-container">
        <div className="plan-manager-form-container">
          <h2 className="plan-title">Gerenciar Planos</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="plan-form">
            <div className="plan-form-details">
              <label htmlFor="haircutNumber">{editingPlanId ? "Editar Plano" : "Adicionar Novo Plano"}</label>
              <input
                id="haircutNumber"
                name="haircutNumber"
                value={formData.haircutNumber}
                onChange={handleInputChange}
                placeholder="Numero de Cortes"
                type="number"
              />
              <label htmlFor="value">Valor</label>
              <input id="value" name="value" value={formData.value} onChange={handleInputChange} type="number" />
            </div>
            <div className="list-buttons">
              <button type="submit">{editingPlanId ? "Salvar Alterações" : "Adicionar Plano"}</button>
              {editingPlanId && (
                <button type="button" onClick={handleCancelEdit}>
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="plan-list-container">
          <h3>Planos Cadastrados</h3>
          <div className="list">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="list-ul">
                {plans.map((plan) => (
                  <li key={plan.id} style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0.5)" }}>
                    <div className="list-details">
                      <div className="list-text">
                        <span> {plan.id} - </span>
                        <span>{plan.haircutNumber} Cortes</span>
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
