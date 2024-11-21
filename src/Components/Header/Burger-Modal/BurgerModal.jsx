import "./burger-modal.scss";
import HeaderCTAButton from "../Header-CTA/Header-CTAButton";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

const BurgerModal = ({
  // token,
  onClickAuth,
  onClickSell,
  onClickDisconnect,
  onClickGoToProfile,
}) => {
  const { token } = useContext(AuthContext);
  return (
    <main className="burger-modal">
      <menu>
        <div>
          <HeaderCTAButton onClick={onClickSell}>
            Vends tes articles
          </HeaderCTAButton>
          {!token && (
            <HeaderCTAButton onClick={onClickAuth}>
              S'inscrire | Se connecter
            </HeaderCTAButton>
          )}
        </div>
      </menu>
      {token && (
        <menu>
          <div>
            <h2>Mon compte</h2>
            <ul>
              <div>
                <button onClick={onClickGoToProfile}>Mon profil</button>
              </div>
              <div>
                <button onClick={onClickDisconnect}>Se déconnecter</button>
              </div>
            </ul>
          </div>
          <div>
            <h2>Zone de danger</h2>
            <ul>
              <div>
                <button>Supprimer mon compte</button>
              </div>
            </ul>
          </div>
        </menu>
      )}
    </main>
  );
};

export default BurgerModal;
