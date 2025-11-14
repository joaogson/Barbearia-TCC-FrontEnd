"use client"; // Se estiver no App Router

import React from "react";
import "./whatsAppButton.css"; // Crie um CSS para ele

interface Props {
  phone: string; // O número já no formato internacional (ex: 5542999998888)
  message?: string; // A mensagem padrão (opcional)
  label: string; // O texto do botão (ex: "Entrar em Contato")
}

export default function WhatsappButton({ phone, message, label }: Props) {
  const phoneFormatted = `+55${phone}`;

  const link = () => {
    let url = `https://wa.me/${phoneFormatted}`;

    if (message) {
      // Codifica a mensagem para que funcione na URL
      const encodedMessage = encodeURIComponent(message);
      url += `?text=${encodedMessage}`;
    }

    return url;
  };

  return (
    <a href={link()} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#547a46", padding: "10px", width:"100%"}}>
      {label}
    </a>
  );
}
