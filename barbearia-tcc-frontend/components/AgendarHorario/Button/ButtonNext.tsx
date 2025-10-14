// components/BotaoNavegacao.js

// O componente recebe 4 props:
// - onClick: A função que será executada quando o botão for clicado.
// - tipo: Define a aparência do botão. Pode ser 'voltar', 'avancar' ou 'confirmar'.
// - disabled: Um valor booleano (true/false) para desabilitar o botão.
// - children: O texto que aparecerá dentro do botão.
type BotaoNavegacaoProps = {
  onClick: () => void;
  tipo?: "voltar" | "avancar" | "confirmar"; // Prop opcional com valores específicos
  disabled?: boolean; // Prop opcional booleana
  children: React.ReactNode; // Tipo correto para 'children'
};

export default function BotaoNavegacao({ onClick, tipo = "avancar", disabled = false, children }: BotaoNavegacaoProps) {
  // Lógica para definir o estilo com base no 'tipo' do botão.
  // Isso nos permite ter aparências diferentes para cada ação.
  const getEstiloBase = () => {
    const estiloComum = {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      color: "white",
      margin: "0 5px",
      opacity: disabled ? 0.5 : 1, // Fica semitransparente se estiver desabilitado
    };

    switch (tipo) {
      case "confirmar":
        return { ...estiloComum, backgroundColor: "#28a745" }; // Verde
      case "voltar":
        return { ...estiloComum, backgroundColor: "#6c757d" }; // Cinza
      case "avancar":
      default:
        return { ...estiloComum, backgroundColor: "#007bff" }; // Azul
    }
  };

  return (
    <button onClick={onClick} disabled={disabled} style={getEstiloBase()}>
      {children}
    </button>
  );
}
