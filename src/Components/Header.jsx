import "./header.scss";
import vinted from "../assets/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, handleToken, search, setSearch }) => {
  ////// À utiliser si je veux essayer le bonus avec les modales ?
  // const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <img src={vinted} alt="vinted-logo" />
        </Link>
        <input
          type="text"
          placeholder="Rechercher des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <nav>
          {token ? (
            <>
              <p>Bienvenue sur Vinted</p>
              {/* Gérer la déconnexion */}
              <button
                className="red"
                onClick={() => {
                  handleToken(null);
                  navigate("/");
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
          <Link to={"/publish"}>
            <button className="sell">Vends maintenant</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
