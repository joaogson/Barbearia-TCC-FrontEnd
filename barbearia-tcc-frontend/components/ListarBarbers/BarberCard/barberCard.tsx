import Link from "next/link";
import { Barber } from "../../../types/Barber";
import "./barberCard.css";
// import Image from 'next/image';

interface Props {
  barber: Barber;
}

export default function BarberCard({ barber }: Props) {
  return (
    <Link href={`/agendamento?barberId=${barber.id}`} className="barber-card">
      <h3 className="barber-name">{barber.user?.name || "Barbeiro"}</h3>
      <p className="barber-action">Agendar horário &rarr;</p>
    </Link>
  );
}
