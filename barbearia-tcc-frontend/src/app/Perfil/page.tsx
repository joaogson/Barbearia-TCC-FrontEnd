"use client";
import ListPerfil from "../../../components/Perfil/listPerfil";

export default function Perfil() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start" }}>Informações do Perfil</h2>
        <ListPerfil />
      </div>
    </>
  );
}
