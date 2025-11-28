"use client";

import { useState, useEffect } from "react";
import { Barber } from "../../types/Barber"; 
import { GetAllBarbers } from "../../services/barberAPI"; 
import "./barberSelection.css";

interface BarberSelectionProps {
  selectedBarberId: number | null;
  onBarberSelect: (id: number | null) => void;
}

export default function BarberSelection({ selectedBarberId, onBarberSelect }: BarberSelectionProps) {

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  if (isLoading) {
    return <p>Carregando profissionais...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (barbers.length === 0) {
    return <p>Nenhum profissional encontrado.</p>;
  }

  return (
    <div id="list-barber" className="list-barber-container">
      {barbers.map((barber) => (
        <button
          type="button"
          key={barber.id}
          className={`list-barber-card ${selectedBarberId === barber.id ? "selected" : ""}`}
          onClick={() => {
            if (selectedBarberId === barber.id) {
              onBarberSelect(null);
            } else {
              onBarberSelect(barber.id);
            }
          }}
        >
          <p className="card-barber-name">{barber.user?.name || "Barbeiro"}</p>
        </button>
      ))}
    </div>
  );
}
