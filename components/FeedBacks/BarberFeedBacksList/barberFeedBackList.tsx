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
        const data = await getFeedbacksForBarber(barberId);
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
  if (feedbacks.length === 0) return <p style={{ color: "3e301b" }}>Este profissional ainda não tem avaliações.</p>;

  return (
    <div className="feedBack-list-container">
      <ul className="feedBack-barber-list">
        {feedbacks.map((fb) => (
          <li key={fb.id} className="feedBack-card">
            {/* Só renderiza o parágrafo se o comentário existir */}
            {fb.comment && <p className="comment">{fb.comment}</p>}
            <div className="feedBack-header">
              <strong className="feedback-user">{fb.client.user.name}</strong>
              <div className="feedback-rating">
                {Array(fb.rating).fill(null).map((_, index) => (
                <span key={index}>⭐</span>
                ))}
              </div>

              {/* TODO: Mostrar estrelas */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
