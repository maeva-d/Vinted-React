import "./main-modal.scss";
import cross from "../../assets/cross.svg";
import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// Components :
import RedirectionModal from "./RedirectionModal";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

const Modals = ({ onClose }) => {
  const [showRedirectionModal, setShowRedirectionModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
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
    setShowRedirectionModal(false);
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const switchToSignUpForm = () => {
    setShowRedirectionModal(false);
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  return (
    <main className="modals">
      <div>
        <img alt="close-pop-up" src={cross} onClick={onClose} />
        {/* -- Main modal -- */}
        {showRedirectionModal && (
          <RedirectionModal
            onClickSignUp={switchToSignUpForm}
            onClickLogIn={switchToLoginForm}
          />
        )}
        {/* -- Login modal -- */}
        {showLoginModal && (
          <LogInModal
            onSubmit="foo"
            errorMessage={loginErrorMessage}
            email={email}
            setEmail={(event) => {
              setEmail(event.target.value);
            }}
            password={password}
            setPassword={(event) => {
              setPassword(event.target.value);
            }}
          />
        )}
        {/* -- Signup modal -- */}
        {showSignUpModal && (
          <SignUpModal
            onSubmit="foo"
            username={username}
            setUsername={(event) => {
              setUsername(event.target.value);
            }}
            usernameErr={signUpUsernameError}
            email={email}
            setEmail={(event) => {
              setEmail(event.target.value);
            }}
            password={password}
            setPassword={(event) => {
              setPassword(event.target.value);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Modals;
