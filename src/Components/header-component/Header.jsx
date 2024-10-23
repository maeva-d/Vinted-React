import "./header.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import vinted from "../../assets/vinted-logo.svg";
// Components :
import HeaderCTAButton from "./Header-CTAButton";
import MainModal from "./MainModal";

const Header = ({ token, handleToken, search, setSearch }) => {
  // const [login, setLogin] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);
  const navigate = useNavigate();

  const MainModalRoot = document.getElementById("main-modal-root");

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
              <HeaderCTAButton
                onClick={() => {
                  handleToken(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </HeaderCTAButton>
            </>
          ) : (
            <>
              {/* <Link to="/Main"> */}
              {/* <button className="green">S'inscrire</button> */}
              <HeaderCTAButton onClick={() => setShowMainModal(true)}>
                S'inscrire | Se connecter
              </HeaderCTAButton>
              {/* </Link> */}
              {/* <Link to="/login"> */}
              {/* <button className="green">Se connecter</button> */}
              {/* <HeaderCTAButton>Se connecter</HeaderCTAButton> */}
              {/* </Link> */}
              {showMainModal &&
                createPortal(
                  <MainModal
                    onClose={() => {
                      setShowMainModal(false);
                    }}
                  />,
                  MainModalRoot
                )}
              {/* } */}
            </>
          )}
          <Link to={"/publish"}>
            <HeaderCTAButton>Vends tes articles</HeaderCTAButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
