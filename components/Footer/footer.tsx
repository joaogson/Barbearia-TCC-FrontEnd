import Link from "next/link";
import "./footer.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-containter">
        <div className="footer-block">
          <h3>Onde estamos</h3>
          <p>Avenida Manoel Ribas, 219</p>
        </div>

        <div className="footer-block">
          <h3>Contato</h3>

          <p>Instagram</p>
          <div className="footer-contact-item">
            <FaInstagram />
            <Link href="https://www.instagram.com/mrguapo_barber">MrGuapo</Link>
          </div>

          <p>WhatsApp</p>
          <div className="footer-contact-item">
            <FaWhatsapp />
            <Link href="https://wa.me/+5542999587153" target="_blank" className="whatsapp-number">
              42999587153
            </Link>
          </div>
        </div>
      </div>

      <p className="rodape">Criado por Joao Gabriel Menegassio Sonalio</p>
    </div>
  );
}
