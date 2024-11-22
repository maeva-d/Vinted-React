import "./header.scss";
import cross from "../../../assets/cross.svg";
import burger from "../../../assets/burger-menu.svg";
import vinted from "../../../assets/vinted-logo.svg";
import { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
// Components :
import Modals from "../../Auth-Modals/Main-Modal-Structure/Modals.jsx";
import BurgerModal from "../Burger-Modal/BurgerModal.jsx";
import SearchBar from "../Search-Bar/SearchBar.jsx";
import HeaderCTAButton from "../Header-CTA/Header-CTAButton.jsx";
import { AuthContext } from "../../../contexts/authContext.jsx";

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
          <div className="big-screen-input">
            <SearchBar
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {showBurgerModal ? (
            <img
              className="close-burger-menu"
              src={cross}
              alt="close-window"
              onClick={() => setShowBurgerModal(!showBurgerModal)}
            />
          ) : (
            <img
              className="burger-menu"
              src={burger}
              alt="menu"
              onClick={() => setShowBurgerModal(!showBurgerModal)}
            />
          )}
        </div>
        <nav>
          {token ? (
            <Link to={`/user/${userId}`}>
              <HeaderCTAButton>Mon profil</HeaderCTAButton>
            </Link>
          ) : (
            <HeaderCTAButton
              onClick={() => {
                setShowMainModal(true);
                navigate("/");
              }}
            >
              S'inscrire | Se connecter
            </HeaderCTAButton>
          )}
          <Link to={"/publish"}>
            <HeaderCTAButton>Vends tes articles</HeaderCTAButton>
          </Link>
        </nav>
      </div>

      {!showBurgerModal ? (
        <div className="small-screen-input ">
          <SearchBar
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      ) : (
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
              alert("Déconnexion réussie");
            }}
          />,
          burgerModalRoot
        )
      )}

      {showMainModal & !token
        ? createPortal(
            <Modals
              darkBG={true}
              onClose={() => {
                setShowMainModal(false);
              }}
            />,
            MainModalRoot
          )
        : null}
    </header>
  );
};

export default Header;
