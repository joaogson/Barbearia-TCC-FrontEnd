"use client";

import { Barber } from "@/app/lib/types/Barber";
import { useEffect, useState } from "react";
import { getBarbers } from "@/app/lib/types/barberAPI";
import "./ServicesList";

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
      console.log(response.status);
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
    <div className="ServicesList">
      <h2 className="Title">Lista de barbeiros</h2>
      <ul className="list">
        {barbers.map((barber) => (
          <li className="card" key={barber.id}>
            <strong>Nome:</strong> {barber.name}
            <strong>Email: </strong> {barber.email}
            <strong>Cellphone:</strong> {barber.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
