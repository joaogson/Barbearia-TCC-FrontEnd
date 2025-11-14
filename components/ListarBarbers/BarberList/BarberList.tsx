"use client";

import { useState, useEffect } from "react";
import { Barber } from "../../../types/Barber"; // Ajuste o caminho
import { GetAllBarbers } from "../../../services/barberAPI"; // Ajuste o caminho
import BarberCard from "../BarberCard/barberCard";
import "./barberList.css";

export default function BarberList() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await GetAllBarbers();
        console.log(data.data);
        setBarbers(data.data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar a lista de barbeiros.");
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
    return <p className="list-error">{error}</p>;
  }

  if (barbers.length === 0) {
    return <p>Nenhum barbeiro cadastrado no momento.</p>;
  }

  return (
    <div className="list-container">
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
    </div>
  );
}
