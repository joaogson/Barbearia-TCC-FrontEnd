"use client";

import React, { useState, useMemo } from "react";
import styles from "./listarHorarios.module.css";

// Define as propriedades que o componente aceitará
interface HorariosListProps {
  startTime: string; // Formato "HH:MM", ex: "08:00"
  endTime: string; // Formato "HH:MM", ex: "18:00"
  interval: number; // Intervalo em minutos, ex: 30
  onTimeSelect: (time: string) => void;
  selectedTime: string | null; // Função para notificar o componente pai
}

const ListarHorarios: React.FC<HorariosListProps> = ({ startTime, endTime, interval, onTimeSelect, selectedTime }) => {
  // Lógica para gerar a lista de horários
  // useMemo garante que a lista só será recalculada se as props mudarem
  const timeSlots = useMemo(() => {
    const slots: string[] = [];

    // Função para converter "HH:MM" em minutos totais
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Loop para criar os horários com base no intervalo
    for (let i = startMinutes; i < endMinutes; i += interval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;

      // Formata para "HH:MM" com zero à esquerda se necessário
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      slots.push(formattedTime);
    }

    return slots;
  }, [startTime, endTime, interval]);

  // Função chamada quando um horário é clicado
  const handleTimeClick = (time: string) => {
    onTimeSelect(time); // Chama a função do componente pai
  };

  return (
    <div className={styles.container}>
      {timeSlots.map((time) => {
        // Define as classes dinamicamente
        const isSelected = selectedTime === time;
        const timeSlotClassName = `${styles.timeSlot} ${isSelected ? styles.selected : ""}`;

        return (
          <button key={time} className={timeSlotClassName} onClick={() => handleTimeClick(time)}>
            {time}
          </button>
        );
      })}
    </div>
  );
};

export default ListarHorarios;
