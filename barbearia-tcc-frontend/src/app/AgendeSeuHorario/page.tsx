"use client"; // Esta página agora usa hooks de estado, então precisa ser um Client Component

import { useState } from "react";
import Calendar from "../../../components/AgendarHorario/Calendario/Calendar"; // Importe seu componente
import "./style.css";
import ListarHorarios from "../../../components/listarHorarios/listarHorarios";
import ListarServicos from "../../../components/ViewServices/ListarServicos";
import BotaoNavegacao from "../../../components/AgendarHorario/Button/ButtonNext";
import DetalhesAgendamento from "../../../components/DetalhesAgendamento/detalhesAgendamento";
import { Servicos } from "../lib/types/Servicos";

export default function AgendarHorario() {
  // Estado para armazenar a data selecionada (Calendar)
  const [etapa, setEtapa] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedServico, setSelectedServico] = useState<Servicos | null>(null);
  const intervalo = 60;

  const proximaEtapa = () => {
    setEtapa(etapa + 1);
    console.log(etapa);
  };
  const etapaAnterior = () => {
    setEtapa(etapa - 1);
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

  return (
    <div>
      {renderizarEtapa()}
      <div style={{ marginTop: "20px" }}>{etapa > 1 && <button onClick={etapaAnterior}>Voltar</button>}</div>
      <BotaoNavegacao onClick={etapaAnterior} tipo="voltar">
        Voltar
      </BotaoNavegacao>

      <BotaoNavegacao
        onClick={proximaEtapa}
        tipo="avancar"
        // Exemplo de como desabilitar o botão:
        // Ele só fica ativo se um serviço tiver sido escolhido na etapa 1.
        disabled={etapa === 3}
      >
        Avançar
      </BotaoNavegacao>
    </div>
  );
}
