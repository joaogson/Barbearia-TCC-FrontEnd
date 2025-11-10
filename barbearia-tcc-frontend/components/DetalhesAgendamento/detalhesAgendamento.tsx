import { Servicos } from "../../types/ServiceOnCostumerService";
import "./detalhesAgendamento.css";

interface detalhesProps {
  servico: Servicos[] | null;
  horario: string | null;
  data: Date | null;
}

export default function DetalhesAgendamento(props: detalhesProps) {
  if (!props.servico) return <p style={{ color: "#3e301b", fontSize: "1.5rem" }}> Nenhum serviço selecionado </p>;

  const FomatedDate = props.data ? props.data.toLocaleDateString("pt-Br") : "Nenhuma Data selecionada";
  const FormatedHour = props.horario ? props.horario : "Nenhum horario selecionado";
  const servicoString = props.servico.map((servico) => servico.description);
  return (
    <div className="detalhes-container">
      <ul className="lista-detalhes">
        <li className="card-detalhes">
          <strong style={{ paddingRight: "10px" }}>Serviço: </strong>
          {servicoString.join(" - ")}
        </li>
        <li className="card-detalhes">
          <strong style={{ paddingRight: "10px" }}>Data: </strong> {FomatedDate}
        </li>
        <li className="card-detalhes">
          <strong style={{ paddingRight: "10px" }}>Horario: </strong>
          {FormatedHour}
        </li>
      </ul>
    </div>
  );
}
