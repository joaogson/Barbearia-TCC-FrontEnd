"use client";

import { useState, useEffect, FormEvent } from "react";
import { getMyBarberSettings, updateMyBarberSettings } from "../../services/barberAPI";
import { useAuth } from "../../contexts/AuthContext";
import "./workTimeForm.css";

export default function WorkTimeForm() {
  const [formData, setFormData] = useState({
    workStartTime: "09:00",
    workEndTime: "18:00",
    breakBetweenCostumerService: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { user } = useAuth();
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getMyBarberSettings();
        console.log(settings.data);
        setFormData({
          workStartTime: settings.data.workStartTime ?? "",
          workEndTime: settings.data.workEndTime ?? "",
          breakBetweenCostumerService: settings.data.breakBetweenCostumerService ?? 0,
        });
      } catch (err) {
        console.error("Erro:", err);
        setError("Não foi possível carregar suas configurações atuais.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "breakBetweenCostumerService") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateMyBarberSettings(formData);
      setSuccess("Horário de trabalho atualizado com sucesso!");
    } catch (err) {
      setError("Ocorreu um erro ao salvar. Verifique os horários e tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p>Carregando configurações...</p>;
  }

  return (
    <div className="form-container">
      <h3>Horário de Expediente</h3>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <div className="workTime-form">
            <label htmlFor="workStartTime">Início do Expediente</label>
            <input type="time" id="workStartTime" name="workStartTime" value={formData.workStartTime} onChange={handleInputChange} required />
          </div>
          <div className="workTime-form">
            <label htmlFor="workEndTime">Fim do Expediente</label>
            <input type="time" id="workEndTime" name="workEndTime" value={formData.workEndTime} onChange={handleInputChange} required />
          </div>
          <div className="workTime-form">
            <label htmlFor="breakBetweenCostumerService">Intervalo entre atendimentos</label>
            <select
              className="select-interval"
              id="breakBetweenCostumerService"
              name="breakBetweenCostumerService"
              value={formData.breakBetweenCostumerService}
              onChange={handleInputChange}
            >
              <option className="interval-option" value={0}>
                Nenhum intervalo
              </option>
              <option className="interval-option" value={5}>
                5 minutos
              </option>
              <option className="interval-option" value={10}>
                10 minutos
              </option>
              <option className="interval-option" value={15}>
                15 minutos
              </option>
              <option className="interval-option" value={30}>
                30 minutos
              </option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar Horário"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}
