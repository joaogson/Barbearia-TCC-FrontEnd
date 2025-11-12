// components/FeedBacks/FeedBackForm/feedBackForm.tsx
"use client";

import "./feedBackForm.css";
import { useState, useEffect } from "react";
import { createFeedback } from "../../../services/feedBackAPI";
import { GetAllBarbers } from "../../../services/barberAPI";
import { Barber } from "../../../types/Barber";

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Estados para carregar e selecionar o barbeiro
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>("");
  const [isLoadingBarbers, setIsLoadingBarbers] = useState(true);

  // 3. Efeito para buscar os barbeiros quando o componente carregar
  useEffect(() => {
    async function loadBarbers() {
      try {
        setIsLoadingBarbers(true);
        const data = await GetAllBarbers();
        setBarbers(data.data);
      } catch (err) {
        setError("Não foi possível carregar a lista de profissionais.");
      } finally {
        setIsLoadingBarbers(false);
      }
    }
    loadBarbers();
  }, []); // [] = Roda apenas uma vez

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBarberId) {
      setError("Por favor, selecione um profissional para avaliar.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Por favor, selecione uma nota.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 4. Envia para a API (SEM clientId)
      await createFeedback({
        rating,
        comment: comment.trim() || undefined,
        barberId: parseInt(selectedBarberId, 10),
      });

      alert("Feedback Enviado com sucesso!");

      // Limpa o formulário
      setComment("");
      setRating(5);
      setSelectedBarberId("");
    } catch (err) {
      console.error(err);
      alert("Não foi possivel enviar o feedBack");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-form-header">
          <h4>Deixe sua avaliação</h4>
        </div>
        {error && <p className="error-message">{error}</p>}

        {/* 5. O <select> para escolher o barbeiro */}
        <div className="form-group">
          <div className="feedback-form-header">
            <label>Profissional</label>
          </div>
          <select value={selectedBarberId} onChange={(e) => setSelectedBarberId(e.target.value)} disabled={isLoadingBarbers}>
            <option value="">{isLoadingBarbers ? "Carregando..." : "Selecione um profissional"}</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.user.name}
              </option>
            ))}
          </select>
        </div>

        {/* ... (O resto do seu formulário: Nota e Comentário) ... */}
        <div className="form-group">
          <div className="feedback-form-header">
            <label>Nota (de 1 a 5)</label>
          </div>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </div>
        <div className="form-group">
          <div className="feedback-form-header">
            <label>Comentário (Opcional)</label>
          </div>
          <textarea
            className="feedback-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Como foi sua experiência?"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </button>
      </form>
    </div>
  );
}
