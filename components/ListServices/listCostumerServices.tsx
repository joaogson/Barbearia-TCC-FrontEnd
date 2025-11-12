"use client";
import { useEffect, useState } from "react";
import { costumerService } from "../../types/costumerService";
import { cancelCostumerService, getCostumerServiceById } from "../../services/costumerServiceAPI";
import { useAuth } from "../../contexts/AuthContext";

import "./listServices.css";

export default function ListServices() {
  // Estado para a lista inicial de atendimentos vinda da API
  const [costumerServices, setCostumerServices] = useState<costumerService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log("Usuário atual: ", user);
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await getCostumerServiceById();
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

  const handleCancel = async (serviceId: number) => {
    if (!window.confirm("Tem certeza que deseja cancelar este atendimento?")) {
      return;
    }

    try {
      await cancelCostumerService(serviceId);

      setCostumerServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));

      alert("Atendimento cancelado com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar atendimento: ", error);
      alert("Não foi possível cancelar o atendimento. Tente novamente.");
    }
  };

  if (isLoading) {
    return <p className="carregando-atendimentos">Carregando atendimentos...</p>;
  }

  if (error) {
    return <p className="erro">{error}</p>;
  }

  if (costumerServices.length === 0) {
    return <p className="sem-atendimentos">Não existem atendimentos</p>;
  }

  // 3. RENDERIZAÇÃO: Mapeia a lista JÁ FORMATADA
  return (
    <>
      <div className="costumer-services-container">
        <h1>Seus Atendimentos</h1>
        <ul className="atendimentos-list">
          {costumerServices.map((service) => {
            const serviceDate = service.ServiceTime ? new Date(service.ServiceTime) : null;
            const isDateValid = serviceDate && !isNaN(serviceDate.getTime());

            return (
              <li key={service.id} className="card">
                <div className="card-header">
                  <h3 className="card-title">Atendimento {service.id}</h3>

                  <button className="cancel-button" onClick={() => handleCancel(service.id)}>
                    Cancelar Atendimento
                  </button>
                </div>

                <div className="details-grid">
                  <div className="detail-block">
                    <div className="detail-title">Barbeiro</div>
                    <p className="detail-content">{service.barber.user.name}</p>
                  </div>

                  <div className="detail-block">
                    <div className="detail-title">Cliente</div>
                    <p className="detail-content">{service.client.user.name}</p>
                  </div>

                  <div className="detail-block">
                    <div className="detail-title">Data</div>
                    <p className="detail-content">{isDateValid ? serviceDate.toLocaleDateString("pt-BR") : "N/A"}</p>
                  </div>

                  <div className="detail-block">
                    <div className="detail-title">Horário</div>
                    <p className="detail-content">
                      {isDateValid
                        ? serviceDate.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                  </div>

                  <div className="detail-block full-width-block">
                    <div className="detail-title">Serviços Realizados</div>
                    <div className="detail-content">
                      <ul className="services-list">
                        {service.Services.map((servicoDetalhe) => (
                          <li className="detail-service" key={servicoDetalhe.service.id}>
                            {servicoDetalhe.service.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
