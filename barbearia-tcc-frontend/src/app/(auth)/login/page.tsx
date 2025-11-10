"use client";

import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext"; // Ajuste o caminho se necessário

import Login from "../../../../components/Auth/FormLogin/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px", paddingBottom: "50px" }}>
      <Login />
    </div>
  );
}
