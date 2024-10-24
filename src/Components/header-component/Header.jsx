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
          <svg
            className="header-burger"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.625 11.2518H39.375M5.625 22.5018H39.375M5.625 33.7518H39.375"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
              {/* Navigation : comme ça la modale n'apparaîtra pas avec le fond noir */}
              <Link to={"/"}>
                <HeaderCTAButton onClick={() => setShowMainModal(true)}>
                  S'inscrire | Se connecter
                </HeaderCTAButton>
              </Link>
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
