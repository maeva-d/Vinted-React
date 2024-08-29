import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  ////// À utiliser si je veux essayer le bonus ?
  // const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [sellArticle, setSellArticle] = useState(false);
  // const [display, setDisplay] = useState(false);

  const navigate = useNavigate();

  const userWantsToDisconnect = () => {
    Cookies.remove("Authentification token");
  };

  return (
    <header className="container">
      <img src="\src\assets\logo-vinted.png" />
      <div>
        {console.log(Cookies.get("Authentification token"))}
        {Cookies.get("Authentification token") ? (
          <>
            <p>Bienvenue sur Vinted</p>
            <button className="red" onClick={userWantsToDisconnect}>
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button className="green" onClick={() => navigate("/Signup")}>
              S'inscrire
            </button>
            <button className="green">Se connecter</button>
          </>
        )}
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
