import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import vinted from "../../assets/vinted-logo.svg";
import HeaderCTAButton from "./Header-CTAButton";

const Header = ({ token, handleToken, search, setSearch }) => {
  ////// À utiliser si je veux essayer le bonus avec les modales ?
  // const [signup, setSignup] = useState(false);
  // const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header-component">
      <div className="header-container">
        <div>
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
        </div>
        <nav>
          {token ? (
            <>
              <p>Bienvenue sur Vinted</p>
              {/* Gérer la déconnexion */}
              {/* <button
                className="disconnect"
                onClick={() => {
                  handleToken(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </button> */}
              <HeaderCTAButton
                onDisconnect={() => {
                  handleToken(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </HeaderCTAButton>
            </>
          ) : (
            <>
              <Link to="/signup">
                {/* <button className="green">S'inscrire</button> */}
                <HeaderCTAButton>S'inscrire</HeaderCTAButton>
              </Link>
              <Link to="/login">
                {/* <button className="green">Se connecter</button> */}
                <HeaderCTAButton>Se connecter</HeaderCTAButton>
              </Link>
            </>
          )}
          <Link to={"/publish"}>
            {/* <button className="sell">Vends maintenant</button> */}
            <HeaderCTAButton>Vends tes articles</HeaderCTAButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
