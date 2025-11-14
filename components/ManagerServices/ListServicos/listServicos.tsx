"use client";

import { Service } from "../../../types/Service";
import { useEffect, useState } from "react";
import { getServices } from "../../../services/serviceAPI";
import "./listServicos.css";

export default function ServiceList() {
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
    <div className="services-container">
      <ul className="list-servicos">
        {services.map((service) => {
          return (
            <li className="service-card" key={service.id}>
              <p className="service-id">{service.id}</p>
              <div className="service-card-content">
                <p className="service-description">{service.description}</p>
                <div className="service-duration-container">
                  <p className="service-duration">{service.duration}</p>
                  <span>min</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
