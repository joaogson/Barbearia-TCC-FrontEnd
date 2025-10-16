import { Servicos } from "@/app/lib/types/Servicos";
import "./detalhesAgendamento.css";

interface detalhesProps {
  servico: Servicos | null;
  horario: string | null;
  data: Date | null;
}

export default function DetalhesAgendamento(props: detalhesProps) {
  if (!props.servico) return <p> Nenhum serviço selecionado </p>;

  const FomatedDate = props.data ? props.data.toLocaleDateString("pt-Br") : "Nenhuma Data selecionada";
  const FormatedHour = props.horario ? props.horario : "Nenhum horario selecionado";
  return (
    <div className="detalhes-container">
      <h2> Detalhes do Agendamento</h2>
      <ul className="lista-detalhes">
        <li className="card-detalhes">
          <strong>Serviço: </strong>
          {props.servico.description}
        </li>
        <li className="card-detalhes">
          <strong>Data: </strong> {FomatedDate}
        </li>
        <li className="card-detalhes">
          <strong>Horario: </strong>
          {FormatedHour}
        </li>
      </ul>
    </div>
  );
}
