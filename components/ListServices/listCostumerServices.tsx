"use client";
import { useEffect, useState } from "react";
import { costumerService } from "../../types/costumerService";
import { cancelCostumerService, getCostumerServiceById } from "../../services/costumerServiceAPI";
import { useAuth } from "../../contexts/AuthContext";

import "./listServices.css";
import Link from "next/link";

export default function ListServices() {
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
          setCostumerServices([]);
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
    return <p className="erro-service">{error}</p>;
  }

  if (costumerServices.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="sem-atendimentos-service">Não existem atendimentos</p>;
        <button style={{ backgroundColor: "#547a46", padding: "10px", boxShadow: "5px 5px 5px rgba(0,0,0,0.5)" }}>
          <Link href="/AgendeSeuHorario"> Agendar Horario </Link>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="costumer-services-container-service">
        <h1>Seus Atendimentos</h1>
        <ul className="atendimentos-list-service">
          {costumerServices.map((service) => {
            const serviceDate = service.ServiceTime ? new Date(service.ServiceTime) : null;
            const isDateValid = serviceDate && !isNaN(serviceDate.getTime());

            return (
              <li key={service.id} className="card-service">
                <div className="card-header-service">
                  <h3 className="card-title-service">Atendimento {service.id}</h3>
                </div>

                <div className="details-grid-service">
                  <div className="detail-block-service">
                    <div className="detail-title-service">Barbeiro</div>
                    <p className="detail-content-service">{service.barber.user.name}</p>
                  </div>

                  <div className="detail-block-service">
                    <div className="detail-title-service">Cliente</div>
                    <p className="detail-content-service">{service.client.user.name}</p>
                  </div>

                  <div className="detail-block-service">
                    <div className="detail-title-service">Data</div>
                    <p className="detail-content-service">{isDateValid ? serviceDate.toLocaleDateString("pt-BR") : "N/A"}</p>
                  </div>

                  <div className="detail-block-service">
                    <div className="detail-title-service">Horário</div>
                    <p className="detail-content-service">
                      {isDateValid
                        ? serviceDate.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                  </div>

                  <div className="detail-block-service full-width-block-service">
                    <div className="detail-title-service">Serviços Realizados</div>
                    <div className="detail-content-service">
                      <ul className="services-list-service">
                        {service.Services.map((servicoDetalhe) => (
                          <li className="detail-service" key={servicoDetalhe.service.id}>
                            {servicoDetalhe.service.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <button className="cancel-button-service" onClick={() => handleCancel(service.id)}>
                  Cancelar Atendimento
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
