import { useState } from "react";
import styles from "./Calendar.module.css";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface SeletorDataHoraProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (horario: string) => void;
  availableSlots: string[];
  isLoading: boolean;
}

export default function SeletorDataHora({ selectedDate, selectedTime, onDateSelect, onTimeSelect, availableSlots, isLoading }: SeletorDataHoraProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(availableSlots);
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

  const renderHeader = () => (
    <div className={styles.header}>
      <button aria-label="Voltar Mes" onClick={handlePrevMonth}>
        &lt;
      </button>
      <h2>{`${currentDate.toLocaleString("pt-BR", { month: "long" })} de ${currentDate.getFullYear()}`}</h2>
      <button aria-label="Proximo Mes" onClick={handleNextMonth}>
        &gt;
      </button>
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
    if (isLoading) {
      return <p className={styles.infoText}>Carregando horários...</p>;
    }
    if (!selectedDate) {
      return <p className={styles.infoText}>Selecione uma data para ver os horários.</p>;
    }
    if (availableSlots.length === 0) {
      return <p className={styles.infoText}>Nenhum horário disponível para esta data e serviços selecionados.</p>;
    }

    return (
      <div>
        <div className={styles.timeGrid}>
          {availableSlots.map((time) => {
            const formattedTime = dayjs(time).format("HH:mm");
            console.log(time);
            console.log(formattedTime);
            const isSelected = selectedTime === formattedTime;
            return (
              <button
                key={time}
                disabled={false}
                className={`${styles.timeSlot} ${isSelected ? styles.selected : ""}`}
                onClick={() => onTimeSelect(formattedTime)}
              >
                {formattedTime}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

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
