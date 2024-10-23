import "./main-modal.scss";
import cross from "../../assets/cross.svg";
import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// Components :
// import LogInModal from "./LogInModal";

const MainModal = ({ onClose }) => {
  const [showMainModal, setShowMainModal] = useState(true);
  const [showLogIn, setShowLogIn] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  // const signUpModalRoot = document.getElementById("sign-up-modal-root");
  // const logInModalRoot = document.getElementById("log-in-modal-root");

  const switchToLoginForm = () => {
    setShowMainModal(false);
    // setShowSignUp(false);
    setShowLogIn(true);
  };

  const switchToSignUpForm = () => {
    setShowMainModal(false);
    setShowLogIn(false);
    // setShowSignUp(true);
  };

  return (
    <main className="sign-up">
      <div>
        <img alt="close-pop-up" src={cross} onClick={onClose} />
        {/* -- Main modal -- */}
        {showMainModal && (
          <menu>
            <h1>
              Rejoins le mouvement de la seconde main et vends sans frais!
            </h1>
            <p>
              Inscris-toi avec
              <button onClick={switchToSignUpForm}>Email</button>
            </p>
            <p>
              Tu as déja un compte?
              <button onClick={switchToLoginForm}>Se connecter</button>
            </p>
          </menu>
        )}
        {/* -- Login modal -- */}
        {showLogIn && (
          <menu>
            <h1>Se connecter</h1>
            <form onSubmit="foo">
              <input
                type="email"
                placeholder="E-mail ou nom d'utilisateur"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                // onChange={setEmail}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                // onChange={setPassword}
              />
              <button>Continuer</button>
            </form>
          </menu>
        )}
      </div>
    </main>
  );
};

export default MainModal;
