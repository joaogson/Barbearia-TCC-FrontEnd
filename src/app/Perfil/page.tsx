"use client";
import BarberFeedbackList from "../../../components/FeedBacks/BarberFeedBacksList/barberFeedBackList";
import ClientFeedbackList from "../../../components/FeedBacks/ClientFeedBackList/clientFeedBackList";
import ListPerfil from "../../../components/Perfil/listPerfil";
import { useAuth } from "../../../contexts/AuthContext";
import "./page-perfil.css";
export default function Perfil() {
  const { user } = useAuth();

  const renderFeedbackSection = () => {
    if (!user) return null; // Não renderiza nada se o usuário não estiver carregado

    switch (user.role) {
      case "CLIENT":
        // Se for cliente, mostra os feedbacks que ele FEZ
        return (
          <>
            <h2 className="feedback-title">Minhas Avaliações</h2>
            <ClientFeedbackList user={user.name} />
          </>
        );
      case "BARBER":
        // Se for barbeiro, mostra os feedbacks que ele RECEBEU
        return (
          <>
            <h2 className="feedback-title">Avaliações Recebidas</h2>
            <ClientFeedbackList/>
          </>
        );
      default:
        // Se for admin ou outro tipo, não mostra nada
        return null;
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 className="perfil-title">Informações do Perfil</h2>
        <ListPerfil />

        {/* 3. Chama a função de renderização condicional */}
        {renderFeedbackSection()}
      </div>
    </>
  );
}
