"use client";

import "./feedBackForm.css";

import { useState } from "react";
import { createFeedback } from "../../../services/feedBackAPI";
// import { StarRating } from './StarRating'; // (Recomendado)

interface Props {
  barberId: number;
  clientId: number;
  //  onSuccess: () => void; // Função para recarregar a lista após o sucesso
}

export default function FeedbackForm({ clientId, barberId }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Por favor, selecione uma nota.");
      return;
    }

    try {
      await createFeedback({ rating, comment, barberId, clientId });
      //  onSuccess(); // Avisa o componente pai que um novo feedback foi criado
      setComment("");
      setRating(5);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao enviar o feedBack");
      console.error(err);
    }
  };

  return (
  <div className="feedback-form-container">
    <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-form-header">
      <h4>Deixe sua avaliação</h4>
        </div>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label>Nota (de 1 a 5)</label>
        {/* Recomendação: Substitua este 'select' por um componente visual de estrelas */}
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={5}>5 Estrelas</option>
          <option value={4}>4 Estrelas</option>
          <option value={3}>3 Estrelas</option>
          <option value={2}>2 Estrelas</option>
          <option value={1}>1 Estrela</option>
        </select>
      </div>
        <div className="feedback-form-header">
          <label>Comentário (Opcional)</label>
        </div>
      <div className="form-group">
        <textarea className="feedback-comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Como foi sua experiência?" />
      </div>
      <button type="submit">Enviar Avaliação</button>
    </form>
  </div>
  );
}
