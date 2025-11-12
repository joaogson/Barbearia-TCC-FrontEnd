// components/EditProfileForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getMe, updateUser } from "../../services/UserAPI";
import "./editarPerfil.css";

export default function EditarPerfil() {
  const { user, setUser } = useAuth(); // Para atualizar o contexto global após a edição
  const router = useRouter(); // Hook para redirecionar o usuário

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Começa carregando os dados
  const [isSaving, setIsSaving] = useState(false); // Para o estado de salvamento
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (err) {
        setError("Erro ao carregar os dados do usuário.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const userId = user?.id;
      if (!userId) throw new Error("Usuario não existe");

      const updatedUser = await updateUser(userId, formData);

      setUser(updatedUser.data); // Atualiza o contexto global
      router.push("/Perfil"); // Redireciona para a página de perfil
    } catch (err) {
      setError("Erro ao salvar as alterações.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="edit-form">
        {error && <p className="error-message">{error}</p>}
        <div className="label-input-container">
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="label-input-container">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="label-input-container">
          <label>Celular:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
