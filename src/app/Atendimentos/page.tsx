import ListServices from "../../../components/ListServices/listCostumerServices";

export default function Atendimentos() {
  return (
    <div>
      <h1 
        style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
        }}
      >
        Atendimentos
      </h1>
      <ListServices />
    </div>
  );
}
