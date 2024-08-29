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

  return (
    <header className="container">
      <img src="\src\assets\logo-vinted.png" />
      <div>
        <button className="green" onClick={() => navigate("/Signup")}>
          S'inscrire
        </button>
        {Cookies.get("Authentification token") ? (
          <button className="red">Se déconnecter</button>
        ) : (
          <button className="green">Se connecter</button>
        )}
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
