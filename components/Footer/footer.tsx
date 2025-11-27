import Link from "next/link";
import "./footer.css";
// 1. Importe os ícones que você acabou de instalar
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-containter">
        {/* Bloco 1: Localização */}
        <div className="footer-block">
          <h3>Onde estamos</h3>
          <p>Avenida Y, XXX</p>
        </div>

        {/* Bloco 2: Contato */}
        <div className="footer-block">
          <h3>Contato</h3>

          {/* Sub-bloco Instagram */}
          <p>Instagram</p>
          <div className="footer-contact-item">
            <FaInstagram /> {/* <-- Ícone aqui */}
            <Link href="https://www.instagram.com/mrguapo_barber">Barbearia X</Link>
          </div>

          {/* Sub-bloco WhatsApp */}
          <p>WhatsApp</p>
          <div className="footer-contact-item">
            <FaWhatsapp /> {/* <-- Ícone aqui */}
            {/* Usamos <p> pois não é um link clicável */}
            <Link href="https://wa.me/+5542999587153" target="_blank" className="whatsapp-number">
              42999999999
            </Link>
          </div>
        </div>
      </div>

      <p className="rodape"></p>
    </div>
  );
}
