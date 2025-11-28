"use client";

import { InactivePeriods } from "../../../types/Barber";
import "../../style/list.css";
import "./listInactivePeriods.css";
interface ListInactivePeriodsProps {
  periods: InactivePeriods[];
  onDelete: (periodId: number) => void;
}

export default function ListInactivePeriods({ periods, onDelete }: ListInactivePeriodsProps) {
  return (
    <div className="list-inactive-periods-container">
      <h3>Periodos do dia</h3>
      <div className="list">
        <ul className="list-ul">
          {periods.map((period) => (
            <li key={period.id}>
              <div className="list-details">
                <p className="list-text">{`Bloqueado de ${period.startTime} às ${period.endTime} no dia ${new Date(period.date).toLocaleDateString(
                  "pt-Br",
                  { timeZone: "UTC" }
                )}`}</p>
                <div className="list-buttons">
                  <button onClick={() => onDelete(period.id)}>Remover</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
