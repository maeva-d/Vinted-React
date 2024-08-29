import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // À utiliser si je veux essayer le bonus
  // const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [sellArticle, setSellArticle] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="container">
      <img src="\src\assets\logo-vinted.png" />
      <button onClick={() => navigate("/Signup")}>S'inscrire</button>
      <button>Se connecter</button>
      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
