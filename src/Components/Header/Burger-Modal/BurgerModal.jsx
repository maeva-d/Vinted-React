import "./burger-modal.scss";
import HeaderCTAButton from "../Header-CTA/Header-CTAButton";

const BurgerModal = ({
  token,
  onClickAuth,
  onClickSell,
  onClickDisconnect,
  onClickGoToProfile,
}) => {
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
      <menu>
        {token && (
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
        )}
      </menu>
    </main>
  );
};

export default BurgerModal;
