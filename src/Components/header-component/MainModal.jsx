import "./main-modal.scss";
import cross from "../../assets/cross.svg";
import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// Components :
// import LogInModal from "./LogInModal";

const MainModal = ({ onClose }) => {
  const [showMainModal, setShowMainModal] = useState(true);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signUpUsernameError, setSignUpUsernameError] = useState("");
  // const [signUpEmailError, setSignUpEmailError] = useState("");
  // const [signUpPasswordError, setSignUpPasswordError] = useState("");

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
    setShowSignUp(false);
    setShowLogIn(true);
  };

  const switchToSignUpForm = () => {
    setShowMainModal(false);
    setShowLogIn(false);
    setShowSignUp(true);
  };

  return (
    <main className="modals">
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
              {loginErrorMessage !== "" && (
                <h2>Identifiant ou mot de passe incorrect</h2>
              )}
              <div className="log-in-form">
                <input
                  type="email"
                  placeholder="E-mail ou nom d'utilisateur"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  // onChange={setEmail}
                />
              </div>
              <div className="log-in-form">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  // onChange={setPassword}
                />
              </div>
              <button>Continuer</button>
            </form>
          </menu>
        )}
        {showSignUp && (
          <menu>
            <h1>Inscris-toi avec ton email</h1>
            <form onSubmit="foo" className="sign-up-form">
              <div className="sign-up-form">
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  // onChange={setEmail}
                />
                <small>
                  {signUpUsernameError
                    ? signUpUsernameError
                    : `Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.`}
                </small>
              </div>
              <div className="sign-up-form">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  // onChange={setEmail}
                />
                <small>
                  Saisis l'adresse e-mail que tu souhaites utiliser sur Vinted
                </small>
              </div>
              <div className="sign-up-form">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  // onChange={setPassword}
                />
                <small>
                  Il doit contenir 7 lettres minimum, dont au moins un chiffre.
                </small>
              </div>
              <button>Continuer</button>
            </form>
          </menu>
        )}
      </div>
    </main>
  );
};

export default MainModal;
