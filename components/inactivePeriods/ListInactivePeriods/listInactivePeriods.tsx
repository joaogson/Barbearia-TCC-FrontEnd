"use client";

import { InactivePeriods } from "../../../types/Barber";
import "../../style/list.css"
import "./listInactivePeriods.css"
// 1. Definimos as Props que este componente espera receber
interface ListInactivePeriodsProps {
  periods: InactivePeriods[];
  onDelete: (periodId: number) => void; // A função que será chamada ao clicar em remover
}

export default function ListInactivePeriods({ periods, onDelete }: ListInactivePeriodsProps) {
  return (
    <div className="list-inactive-periods-container">
      <h3>Periodos do dia</h3>
    <div className="list">
    <ul className="list-ul">
      {/* 2. Mapeia os 'periods' recebidos via props */}
      {periods.map((period) => (
        <li key={period.id}>
            <div className="list-details">
          <p className="list-text">{`Bloqueado de ${period.startTime} às ${period.endTime}`}</p>
          
          {/* 3. Chama a função 'onDelete' recebida via props, passando o ID */}
          <div className="list-buttons">
          <button  onClick={() => onDelete(period.id)}>Remover</button>
          </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
    </div>
  );
}