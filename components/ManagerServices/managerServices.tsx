"use client";

import { useState, useEffect, FormEvent } from "react";
import { getServices, createService, updateService, deleteService } from "../../services/serviceAPI";
import "./managerService.css";
import { Service, CreateServiceDto } from "../../types/Service";

const initialState: CreateServiceDto = { description: "", duration: 0 };

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<CreateServiceDto>(initialState);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca inicial dos serviços (sem mudanças)
  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data.data);
      } catch (error) {
        console.error("Falha ao carregar serviços", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadServices();
  }, []);

  // ✅ Handler de input simplificado, sem 'price'
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  // ✅ Função de edição simplificada, sem 'price'
  const handleEdit = (service: Service) => {
    setEditingServiceId(service.id);
    setFormData({ description: service.description, duration: service.duration });
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
    setFormData(initialState);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este serviço?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Falha ao excluir serviço", error);
      alert("Não foi possível excluir o serviço.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // ✅ Validação simplificada, sem 'price'
    if (!formData.description || formData.duration <= 0) {
      alert("Por favor, preencha a descrição e a duração corretamente.");
      return;
    }

    try {
      if (editingServiceId) {
        // Atualizar
        const updatedService = await updateService(editingServiceId, formData);
        setServices((prev) => prev.map((s) => (s.id === editingServiceId ? updatedService : s)));
      } else {
        // Criar
        const newService = await createService(formData);
        setServices((prev) => [...prev, newService].sort((a, b) => a.description.localeCompare(b.description)));
      }
      handleCancelEdit(); // Limpa o formulário
    } catch (error) {
      console.error("Falha ao salvar o serviço", error);
      alert("Não foi possível salvar o serviço.");
    }
  };

  return (
    <>
      <div className="services-container">
        <div className="services-form-container">
          <h2 className="services-title">Gerenciar Serviços</h2>
          <form onSubmit={handleSubmit} className="services-form">
            <label htmlFor="description">{editingServiceId ? "Editar Serviço" : "Adicionar Novo Serviço"}</label>
            <input id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Descrição" />
            <label htmlFor="duration">Duração</label>
            <input id="duration" name="duration" value={formData.duration} onChange={handleInputChange} type="number" />
            <div className="services-button">
              <button className="button-services" type="submit">
                {editingServiceId ? "Salvar Alterações" : "Adicionar Serviço"}
              </button>
              {editingServiceId && (
                <button className="button-services" type="button" onClick={handleCancelEdit}>
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="services-list-container">
          <h3>Serviços Cadastrados</h3>
          <div className="services-list">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="services-ul">
                {services.map((service) => (
                  <li key={service.id}>
                    {/* ✅ Exibição da lista simplificada, sem 'price' */}
                    <div className="services-details">
                      <div className="services-text">
                        <span>{service.description}</span>
                        <span> - {service.duration} min</span>
                      </div>
                      <div className="list-buttons">
                        <button onClick={() => handleEdit(service)}>Editar</button>
                        <button onClick={() => handleDelete(service.id)}>Remover</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
