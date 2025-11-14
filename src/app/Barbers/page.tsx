import BarberList from "../../../components/ListarBarbers/BarberList/BarberList";
import "./barber.css"

export default function BarbersPage() {
  return (
    <div className="page-config-container">
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
        Barbeiros
      </h1>
      <BarberList />
    </div>
  );
}
