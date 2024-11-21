import "./header.scss";
import cross from "../../assets/cross.svg";
import vinted from "../../assets/vinted-logo.svg";
import { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
// Components :
import "../Header/Auth-Modals/modals.scss";
import Modals from "../Header/Auth-Modals/Modals.jsx";
import BurgerModal from "../Header/Burger-Modal/BurgerModal.jsx";
import HeaderCTAButton from "../Header/Header-CTA/Header-CTAButton";
import { AuthContext } from "../../contexts/authContext.jsx";

const Header = ({ search, setSearch, userId }) => {
  const [showMainModal, setShowMainModal] = useState(false);
  const [showBurgerModal, setShowBurgerModal] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();
  const { token, handleToken } = useContext(AuthContext);

  const MainModalRoot = document.getElementById("main-modal-root");
  const burgerModalRoot = document.getElementById("burger-modal-root");

  return (
    <header className="header-component">
      <div className="header-container">
        <div>
          <Link to={"/"}>
            <img src={vinted} alt="vinted-logo" />
          </Link>
          <input
            className="big-screen-input search-bar"
            type="text"
            placeholder="&#128270; Rechercher des articles"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {showBurgerModal ? (
            <img
              className="cross-on-small-screen"
              src={cross}
              alt="close-window"
              onClick={() => setShowBurgerModal(!showBurgerModal)}
            />
          ) : (
            <svg
              onClick={() => setShowBurgerModal(!showBurgerModal)}
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
          )}
          {/* -- Pour le responsive, j'affiche une modale lorsque l'utilisateur appuie sur le burger menu -- */}
          {showBurgerModal &&
            createPortal(
              <BurgerModal
                onClickAuth={() => {
                  setShowMainModal(!showMainModal);
                }}
                onClickSell={() => {
                  setShowBurgerModal(!showBurgerModal);
                  navigate("/publish");
                }}
                onClickGoToProfile={() => {
                  setShowBurgerModal(!showBurgerModal);
                  setShowMainModal(!showMainModal);
                  // navigate("/profile");
                  navigate("/");
                }}
                onClickDisconnect={() => {
                  setShowBurgerModal(false);
                  setShowMainModal(false);
                  handleToken(null);
                  navigate("/");
                }}
              />,
              burgerModalRoot
            )}
        </div>

        <nav>
          {token ? (
            <button
              onClick={() => {
                setShowMainModal(!showMainModal);
                // navigate("/");
                navigate(`/user/${userId}`);
              }}
            >
              Mon profil
            </button>
          ) : (
            <div>
              <HeaderCTAButton
                onClick={() => {
                  setShowMainModal(true);
                  navigate("/");
                }}
              >
                S'inscrire | Se connecter
              </HeaderCTAButton>

              {/* -- Modal pour s'inscrire ou se connecter -- */}
              {showMainModal &&
                createPortal(
                  <Modals
                    darkBG={showMainModal}
                    // handleToken={handleToken}
                    onClose={() => {
                      setShowMainModal(false);
                    }}
                  />,
                  MainModalRoot
                )}
            </div>
          )}
          <Link to={"/publish"}>
            <HeaderCTAButton>Vends tes articles</HeaderCTAButton>
          </Link>
        </nav>
      </div>

      {/* -- Si burger modale n'est pas ouverte, je veux afficher en bas du header la barre de recherche pour écrans plus petits --  */}
      {!showBurgerModal && (
        <div className="small-screen-input ">
          <input
            className="search-bar"
            type="text"
            placeholder="Rechercher des articles"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
