"use client";
import { useState, useEffect } from "react";
import { getFeedbacksForBarber } from "../../../services/feedBackAPI";
import { Feedback } from "../../../types/Feedback";
import "./barberFeedBackList.css";

interface Props {
  barberId: number;
}

export default function BarberFeedbackList({ barberId }: Props) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setIsLoading(true);
        const data = await getFeedbacksForBarber();
        setFeedbacks(data);
      } catch (error) {
        console.error("Falha ao carregar feedbacks", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeedbacks();
  }, [barberId]);

  if (isLoading) return <p>Carregando avaliações...</p>;
  if (feedbacks.length === 0) return <p>Este profissional ainda não tem avaliações.</p>;

  return (
    <div className="feedBack-list-container">
      <ul className="feedBack-list">
        {feedbacks.map((fb) => (
          <li key={fb.id} className="feedBack-card">
            <div className="feedBack-header">
              <strong>{fb.client.user.name}</strong>
              <span>{fb.rating} Estrelas ⭐</span> {/* TODO: Mostrar estrelas */}
            </div>
            {/* Só renderiza o parágrafo se o comentário existir */}
            {fb.comment && <p className="comment">{fb.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
