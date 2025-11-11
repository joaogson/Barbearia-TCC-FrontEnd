"use client";

import "./feedBackForm.css";
import { useState, useEffect } from "react";
import { createFeedback } from "../../../services/feedBackAPI";

// Importe a função e o tipo que já criamos para buscar barbeiros
import { GetAllBarbers } from "../../../services/barberAPI";
import { Barber } from "../../../types/Barber";

interface Props {
  // A 'onSuccess' é uma boa prática para o componente pai
  // saber quando recarregar a lista de feedbacks.
  onSuccess?: () => void;
}

// Removemos 'barberId' e 'clientId' das props.
// O componente agora gerencia a seleção de barbeiro
// e o backend gerencia a identificação do cliente.
export default function FeedbackForm({ onSuccess }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Novos estados para selecionar o barbeiro ---
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>(""); // ID do barbeiro selecionado
  const [isLoadingBarbers, setIsLoadingBarbers] = useState(true);

  // --- Efeito para buscar os barbeiros ---
  useEffect(() => {
    async function loadBarbers() {
      try {
        setIsLoadingBarbers(true);
        const data = await GetAllBarbers(); // Sua API que busca barbeiros
        console.log(data);
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

    // --- Novas validações ---
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
      // --- Lógica de Criação ATUALIZADA ---
      // Não enviamos mais o 'clientId'.
      // O backend deve identificar o cliente pelo token de autenticação.
      await createFeedback({
        rating,
        comment: comment.trim() || undefined, // Envia 'undefined' se o comentário estiver vazio
        barberId: parseInt(selectedBarberId, 10),
      });

      alert("Feedback Enviado com sucesso!");

      // Chama a função de sucesso (se ela existir)
      if (onSuccess) {
        onSuccess();
      }

      // Limpa o formulário
      setComment("");
      setRating(5);
      setSelectedBarberId("");
      setError("");
    } catch (err) {
      // Pega o erro do backend (ex: "Você já avaliou este barbeiro")
      //setError(err?.response?.data?.message || "Ocorreu um erro ao enviar o feedback.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        {error && <p className="error-message">{error}</p>}

        {/* --- NOVO CAMPO: SELEÇÃO DE BARBEIRO --- */}
        <div className="form-group">
          <label>Profissional</label>
          <select value={selectedBarberId} onChange={(e) => setSelectedBarberId(e.target.value)} disabled={isLoadingBarbers}>
            <option value="">{isLoadingBarbers ? "Carregando..." : "Selecione um profissional"}</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nota (de 1 a 5)</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </div>

        <div className="feedback-form-header">
          <label>Comentário (Opcional)</label>
        </div>
        <div className="form-group">
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
