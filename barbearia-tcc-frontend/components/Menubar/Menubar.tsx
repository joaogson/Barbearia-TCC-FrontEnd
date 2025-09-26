import imagemBarraMenu from "../../public/BarraMenu.svg";
import Image from "next/image";
import "./Menubar.css";

interface MenubarProps {
  toggleSidebar: () => void;
}

export default function Menubar({ toggleSidebar }: MenubarProps) {
  return (
    <div className="menubar">
      <Image className="toggleSidebar" src={imagemBarraMenu} alt="Barra Menu" width={50} height={50} onClick={toggleSidebar} />
      <p className="nomeLocal"> Nome do local</p>
    </div>
  );
}
