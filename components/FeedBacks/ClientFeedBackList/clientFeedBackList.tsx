"use client";
import { useState, useEffect } from "react";
import { getMyFeedbacks, deleteFeedback } from "../../../services/feedBackAPI";
import { Feedback } from "../../../types/Feedback";
import "./clientFeedBackList.css"; // Pode reutilizar o CSS

export default function FeedbackList() {
  const [myFeedbacks, setMyFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  if (myFeedbacks.length === 0) return <p>Você ainda não fez nenhuma avaliação.</p>;

  return (
    <div className="feedBack-list-container">
      <h3 className="feedback-title">Minhas Avaliações</h3>
      <ul className="feedBack-list">
        {myFeedbacks.map((fb) => (
          <li key={fb.id} className="feedBack-card">
            <div className="feedBack-header">
              {/* Mostra o nome do barbeiro que ele avaliou */}
              <strong>{fb.barber.user.name}</strong>
              <span>{fb.rating} Estrelas ⭐</span>
            </div>
            {fb.comment && <p className="comment">{fb.comment}</p>}

            <div className="feedBack-actions">
              {/* Ações de Editar (chama o Form) e Excluir */}

              <button onClick={() => handleDelete(fb.id)} className="feedBack-delete-button">
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
