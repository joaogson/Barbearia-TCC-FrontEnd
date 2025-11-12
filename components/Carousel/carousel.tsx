import ImagemBarbearia from "../../public/barbearia.png";
import Image from "next/image";

export default function Carousel() {
  return (
    <div className="containerCarousel">
      <Image className="imageCarousel" src={ImagemBarbearia} alt="Carrosel"></Image>
    </div>
  );
}
