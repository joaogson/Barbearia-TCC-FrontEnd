"use client";
import ProtectedRoute from "components/ProtectedRoute/protectedRoute";
import ClientFeedbackList from "../../../components/FeedBacks/ClientFeedBackList/clientFeedBackList";
import ListPerfil from "../../../components/Perfil/listPerfil";
import { useAuth } from "../../../contexts/AuthContext";
import "./page-perfil.css";
export default function Perfil() {
  const { user } = useAuth();

  const renderFeedbackSection = () => {
    if (!user) return null;

    switch (user.role) {
      case "CLIENT":
        return (
          <>
            <h2 className="perfil-title">Minhas Avaliações</h2>
            <ClientFeedbackList />
          </>
        );
      case "BARBER":
        return (
          <>
            <h2 className="perfil-title">Avaliações Recebidas</h2>
            <ClientFeedbackList />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute allowedRoles={["BARBER", "CLIENT", "ADMIN"]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2
          style={{
            borderBottom: "3px solid #3e301b",
            width: "80%",
            textAlign: "start",
            color: "#3e301b",
            fontSize: "2rem",
            marginTop: "25px",
          }}
          className="perfil-title"
        >
          Informações do Perfil
        </h2>
        <ListPerfil />
        {renderFeedbackSection()}
      </div>
    </ProtectedRoute>
  );
}
