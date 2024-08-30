import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  ////// À utiliser si je veux essayer le bonus ?
  // const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [sellArticle, setSellArticle] = useState(false);
  // const [display, setDisplay] = useState(false);

  return (
    <header className="container">
      <img src="\src\assets\logo-vinted.png" />
      <div>
        {token ? (
          <>
            <p>Bienvenue sur Vinted</p>
            {/* Gérer la déconnexion */}
            <button
              className="red"
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="green">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="green">Se connecter</button>
            </Link>
          </>
        )}
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
