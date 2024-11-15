import "./nav-modal.scss";
import { Link } from "react-router-dom";

const BurgerModal = ({ onClickDisconnect, onClickGoToProfile }) => {
  return (
    <main className="burger-modal">
      <menu>
        <div>
          <Link to="/publish">
            <button>Vends tes articles</button>
          </Link>
        </div>
      </menu>
      <menu>
        <div>
          <h2>Mon compte</h2>
          <ul>
            <div>
              {/* <Link to="/profile">Mon profil</Link> */}
              <button onClick={onClickGoToProfile}>Mon profil</button>
            </div>
            <div>
              <button onClick={onClickDisconnect}>Se déconnecter</button>
            </div>
          </ul>
        </div>
      </menu>
    </main>
  );
};

export default BurgerModal;
