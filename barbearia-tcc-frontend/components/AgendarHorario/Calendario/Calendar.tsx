import { getCostumerServices } from "../../../services/costumerServiceAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Calendar.module.css";
import dayjs from "dayjs";
interface SeletorDataHoraProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (horario: string) => void;
  availableSlots: string[];
  isLoading: boolean;
}

export default function SeletorDataHora({ selectedDate, selectedTime, onDateSelect, onTimeSelect, availableSlots, isLoading }: SeletorDataHoraProps) {
  // 1. GERENCIAMENTO DE ESTADO (useState)
  const [currentDate, setCurrentDate] = useState(new Date());

  // HANDLERS
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(date);
  };

  // 5. FUNÇÕES DE RENDERIZAÇÃO
  const renderHeader = () => (
    <div className={styles.header}>
      <button onClick={handlePrevMonth}>&lt;</button>
      <h2>{`${currentDate.toLocaleString("pt-BR", { month: "long" })} de ${currentDate.getFullYear()}`}</h2>
      <button onClick={handleNextMonth}>&gt;</button>
    </div>
  );

  const renderWeekdays = () => (
    <div className={styles.grid}>
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
        <div key={day} className={styles.weekday}>
          {day}
        </div>
      ))}
    </div>
  );

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={`${styles.day} ${styles.empty}`}></div>);
    }
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const diaAtualDoLoop = new Date(year, month, day);
      const isPast = diaAtualDoLoop < hoje;
      const isSelected = selectedDate && diaAtualDoLoop.toDateString() === selectedDate.toDateString();
      const classNames = [styles.day, isSelected ? styles.selected : "", isPast ? styles.disabled : ""].join(" ");
      days.push(
        <div key={day} className={classNames} onClick={isPast ? undefined : () => handleDayClick(day)}>
          {day}
        </div>
      );
    }
    return <div className={styles.grid}>{days}</div>;
  };

  const renderTimeSlots = () => {
    // Caso 1: Estamos esperando a resposta da API
    if (isLoading) {
      return <p className={styles.infoText}>Carregando horários...</p>;
    }
    // Caso 2: Nenhuma data foi selecionada ainda
    if (!selectedDate) {
      return <p className={styles.infoText}>Selecione uma data para ver os horários.</p>;
    }
    // Caso 3: A API respondeu, mas não há horários para os serviços/data escolhidos
    if (availableSlots.length === 0) {
      return <p className={styles.infoText}>Nenhum horário disponível para esta data e serviços selecionados.</p>;
    }

    return (
      <div className={styles.timeGrid}>
        {availableSlots.map((time) => {
          const formattedTime = dayjs(time).format("HH:mm");
          const isSelected = selectedTime === time;
          // Não precisamos mais de 'isOccupied' ou 'isPastTime'.
          // Se o horário está na lista 'availableSlots', ele é válido e clicável.
          return (
            <button
              key={time}
              disabled={false} // O botão nunca está desabilitado se ele for renderizado
              className={`${styles.timeSlot} ${isSelected ? styles.selected : ""}`}
              onClick={() => onTimeSelect(formattedTime)}
            >
              {formattedTime}
            </button>
          );
        })}
      </div>
    );
  };

  // 6. RENDERIZAÇÃO PRINCIPAL DO COMPONENTE
  return (
    <div className={styles.container}>
      {renderHeader()}
      {renderWeekdays()}
      {renderDays()}
      <hr className={styles.separator} />
      <div className={styles.horariosWrapper}>{renderTimeSlots()}</div>
    </div>
  );
}
