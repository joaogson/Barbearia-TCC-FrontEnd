import EditarPerfil from "../../../../components/Perfil/editarPerfil";

export default function PageEditarPerfil() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        Editar Perfil
      </h1>
      <EditarPerfil />
    </div>
  );
}
