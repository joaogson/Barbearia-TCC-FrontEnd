"use client";
import Image from "next/image";
import ImagemBarbeariaLogo from "../../public/barbearia.png";

import "./inicio.css";
import BarberFeedbackList from "components/FeedBacks/BarberFeedBacksList/barberFeedBackList";
export default function Home() {
  return (
    <div className="home" style={{ color: "#3E301B", fontSize: "1.6rem" }}>
      {" "}
      <h2
        style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        Inicio
      </h2>
      <Image className="image" src={ImagemBarbeariaLogo} alt="Header logo"></Image>

        <div className="feedback-public"> 
            <h2 style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
          marginBottom: "25px",
        }}>Feedbacks dos Clientes</h2>
        <BarberFeedbackList barberId={2}/>

        </div>
    </div>
  );
}
