"use client";

import { useState } from "react";
import "./inactivePeriods.css";

// 1. Definição das Props que o componente VAI RECEBER da página
interface ManagerProps {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
  onAddPeriod: (newPeriod: { startTime: string; endTime: string }) => void;
}

export default function InactivePeriodsManager({
  selectedDate,
  onDateChange,
  onAddPeriod,
}: ManagerProps) {
  
  // 2. O estado para "startTime" e "endTime" continua vivendo aqui
  const [newPeriod, setNewPeriod] = useState({ startTime: "12:00", endTime: "13:00" });

  // 3. O 'submit' agora chama a prop 'onAddPeriod'
  const handleSubmit = () => {
    onAddPeriod(newPeriod);
  };

  return (
    <div className="inactive-periods-block">
      <h3>Periodos de Inatividade</h3>
    <div className="inactive-periods-container">
      {/* 1. Seletor de Data e horario*/}
        <div className="add-period-content">
      <div className="add-period-form">
        <label className="label-select-date" htmlFor="data-select">
          Selecione a data
        </label>
        <input
          // ✅ CLASSE REMOVIDA DAQUI
          id="data-select"
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => onDateChange(new Date(e.target.value))}
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
        </div>
        <div className="add-period-form">
        <label className="label-select-date" htmlFor="time-end-select">
          Selecione o horario de término
        </label>
        <input
          type="time"
          id="time-end-select"
          value={newPeriod.endTime}
          onChange={(e) => setNewPeriod({ ...newPeriod, endTime: e.target.value })}
        />
        
        {/* ✅ ESTILO DO BOTÃO CORRIGIDO */}
      </div>
      </div>
      <button
          className="button-inactive-period" /* ✅ CLASSE ADICIONADA */
          onClick={handleSubmit}
          // style={{ marginTop: "15px" }} /* ❌ STYLE REMOVIDO */
        >
          Adicionar Bloqueio
        </button>
    </div>
    </div>
  );
}