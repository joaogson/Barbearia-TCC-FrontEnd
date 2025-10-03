"use client";

import { Barber } from "@/app/lib/types/barber";
import { useEffect, useState } from "react";
import { getBarbers } from "@/app/lib/types/barberAPI";

export default function ServicesList() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarbers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getBarbers();
      setBarbers(response.data);
    } catch (error) {
      console.error("Erro ao buscar barbeiros ", error);
      setError("Não foi possivel carregar a lista de barbeiros");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  if (isLoading) {
    return <p> Carregando Barbeiros...</p>;
  }
  if (error) {
    return <p> Erro ao buscar barbeiros </p>;
  }
  if (setBarbers.length < 1) {
    return <p> Nenhum barbeiro encontrado</p>;
  }

  return (
    <div>
      <h2>Lista de barbeiros</h2>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id}>
            <strong>Nome:</strong> {barber.name}
            <strong>Email: </strong> {barber.email}
            <strong>Cellphone:</strong> {barber.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
