import "./button.css";

type BotaoNavegacaoProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  tipo?: "voltar" | "avancar" | "confirmar";
  disabled?: boolean;
  children: React.ReactNode;
};

export default function BotaoNavegacao({ onClick, tipo, disabled = false, children }: BotaoNavegacaoProps) {
  const getEstiloBase = () => {
    const estiloComum = {
      opacity: disabled ? 0.5 : 1,
    };

    switch (tipo) {
      case "confirmar":
        return { ...estiloComum, backgroundColor: "#3E301B" };
      case "voltar":
        return { ...estiloComum, backgroundColor: "#3E301B" };
      case "avancar":
      default:
        return { ...estiloComum, backgroundColor: "#3E301B" };
    }
  };

  return (
    <button className="buttonNavigation" onClick={onClick} disabled={disabled} style={getEstiloBase()}>
      {children}
    </button>
  );
}
