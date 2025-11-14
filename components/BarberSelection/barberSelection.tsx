"use client";

import { useState, useEffect } from "react";
import { Barber } from "../../types/Barber"; // Ajuste o caminho se necessário
import { GetAllBarbers } from "../../services/barberAPI"; // Ajuste o caminho se necessário
import "./barberSelection.css";
// 1. Definição das Props (O "Contrato" do Componente)
// O componente precisa saber qual barbeiro está selecionado (vem do pai)
// e precisa de uma função para informar o pai quando a seleção mudar.
interface BarberSelectionProps {
  selectedBarberId: number | null;
  onBarberSelect: (id: number | null) => void;
}

export default function BarberSelection({ selectedBarberId, onBarberSelect }: BarberSelectionProps) {
  // 2. Estado Interno
  // O componente gerencia seu próprio estado de carregamento, erro e lista.
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Lógica de Busca de Dados
  // Busca os barbeiros da API assim que o componente é montado.
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await GetAllBarbers();
        setBarbers(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Erro ao carregar barbeiros:", error);
        setError("Não foi possível carregar os profissionais no momento.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBarbers();
  }, []); // O [] vazio garante que isso rode apenas uma vez.

  // 4. Renderização de Estados
  // Lida com todos os cenários possíveis (loading, erro, vazio).
  if (isLoading) {
    return <p>Carregando profissionais...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (barbers.length === 0) {
    return <p>Nenhum profissional encontrado.</p>;
  }

  // 5. Renderização de Sucesso
  // Mapeia a lista de barbeiros e renderiza um <button> para cada um.
  return (
    <div className="list-barber-container">
      {barbers.map((barber) => (
        <button
          type="button" // Garante que o botão não envie um formulário
          key={barber.id}
          // Aplica o estilo de "card" e também o estilo "selected" se o ID bater
          className={`list-barber-card${selectedBarberId === barber.id ? "selected" : ""}`}
          // Ao clicar, chama a função 'onBarberSelect' passada pelo pai
          onClick={() => {
            if (selectedBarberId === barber.id) {
              onBarberSelect(null);
            } else {
              onBarberSelect(barber.id);
            }
          }}
        >
          {/* Aqui você pode adicionar a imagem do barbeiro:
            <Image
              src={barber.user.profileImageUrl || '/avatar-padrao.png'}
              alt={barber.user.name}
              width={80}
              height={80}
              className={cardStyles.avatar}
            /> 
          */}
          <p className="card-barber-name">{barber.user?.name || "Barbeiro"}</p>
        </button>
      ))}
    </div>
  );
}
