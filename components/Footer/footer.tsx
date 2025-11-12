
import Link from "next/link"
import "./Footer.css"

export default function Footer(){

    

    return(
    <div className="footer">
        <div className="footer-containter">
            <div className="footer-block">
                <h3>Onde estamos</h3>
                <p>Avenida Manoel Ribas, XXX</p>
                </div>    
            <div className="footer-block">
                <h3>Contato</h3>
                <p>Instagram</p>
                <Link href="https://www.instagram.com/mrguapo_barber">MrGuapo</Link>
                <p>WhatsApp</p>
                <p>42987654321</p>
            </div>
        </div>
            <p className="rodape">Criado por Joao Gabriel Menegassio Sonalio</p>
    </div>
    )
}