import Image from "next/image";
import ImagemBarbeariaLogo from "../../public/barbearia.png";
import "./Header.css";
export default function Header() {
  return (
    <div className="headerContainer">
      <Image className="headerImage" src={ImagemBarbeariaLogo} alt="Header logo"></Image>
    </div>
  );
}
