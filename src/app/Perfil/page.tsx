"use client";
import FeedbackList from "components/FeedBacks/ClientFeedBackList/clientFeedBackList";
import ListPerfil from "../../../components/Perfil/listPerfil";

export default function Perfil() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
          Informações do Perfil
        </h2>
        <ListPerfil />
        <FeedbackList />
      </div>
    </>
  );
}
