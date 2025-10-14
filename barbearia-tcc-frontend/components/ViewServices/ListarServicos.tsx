"use client";

import { Servicos } from "@/app/lib/types/Servicos";
import { useEffect, useState } from "react";
import { getService, getServices } from "@/app/lib/types/servicosAPI";
import "./ListarServicos.css";

interface ServicesListProps {
  onServiceSelect: (service: Servicos) => void;
}

export default function ListarServicos(props: ServicesListProps) {
  const [services, setServices] = useState<Servicos[]>([]);
  const [service, setService] = useState<Servicos>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getServices();
      setServices(response.data);
      console.log(response.status);
    } catch (error) {
      console.error("Erro ao buscar serviços ", error);
      setError("Não foi possivel carregar a lista de serviços");
    } finally {
      setIsLoading(false);
    }
  };

  const handleServicoClick = async (id: number) => {
    const response = await getService(id);
    setService(response.data);
    props.onServiceSelect(response.data);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  if (isLoading) {
    return <p> Carregando Serviços...</p>;
  }
  if (error) {
    return <p> Erro ao buscar serviços </p>;
  }
  if (services.length < 1) {
    return <p> Nenhum serviço encontrado</p>;
  }

  return (
    <div className="ServicesList">
      <h2 className="Title">Lista de Serviços</h2>
      <ul className="list">
        {services.map((services) => (
          <li
            className="card"
            key={services.id}
            onClick={() => {
              handleServicoClick(services.id);
            }}
          >
            {services.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
