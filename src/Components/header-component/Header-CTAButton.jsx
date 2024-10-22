import "./header-CTA-button.scss";

const HeaderCTAButton = ({ onDisconnect, children }) => {
  return (
    <button
      onClick={onDisconnect}
      className={
        "header-CTA-button " +
        (children === "S'inscrire" || children === "Se connecter"
          ? "green"
          : children === "Se déconnecter"
          ? "disconnect"
          : children === "Vends tes articles" && "sell")
      }
    >
      {children}
    </button>
  );
};

export default HeaderCTAButton;
