"use client";

import { useState, useEffect, FormEvent } from "react";
import { getMyBarberSettings, updateMyBarberSettings } from "../../services/barberAPI";
import { useAuth } from "../../contexts/AuthContext";

export default function WorkTimeForm() {
  const [formData, setFormData] = useState({
    workStartTime: "09:00",
    workEndTime: "18:00",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { user } = useAuth();

  // Busca os dados atuais para preencher o formulário
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getMyBarberSettings();

        setFormData({
          workStartTime: settings.data.workStartTime ?? "",
          workEndTime: settings.data.workEndTime ?? "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <form onSubmit={handleSubmit} className="settings-form">
      <h3>Horário de Expediente</h3>
      <p>Defina o início e o fim do seu dia de trabalho.</p>

      <div className="form-group">
        <label htmlFor="workStartTime">Início do Expediente</label>
        <input
          type="time" // O input 'time' oferece um seletor de horário nativo!
          id="workStartTime"
          name="workStartTime"
          value={formData.workStartTime}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="workEndTime">Fim do Expediente</label>
        <input type="time" id="workEndTime" name="workEndTime" value={formData.workEndTime} onChange={handleInputChange} required />
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Salvando..." : "Salvar Horário"}
      </button>
    </form>
  );
}
