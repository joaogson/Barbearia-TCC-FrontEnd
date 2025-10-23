"use client";

import { Servicos } from "../../types/Servicos";
import { useEffect, useState } from "react";
import { getService, getServices } from "../../services/servicosAPI";
import "./ListarServicos.css";

interface ServicesListProps {
  onServiceSelect: (service: Servicos[]) => void;
  selectedService: Servicos[];
}

export default function ListarServicos(props: ServicesListProps) {
  const [services, setServices] = useState<Servicos[]>([]);
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

  const handleServicoClick = async (servicoClicado: Servicos) => {
    let novaSelecao: Servicos[];

    const jaSelecionado = props.selectedService.some((s) => s.id === servicoClicado.id);
    if (jaSelecionado) {
      novaSelecao = props.selectedService.filter((s) => s.id != servicoClicado.id);
    } else {
      novaSelecao = [...props.selectedService, servicoClicado];
    }
    props.onServiceSelect(novaSelecao);
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
      <ul className="list">
        {services.map((service) => {
          const isSelected = props.selectedService.some((s) => s.id === service.id);
          return (
            <li
              className={`card ${isSelected ? "selected" : ""}`}
              key={service.id}
              onClick={() => {
                handleServicoClick(service);
              }}
            >
              {service.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
