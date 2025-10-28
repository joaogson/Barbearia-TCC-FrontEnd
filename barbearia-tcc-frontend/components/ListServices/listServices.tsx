"use client";
import { useEffect, useState } from "react";
import { costumerService } from "../../types/costumerService";
import { getServiceById } from "../../services/serviceAPI";
import { useAuth } from "../../contexts/AuthContext";

import "./listServices.css";

export default function ListServices() {
  // Estado para a lista inicial de atendimentos vinda da API
  const [costumerServices, setCostumerServices] = useState<costumerService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // 1. PRIMEIRO EFEITO: Busca a lista principal de atendimentos
  // Você só precisa de UM useEffect
  useEffect(() => {
    console.log("Usuário atual: ", user);
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await getServiceById();
        console.log("Resposta dos atendimentos: ", response);
        if (response && Array.isArray(response.data)) {
          setCostumerServices(response.data);
        } else {
          setCostumerServices([]); // Garante que seja sempre um array
        }
      } catch (error) {
        console.error("Erro ao buscar atendimentos ", error);
        setError("Não foi possível carregar a lista de atendimentos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <p>Carregando atendimentos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (costumerServices.length === 0) {
    return <p>Não existem atendimentos</p>;
  }

  // 3. RENDERIZAÇÃO: Mapeia a lista JÁ FORMATADA
  return (
    <>
      <h1>Atendimentos de {user?.name}</h1>
      <div className="atendimentos-container">
        <ul className="list">
          {costumerServices.map((service) => {
            const serviceDate = new Date(service.ServiceTime);

            return (
              <>
                <div className="card-list">
                  <li key={service.id} className="card">
                    <div className="title">
                      <h3>Atendimento: {service.id}</h3>
                    </div>
                    <div className="card-details">
                      <p className="barber">Barbeiro: {service.barber.user.name}</p>
                      <p className="client">Cliente: {service.client.user.name}</p>
                      <div className="date-container">
                        <p className="data">Data: {new Date(service.ServiceTime).toLocaleDateString()}</p>
                        <p className="horario">
                          <strong>Horário:</strong>{" "}
                          {serviceDate.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="services-container">
                        <p>
                          <strong>Serviços realizados:</strong>
                        </p>
                        <ul className="services-list">
                          {service.Services.map(
                            (servicoDetalhe) => (
                              console.log("Serviço detalhe: ", servicoDetalhe.service.description),
                              (<li key={servicoDetalhe.service.id}>{servicoDetalhe.service.description}</li>)
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
