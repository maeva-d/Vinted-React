import axios from "axios";
import "./modals.scss";
import cross from "../../assets/cross.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Components :
import RedirectionModal from "./RedirectionModal";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

const Modals = ({ darkBG, onClose, handleToken }) => {
  const [showRedirectionModal, setShowRedirectionModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signUpUsernameError, setSignUpUsernameError] = useState("");
  // const [signUpEmailError, setSignUpEmailError] = useState("");
  // const [signUpPasswordError, setSignUpPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

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

  // LOGIN REQUEST :
  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoginErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      // Si ça a fonctionné, la réponse me renvoie le token:
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      setLoginErrorMessage(error.response.data.message);
    }
  };

  // SIGN UP REQUEST :
  const createAccount = async (event) => {
    event.preventDefault();
    setSignUpUsernameError("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
          // termsAndConditions: termsAndConditions,
        }
      );
      // Si les informations entrées sont valides, le serveur retournera, entre autres, le token (dans response?)
      //Ce token devra être sauvegardé dans les cookies pour une utilisation ultérieure.
      console.log(response.data);
      // const token = response.data.token;
      // Maintenant que j'ai le token, je crée le cookie
      // Cookies.set("Authentification token", token, { expires: 31 });
      // MAIS Je peux aussi fractionner mon code avec une fonction réutilisable sur chaque page où j'ai besoin d'un token
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      // C'est ici qu'on va gérer plusieurs cas d'erreurs!
      // if (error.response.status === 409) {
      //   setErrorMessage("Cet email existe déjà");
      // } else if (error.response.data.message === "Missing parameters") {
      //   setErrorMessage("Veuillez remplir tous les champs");
      // } else {
      //   setErrorMessage("Une erreur est survenue, merci de réessayer");
      // }
    }
  };

  return (
    <main className={`all-modals ${darkBG && `dark-background`}`}>
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
            onSubmit={loginSubmit}
            errorMessage={loginErrorMessage}
            email={email}
            setEmail={(event) => {
              setEmail(event.target.value);
            }}
            password={password}
            setPassword={(event) => {
              setPassword(event.target.value);
            }}
            onClickSwitch={switchToSignUpForm}
          />
        )}
        {/* -- Signup modal -- */}
        {showSignUpModal && (
          <SignUpModal
            onSubmit={createAccount}
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
            setNewsletter={() => {
              setNewsletter(!newsletter);
            }}
            setTermsAndConditions={() => {
              setTermsAndConditions(!termsAndConditions);
            }}
            onClickSwitch={switchToLoginForm}
          />
        )}
      </div>
    </main>
  );
};

export default Modals;
