"use client"; // Necessário no Next.js App Router para componentes com interatividade

import React, { useState } from "react";
import styles from "./Calendar.module.css";
// Importando os estilos

// Interface para as propriedades do componente (opcional, mas boa prática)
interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null; // Função para notificar o componente pai sobre a data selecionada
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(date); // Chama a função do componente pai
  };

  const renderHeader = () => {
    const monthName = currentDate.toLocaleString("pt-BR", { month: "long" });
    const year = currentDate.getFullYear();
    return (
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{`${monthName} de ${year}`}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    );
  };

  const renderWeekdays = () => {
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return (
      <div className={styles.grid}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Espaços vazios no início
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={`${styles.day} ${styles.empty}`}></div>);
    }

    // Dias do mês
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const isSelected = selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

      const classNames = [styles.day, isSelected ? styles.selected : ""].join(" ");

      days.push(
        <div key={day} className={classNames} onClick={() => handleDayClick(day)}>
          {day}
        </div>
      );
    }

    return <div className={styles.grid}>{days}</div>;
  };

  return (
    <div className={styles.container}>
      {renderHeader()}
      {renderWeekdays()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
