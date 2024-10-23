import "./header.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import vinted from "../../assets/vinted-logo.svg";
// Components :
import HeaderCTAButton from "./Header-CTAButton";
import Modals from "./Modals";
import "./modals.scss";

const Header = ({ token, handleToken, search, setSearch }) => {
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
              <HeaderCTAButton onClick={() => setShowMainModal(true)}>
                S'inscrire | Se connecter
              </HeaderCTAButton>
              {showMainModal &&
                createPortal(
                  <Modals
                    darkBG={showMainModal}
                    handleToken={handleToken}
                    onClose={() => {
                      setShowMainModal(false);
                    }}
                  />,
                  MainModalRoot
                )}
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
