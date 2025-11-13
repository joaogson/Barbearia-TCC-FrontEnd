import ListServices from "../../../components/ListServices/listCostumerServices";
import "./atendimentos.css"
export default function Atendimentos() {
  return (
    <div className="page-config-container">
      <h1 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        Atendimentos
      </h1>
      <ListServices />
    </div>
  );
}
