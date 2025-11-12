"use client";
import Image from "next/image";
import ImagemBarbeariaLogo from "../../public/barbearia.png";
import ListarServicos from "components/ManagerServices/ListServicosSelection/ListarServicos";

export default function Home() {
  return (
    <div className="home" style={{ color: "#3E301B", fontSize: "1.6rem" }}>
      {" "}
      <h2 style={{ borderBottom: "3px solid #3e301b", width: "70%", textAlign: "start", color: "#3e301b", fontSize: "2rem", marginTop: "25px" }}>
        <Image className="Image" style={{ width: "95%", textAlign: "center" }} src={ImagemBarbeariaLogo} alt="Header logo"></Image>
      </h2>
    </div>
  );
}
