"use client";

import { Service } from "../../../types/Service";
import { useEffect, useState } from "react";
import { getServices } from "../../../services/serviceAPI";
import "./listServicosSelection.css";

interface ServicesListProps {
  onServiceSelect: (service: Service[]) => void;
  selectedService: Service[];
}

export default function ListarServicos(props: ServicesListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getServices();
      console.log("response!!", response);
      setServices(response.data);
      console.log(response.status);
    } catch (error) {
      console.error("Erro ao buscar serviços ", error);
      setError("Não foi possivel carregar a lista de serviços");
    } finally {
      setIsLoading(false);
    }
  };

  const handleServicoClick = async (servicoClicado: Service) => {
    let novaSelecao: Service[];

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
    <div className="list-servicos-selection-grid-container">
      <ul id="list-services" className="list-servicos-selection">
        {services.map((service) => {
          const isSelected = props.selectedService.some((s) => s.id === service.id);
          return (
            <li
              className={`service-card-selection ${isSelected ? "selected" : ""}`}
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
