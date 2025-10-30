"use client";

import { useState, useEffect } from "react";
import { createInactivePeriod, deleteInactivePeriod, getInactivePeriods } from "../../services/barberAPI";
import { InactivePeriods } from "../../types/Barber";
import "./inactivePeriods.css";
// ... importações das funções da API ...

export default function InactivePeriodsManager() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periods, setPeriods] = useState<InactivePeriods[]>([]); // Lista de períodos do dia
  const [newPeriod, setNewPeriod] = useState({ startTime: "12:00", endTime: "13:00" });

  // Busca os períodos sempre que a data selecionada muda
  useEffect(() => {
    const fetchPeriods = async () => {
      const dateString = selectedDate.toISOString().split("T")[0];
      const data = await getInactivePeriods(dateString);
      setPeriods(data.data);
    };
    fetchPeriods();
  }, [selectedDate]);

  const handleAddPeriod = async () => {
    const dataToSend = {
      date: selectedDate.toISOString().split("T")[0],
      ...newPeriod,
    };
    await createInactivePeriod(dataToSend); // Chama a API POST
    // Atualiza a lista para mostrar o novo período
    const updatedPeriods = await getInactivePeriods(dataToSend.date);
    setPeriods(updatedPeriods.data);
  };

  const handleDelete = async (periodId: number) => {
    if (!window.confirm("Tem certeza que deseja remover este bloqueio?")) return;
    await deleteInactivePeriod(periodId); // Chama a API DELETE
    // Remove o período da lista localmente para uma atualização instantânea
    setPeriods((currentPeriods) => currentPeriods.filter((p) => p.id !== periodId));
  };

  return (
    <div className="container-page">
      <h3>Gerenciar Bloqueios de Horário</h3>
      <div className="inactive-periods-container">
        {/* 1. Seletor de Data e horario*/}
        <div className="add-period-form">
          <label className="label-select-date" htmlFor="data-select">
            Selecione a data
          </label>
          <input
            className="input-inactive-period"
            id="data-select"
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </div>

        <div className="add-period-form">
          <label className="label-select-date" htmlFor="time-start-select">
            Selecione o horario de inicio
          </label>
          <input
            type="time"
            id="time-start-select"
            value={newPeriod.startTime}
            onChange={(e) => setNewPeriod({ ...newPeriod, startTime: e.target.value })}
          />
          <label className="label-select-date" htmlFor="time-end-select">
            Selecione o horario de término
          </label>
          <input
            type="time"
            id="time-end-select"
            value={newPeriod.endTime}
            onChange={(e) => setNewPeriod({ ...newPeriod, endTime: e.target.value })}
          />
          <button style={{ marginTop: "15px" }} onClick={handleAddPeriod}>
            Adicionar Bloqueio
          </button>
        </div>

        {/* 2. Lista de Períodos do Dia */}
        <ul className="period-list">
          {periods.map((period) => (
            <li className="period-card" key={period.id}>
              <p className="period-text">{`Bloqueado de ${period.startTime} às ${period.endTime}`}</p>
              <button onClick={() => handleDelete(period.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
