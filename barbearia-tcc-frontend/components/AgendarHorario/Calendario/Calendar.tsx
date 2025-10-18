import { getServices } from "@/app/lib/types/serviceAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Calendar.module.css";
interface SeletorDataHoraProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (horario: string) => void;
  startTime: string;
  endTime: string;
  interval: number;
}

export default function SeletorDataHora({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  startTime,
  endTime,
  interval,
}: SeletorDataHoraProps) {
  // 1. GERENCIAMENTO DE ESTADO (useState)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 2. CÁLCULOS MEMOIZADOS (useMemo)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    for (let i = startMinutes; i < endMinutes; i += interval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      slots.push(formattedTime);
    }
    return slots;
  }, [startTime, endTime, interval]);

  // 3. EFEITOS COLATERAIS (useEffect)
  const fetchHorariosOcupados = useCallback(async () => {
    if (!selectedDate) {
      setHorariosOcupados([]);
      return;
    }
    setIsLoading(true);
    console.log(`Buscando horários para ${selectedDate.toLocaleDateString()}`);
    try {
      const response = await getServices();
      const servicosDoDia = response.data.filter((servico) => new Date(servico.ServiceTime).toDateString() === selectedDate.toDateString());
      const horarios = servicosDoDia.map((servico) => {
        const date = new Date(servico.ServiceTime);
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      });
      setHorariosOcupados(horarios);
    } catch (error) {
      console.error("Erro ao buscar horários ocupados:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]); // Esta função só será recriada se 'selectedDate' mudar

  // Este useEffect agora chama a função de busca sempre que a data selecionada muda.
  useEffect(() => {
    fetchHorariosOcupados();
  }, [fetchHorariosOcupados]);

  // NOVO useEffect: Este cria o intervalo de atualização a cada 15 minutos.
  useEffect(() => {
    const QUINZE_MINUTOS_EM_MS = 15 * 60 * 1000;

    // Inicia um "timer" que chama a função de busca repetidamente
    const intervalId = setInterval(() => {
      console.log("Verificação periódica (15 min) de horários...");
      fetchHorariosOcupados();
    }, QUINZE_MINUTOS_EM_MS);

    // Função de limpeza: ESSENCIAL para parar o timer quando o componente sair da tela
    return () => {
      console.log("Limpando timer de verificação de horários.");
      clearInterval(intervalId);
    };
  }, [fetchHorariosOcupados]); // Depende da função de busca

  // 4. MANIPULADORES DE EVENTOS (Handlers)
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

  // 6. RENDERIZAÇÃO PRINCIPAL DO COMPONENTE
  return (
    <div className={styles.container}>
      {renderHeader()}
      {renderWeekdays()}
      {renderDays()}
      <hr className={styles.separator} />
      <div className={styles.horariosWrapper}>
        {isLoading ? (
          <p>Carregando horários...</p>
        ) : selectedDate ? (
          <div className={styles.timeGrid}>
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              const isOccupied = horariosOcupados.includes(time);

              // --- LÓGICA DE VALIDAÇÃO COMPLEMENTADA ---
              let isPastTime = false;
              const now = new Date();

              // Só verifica horários passados se o dia selecionado for hoje
              if (selectedDate.toDateString() === now.toDateString()) {
                const [hours, minutes] = time.split(":").map(Number);
                const timeSlotDate = new Date(selectedDate);
                timeSlotDate.setHours(hours, minutes, 0, 0);

                if (timeSlotDate < now) {
                  isPastTime = true;
                }
              }

              const isDisabled = isOccupied || isPastTime;
              // --- FIM DA LÓGICA DE VALIDAÇÃO ---

              return (
                <button
                  key={time}
                  disabled={isDisabled}
                  className={`${styles.timeSlot} ${isSelected ? styles.selected : ""} ${isDisabled ? styles.disabled : ""}`}
                  onClick={() => onTimeSelect(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        ) : (
          <p>Selecione uma data para ver os horários.</p>
        )}
      </div>
    </div>
  );
}
