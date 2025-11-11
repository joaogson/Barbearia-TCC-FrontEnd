"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("VERCEL ESTÁ USANDO ESTA URL DE API:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  return (
    <div className="home" style={{ color: "#3E301B", fontSize: "1.6rem" }}>
      {" "}
      <h2 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        INICIO
      </h2>
    </div>
  );
}
