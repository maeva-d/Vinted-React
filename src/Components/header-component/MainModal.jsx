import "./main-modal.scss";
import cross from "../../assets/cross.svg";
import { useState, useEffect } from "react";

const MainModal = ({ onClose }) => {
  const [showConnexion, setShowConnexion] = useState(false);
  // const [showInscription, setShowInscription] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <main className="sign-up" onClick={onClose}>
      <menu>
        <img alt="close-pop-up" src={cross} onClick={onClose} />
        <h1>Rejoins le mouvement de la seconde main et vends sans frais!</h1>
        <p>
          Inscris-toi avec
          <button
            onClick={() => {
              setShowConnexion(true);
            }}
          >
            Email
          </button>
        </p>
        <p>
          Tu as déja un compte?
          <button
            onClick={() => {
              setShowInscription(true);
            }}
          >
            Se connecter
          </button>
        </p>
      </menu>
    </main>
  );
};

export default MainModal;
