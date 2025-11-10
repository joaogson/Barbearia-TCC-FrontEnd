import Link from "next/link";
import { Barber } from "../../../types/Barber";
import "./barberCard.css";
import WhatsappButton from "../../whatsAppButton/whatsAppbutton";
// import Image from 'next/image';

interface Props {
  barber: Barber;
}

export default function BarberCard({ barber }: Props) {
  return (
    <div className="barber-card">
      <div className="barber-content">
        <WhatsappButton phone={barber.user?.phone} label="Entrar em contato" message="Opa!" />
        <div className="info-section">
          <div className="barber-block">
            <p className="barber-header">Barbeiro</p>
            <p className="barber-label">{barber.user?.name || "Barbeiro"}</p>
          </div>
          <div className="barber-block">
            <p className="barber-header">Celular</p>
            <p className="barber-label">{barber.user?.phone || ""}</p>
          </div>
          <div className="barber-block">
            <p className="barber-header">Email</p>
            <p className="barber-label">{barber.user?.email || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
