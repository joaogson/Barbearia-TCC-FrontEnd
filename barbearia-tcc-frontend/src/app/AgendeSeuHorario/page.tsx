"use client"; // Esta página agora usa hooks de estado, então precisa ser um Client Component

import { useEffect, useState } from "react";
import Calendar from "../../../components/AgendarHorario/Calendario/Calendar"; // Importe seu componente
import "./style.css";
import ListarServicos from "../../../components/ListServicos/ListarServicos";
import BotaoNavegacao from "../../../components/AgendarHorario/Button/ButtonNavegacao";
import DetalhesAgendamento from "../../../components/DetalhesAgendamento/detalhesAgendamento";
import Service from "../../../types/Service";
import { createCostumerService } from "../../../services/costumerServiceAPI";
import { getAvailability } from "../../../services/AvailabilityAPI";
import { useAuth } from "../../../contexts/AuthContext";
import { getClient } from "../../../services/ClientAPI";

export default function AgendarHorario() {
  // Estado para armazenar a data selecionada (Calendar)
  const [etapa, setEtapa] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedServicos, setSelectedServicos] = useState<Service[]>([]);
  const intervalo = 60;
  const { user } = useAuth();

  //TEMPORARIO
  const barberId = 1;

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedServicos.length === 0 || !selectedDate) {
        setAvailableSlots([]); // Limpa os horários se não houver serviço
        return;
      }

      try {
        const serviceIds = selectedServicos.map((servico) => servico.id);
        const dateString = selectedDate.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"

        // 2. Chama a nova API com os dados necessários
        const times = await getAvailability(barberId, dateString, serviceIds);

        setAvailableSlots(times);
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
        setAvailableSlots([]); // Limpa a lista em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedServicos, selectedDate]);

  const proximaEtapa = () => {
    etapa === 3 ? setEtapa(3) : setEtapa(etapa + 1);
    console.log(etapa);
  };
  const etapaAnterior = () => {
    etapa === 1 ? setEtapa(1) : setEtapa(etapa - 1);
    console.log(etapa);
  };

  //HANDLERS
  const handleDateSelection = (date: Date) => {
    console.log("Data recebida no componente pai:", date.toLocaleDateString("pt-BR"));
    setSelectedDate(date);
  };

  const handleSelecaoDeHorario = (time: string) => {
    console.log(`O horário ${time} foi selecionado!`);
    setSelectedHorario(time);
  };

  const handleServiceSelection = (service: Service[]) => {
    setSelectedServicos(service);
  };

  const handleConfirmarAgendamento = async () => {
    //Validação dos preenchimentos dos campos
    //Validação dos preenchimentos dos campos
    if (!selectedDate || !selectedHorario || selectedServicos.length === 0) {
      alert("Por favor, selecione os serviços, uma data e um horário.");
      return;
    }

    const [horas, minutos] = selectedHorario.split(":").map(Number);
    const dateFormatted = new Date(selectedDate);
    dateFormatted.setHours(horas, minutos, 0, 0);

    const client = await getClient();
    const serviceIds = selectedServicos.map((servico) => servico.id);

    const dataAPI = {
      ServiceTime: dateFormatted.toISOString(),
      clientId: client.data.id,
      isCancelled: false,
      barberId: barberId,
      servicesIds: serviceIds,
    };
    //Enviando para a API

    // if (!selectedDate || !selectedHorario) {
    //   console.log("Data ou horario não selecionados");
    //   alert("Por favor selecione uma data e um horario");
    //   return;
    // }
    // if (!setSelectedServicos || !selectedServicos) {
    //   console.log("Nenhum serviço selecionado!");
    //   alert("Por favor, selecione pelo menos um serviço");
    //   return;
    // }

    // //Formatação da hora e data
    // const [horas, minutos] = selectedHorario.split(":").map(Number);
    // const DateFormatted = new Date(selectedDate);
    // DateFormatted.setHours(horas, minutos, 0, 0);

    // //Define o client
    // const client = await getClient();

    // //Armazenamento dos ids dos Serviços selecionados
    // const serviceIds = selectedServicos.map((servico) => servico.id);
    // console.log(serviceIds);
    // //Juntando os dados para o envio a API
    // const dataAPI = {
    //   ServiceTime: DateFormatted.toISOString(),
    //   isCancelled: false,
    //   clientId: client.data.id,
    //   //Por momento somente um barbeiro
    //   barberId: 1,
    //   servicesIds: serviceIds,
    // };
    // console.log(dataAPI);
    //Enviando para a API
    try {
      console.log("Enviado os dados para a API");
      await createCostumerService(dataAPI);

      alert("Agendamento criado com sucesso!");
    } catch (error) {
      console.error("Falha ao criar o agendamento:", error);
      alert("Não foi possível concluir o agendamento. Tente novamente.");
    }
  };

  const renderizarEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <h2 style={{ color: "#3e301b", fontSize: "2rem", alignItems: "center", textAlign: "center" }}>Selecione o serviço</h2>
            <div className="selecionar-servico-container">
              <ListarServicos onServiceSelect={handleServiceSelection} selectedService={selectedServicos} />;
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 style={{ color: "#3e301b", fontSize: "2rem", alignItems: "center", textAlign: "center" }}>Selecione a Data e o horario</h2>
            <div className="agendar-horario-container">
              <Calendar
                onDateSelect={handleDateSelection}
                selectedDate={selectedDate}
                onTimeSelect={handleSelecaoDeHorario}
                selectedTime={selectedHorario}
                availableSlots={availableSlots}
                isLoading={isLoading}
              />
              <div style={{ padding: "20px", textAlign: "center" }}></div>
              {selectedHorario && (
                <div style={{ marginTop: "10px", fontSize: "1.2rem" }}>
                  Horário confirmado: <strong>{selectedHorario}</strong>
                </div>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="detalhesAgendamento-title" style={{ color: "#3e301b", fontSize: "2rem", alignItems: "center", textAlign: "center" }}>
              Detalhes do Agendamento
            </h2>
            <div className="detalhesAgendamento-container">
              <DetalhesAgendamento data={selectedDate} horario={selectedHorario} servico={selectedServicos} />
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        Agende Seu Atendimento
      </h1>
      <div className="agendarHorario-container">
        {renderizarEtapa()}

        <div className="buttons-container">
          <BotaoNavegacao onClick={etapaAnterior} tipo="voltar">
            Voltar
          </BotaoNavegacao>

          {etapa <= 3 && (
            <BotaoNavegacao onClick={etapa === 3 ? handleConfirmarAgendamento : proximaEtapa} tipo={etapa === 3 ? "confirmar" : "avancar"}>
              {etapa === 3 ? "Confirmar" : "Avançar"}
            </BotaoNavegacao>
          )}
        </div>
      </div>
    </div>
  );
}
