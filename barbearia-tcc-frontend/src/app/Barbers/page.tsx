import BarberList from "../../../components/ListarBarbers/BarberList/BarberList";

export default function BarbersPage() {
  return (
    <div>
      <h1 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        Barbeiros
      </h1>
      <BarberList />
    </div>
  );
}
