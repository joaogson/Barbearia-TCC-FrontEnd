"use client"; // Esta página agora usa hooks de estado, então precisa ser um Client Component

import { useState } from "react";
import Calendar from "../../../components/AgendarHorario/Calendario/Calendar"; // Importe seu componente
import "./style.css";
import ListarHorarios from "../../../components/listarHorarios/listarHorarios";
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
  const [selectedServico, setSelectedServico] = useState<Servicos | null>(null);
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
          <div className="selecionar-servico-container">
            <ListarServicos onServiceSelect={handleServiceSelection} />;
          </div>
        );

      case 2:
        return (
          <div className="agendar-horario-container">
            <Calendar onDateSelect={handleDateSelection} selectedDate={selectedDate} />
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h1>Escolha um Horário</h1>
              <p>Intervalos de {intervalo} minutos.</p>

              <ListarHorarios
                startTime="08:00"
                endTime="20:00"
                interval={intervalo}
                onTimeSelect={handleSelecaoDeHorario}
                selectedTime={selectedHorario}
              />
            </div>
            {selectedHorario && (
              <div style={{ marginTop: "10px", fontSize: "1.2rem" }}>
                Horário confirmado: <strong>{selectedHorario}</strong>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <DetalhesAgendamento data={selectedDate} horario={selectedHorario} servico={selectedServico} />
          </div>
        );
    }
  };

  const serviceDataFormatted = (client: Client, data: Date, horario: string, barber: Barber) => {
    const [horas, minutos] = horario.split(":").map(Number);
    const DateFormatted = new Date(data);
    DateFormatted.setHours(horas, minutos, 0, 0);
    console.log(DateFormatted);
    let ServiceData = null;
    if (selectedServico) {
      ServiceData = {
        ServiceTime: DateFormatted.toISOString(),
        isPaid: false,
        clientId: clientLogado.id,
        barberId: barber.id,
        serviceId: selectedServico.id,
      };
    }
    return ServiceData;
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

  const handleServiceSelection = (service: Servicos) => {
    console.log(`O serviço ${service.description} foi selecoinado!`);
    setSelectedServico(service);
  };

  const handleConfirmarAgendamento = () => {
    let data = null;
    if (selectedDate != null && selectedHorario != null) {
      data = serviceDataFormatted(clientLogado, selectedDate, selectedHorario, barber);
    }
    const ServiceData = data;
    data ? createService(ServiceData) : console.log("Data vazia");
  };

  return (
    <div>
      {renderizarEtapa()}
      <div style={{ marginTop: "20px" }}>{etapa > 1 && <button onClick={etapaAnterior}>Voltar</button>}</div>
      <BotaoNavegacao onClick={etapaAnterior} tipo="voltar">
        Voltar
      </BotaoNavegacao>

      {etapa <= 3 && (
        <BotaoNavegacao onClick={etapa === 3 ? handleConfirmarAgendamento : proximaEtapa} tipo={etapa === 3 ? "confirmar" : "avancar"}>
          {etapa === 3 ? "Confirmar" : "Avançar"}
        </BotaoNavegacao>
      )}
    </div>
  );
}
