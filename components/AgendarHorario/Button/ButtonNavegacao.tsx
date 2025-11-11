// components/BotaoNavegacao.js

// O componente recebe 4 props:
// - onClick: A função que será executada quando o botão for clicado.
// - tipo: Define a aparência do botão. Pode ser 'voltar', 'avancar' ou 'confirmar'.
// - disabled: Um valor booleano (true/false) para desabilitar o botão.
// - children: O texto que aparecerá dentro do botão.
import "./button.css";

type BotaoNavegacaoProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  tipo?: "voltar" | "avancar" | "confirmar"; // Prop opcional com valores específicos
  disabled?: boolean; // Prop opcional booleana
  children: React.ReactNode; // Tipo correto para 'children'
};

export default function BotaoNavegacao({ onClick, tipo, disabled = false, children }: BotaoNavegacaoProps) {
  // Lógica para definir o estilo com base no 'tipo' do botão.
  // Isso nos permite ter aparências diferentes para cada ação.
  const getEstiloBase = () => {
    const estiloComum = {
      opacity: disabled ? 0.5 : 1, // Fica semitransparente se estiver desabilitado
    };

    switch (tipo) {
      case "confirmar":
        return { ...estiloComum, backgroundColor: "#3E301B" }; // Verde
      case "voltar":
        return { ...estiloComum, backgroundColor: "#3E301B" }; // Marrom
      case "avancar":
      default:
        return { ...estiloComum, backgroundColor: "#3E301B" }; // Marrom
    }
  };

  return (
    <button className="buttonNavigation" onClick={onClick} disabled={disabled} style={getEstiloBase()}>
      {children}
    </button>
  );
}
