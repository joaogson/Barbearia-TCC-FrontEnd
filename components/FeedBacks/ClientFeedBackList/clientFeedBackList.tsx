"use client";
import { useState, useEffect } from "react";
import { getMyFeedbacks, deleteFeedback } from "../../../services/feedBackAPI";
import { Feedback } from "../../../types/Feedback";
import "./clientFeedBackList.css"; // Pode reutilizar o CSS
import { useAuth } from "contexts/AuthContext";

export default function FeedbackList() {
  const [myFeedbacks, setMyFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadMyFeedbacks();
  }, []);

  const loadMyFeedbacks = async () => {
    try {
      setIsLoading(true);
      const data = await getMyFeedbacks();
      setMyFeedbacks(data);
    } catch (error) {
      console.error("Falha ao carregar meus feedbacks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (feedbackId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
      return;
    }
    try {
      await deleteFeedback(feedbackId);

      setMyFeedbacks((prev) => prev.filter((fb) => fb.id !== feedbackId));
    } catch (error) {
      console.error(error);
      alert("Falha ao excluir. Tente novamente.");
    }
  };

  if (isLoading) return <p>Carregando suas avaliações...</p>;
  if (myFeedbacks.length === 0) return <p style={{ color: "#3e301b" }}>Você ainda não fez nenhuma avaliação.</p>;

  return (
    <div className="feedBack-list-container">
      <ul className="feedBack-list">
        {myFeedbacks.map((fb) => (
          <li key={fb.id} className="feedBack-card">
            {/* Só renderiza o parágrafo se o comentário existir */}
            {fb.comment && <p className="comment">{`"${fb.comment}"`}</p>}
            <div className="feedBack-header">
              <strong className="feedback-user">{user?.role === "CLIENT" ? fb.barber.user.name : fb.client.user.name}</strong>
              <div className="feedback-rating">
                {Array(fb.rating).fill(null).map((_, index) => (
                <span key={index}>⭐</span>
                ))}
              </div>
              

              {/* TODO: Mostrar estrelas */}
            </div>
            <button onClick={() => handleDelete(fb.id)} className="feedBack-delete-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
