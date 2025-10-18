"use client"; // Esta página agora usa hooks de estado, então precisa ser um Client Component

import { useState } from "react";
import Calendar from "../../../components/AgendarHorario/Calendario/Calendar"; // Importe seu componente
import "./style.css";
import ListarServicos from "../../../components/ViewServices/ListarServicos";
import BotaoNavegacao from "../../../components/AgendarHorario/Button/ButtonNavegacao";
import DetalhesAgendamento from "../../../components/DetalhesAgendamento/detalhesAgendamento";
import { Servicos } from "../lib/types/Servicos";
import { createService } from "../lib/types/serviceAPI";
import { Client } from "../lib/types/Client";
import { Barber } from "../lib/types/Barber";
import { error } from "console";

export default function AgendarHorario() {
  // Estado para armazenar a data selecionada (Calendar)
  const [etapa, setEtapa] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedServicos, setSelectedServicos] = useState<Servicos[]>([]);
  const intervalo = 60;
  const clientLogado: Client = {
    id: 1,
    name: "João Gabriel",
    email: "joaogsonalio@gmail.com",
    phone: 42999945270,
    username: "joaosonalio",
    password: "sonalio0672",
    plan: null,
    feedBack: null,
  };

  const barber: Barber = {
    id: 1,
    name: "Entoni",
    email: "entoni@gmail.com",
    phone: 42999998888,
    username: "entoniGabriel",
    password: "abcd1234",
  };

  const proximaEtapa = () => {
    etapa === 3 ? setEtapa(3) : setEtapa(etapa + 1);
    console.log(etapa);
  };
  const etapaAnterior = () => {
    etapa === 1 ? setEtapa(1) : setEtapa(etapa - 1);
    console.log(etapa);
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
                startTime="08:00"
                endTime="20:00"
                interval={intervalo}
                onTimeSelect={handleSelecaoDeHorario}
                selectedTime={selectedHorario}
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
  // Função para enviar aos componentes os horarios
  const handleDateSelection = (date: Date) => {
    console.log("Data recebida no componente pai:", date.toLocaleDateString("pt-BR"));
    setSelectedDate(date);
  };

  const handleSelecaoDeHorario = (time: string) => {
    console.log(`O horário ${time} foi selecionado!`);
    setSelectedHorario(time);
  };

  const handleServiceSelection = (service: Servicos[]) => {
    setSelectedServicos(service);
  };

  const handleConfirmarAgendamento = async () => {
    //Validação dos preenchimentos dos campos
    if (!selectedDate || !selectedHorario) {
      console.log("Data ou horario não selecionados");
      alert("Por favor selecione uma data e um horario");
      return;
    }
    if (!setSelectedServicos || !selectedServicos) {
      console.log("Nenhum serviço selecionado!");
      alert("Por favor, selecione pelo menos um serviço");
      return;
    }

    //Formatação da hora e data
    const [horas, minutos] = selectedHorario.split(":").map(Number);
    const DateFormatted = new Date(selectedDate);
    DateFormatted.setHours(horas, minutos, 0, 0);

    //Armazenamento dos ids dos Serviços selecionados
    const serviceIds = selectedServicos.map((servico) => servico.id);
    console.log(serviceIds);
    //Juntando os dados para o envio a API
    const dataAPI = {
      ServiceTime: DateFormatted.toISOString(),
      isPaid: false,
      clientId: clientLogado.id,
      barberId: barber.id,
      servicesIds: serviceIds,
    };
    console.log(dataAPI);
    //Enviando para a API
    try {
      console.log("Enviado os dados para a API");
      await createService(dataAPI);

      alert("Agendamento criado com sucesso!");
    } catch (error) {
      console.error("Falha ao criar o agendamento:", error);
      alert("Não foi possível concluir o agendamento. Tente novamente.");
    }
  };

  return (
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
  );
}
