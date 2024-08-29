import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [sellArticle, setSellArticle] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="container">
      <img src="\src\assets\logo-vinted.png" />
      <button onClick={() => navigate("/Signup")}>S'inscrire</button>
      <button onClick={setLogin(true)}>Se connecter</button>
      <button onClick={setSellArticle(true)}>Vends tes articles</button>
    </header>
    // {signup ?
    //   <form>

    //   </form>
    // }
  );
};

export default Header;
