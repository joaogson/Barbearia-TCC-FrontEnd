"use client";

import { useState, FormEvent } from "react";
// import { useAuth } from '@/contexts/AuthContext'; // Descomente quando tiver a função register
import Link from "next/link";
import Register from "../../../../components/Auth/FormRegister/register";

export default function RegisterPage() {
    return(
      <div  style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px", paddingBottom: "50px" }}>
        <Register/>

      </div>
    )
  
}
