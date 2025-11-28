"use client";

import React from "react";
import "./whatsAppButton.css";

interface Props {
  phone: string;
  message?: string;
  label: string;
  style?: React.CSSProperties;
}

export default function WhatsappButton({ phone, message, label, style }: Props) {
  const phoneFormatted = `+55${phone}`;

  const link = () => {
    let url = `https://wa.me/${phoneFormatted}`;
    if (message) {
      const encodedMessage = encodeURIComponent(message);
      url += `?text=${encodedMessage}`;
    }
    return url;
  };

  return (
    <a
      href={link()}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: "#547a46", padding: "10px", width: "100%", fontWeight: "bold", fontSize: "1rem", textAlign: "center", ...style }}
    >
      {label}
    </a>
  );
}
