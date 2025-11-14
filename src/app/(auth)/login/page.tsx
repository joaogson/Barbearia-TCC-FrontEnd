"use client";

import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext"; // Ajuste o caminho se necessário

import Login from "../../../../components/Auth/FormLogin/login";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px", paddingBottom: "50px" }}>
      <Login />
    </div>
  );
}
