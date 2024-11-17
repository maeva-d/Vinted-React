import "./header-CTA-button.scss";

const HeaderCTAButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={
        "header-CTA-button " +
        (children === "S'inscrire | Se connecter"
          ? "green"
          : children === "Mon profil"
          ? "my-profile"
          : children === "Vends tes articles" && "sell")
      }
    >
      {children}
    </button>
  );
};

export default HeaderCTAButton;
