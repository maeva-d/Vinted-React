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
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");
  const [signUpTermsAndConditionsError, setSignUpTermsAndConditionsError] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const switchToLoginForm = () => {
    setEmail("");
    setPassword("");
    setLoginErrorMessage("");
    setShowRedirectionModal(false);
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const switchToSignUpForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setSignUpUsernameError("");
    setSignUpEmailError("");
    setSignUpPasswordError("");
    setSignUpTermsAndConditionsError(false);
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
        "https://site--backend-vinted--rfd99txfpp4t.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
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
    setSignUpEmailError("");
    setSignUpPasswordError("");
    setSignUpTermsAndConditionsError("");
    try {
      const response = await axios.post(
        "https://site--backend-vinted--rfd99txfpp4t.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
          termsAndConditions: termsAndConditions.toString(termsAndConditions),
        }
      );
      // Si les informations entrées sont valides, le serveur retournera, entre autres, le token (dans response?)
      console.log(response.data);
      // const token = response.data.token;
      // Maintenant que j'ai le token, je crée le cookie pour une utilisation ultérieure => Cookies.set("Authentification token", token, { expires: 31 });
      // MAIS Je peux aussi fractionner mon code avec une fonction réutilisable sur chaque page où j'ai besoin d'un token
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      let response = error.response.data.message;

      // Erreurs relatives au nom d'utilisateurs
      if (response.search("account.username:") !== -1) {
        let errUsername = response.slice(42);
        setSignUpUsernameError(errUsername);
      }

      // Erreurs relatives aux MDP
      let result = response.search(new RegExp("mot de passe", "i"));
      if (result !== -1) setSignUpPasswordError(response);

      // Erreurs relatives à l'email
      if (response.search("email:") !== -1) {
        let errEmail = response.slice(31);
        setSignUpEmailError(errEmail);
      }
      if (response === "Tu possèdes déjà un compte !")
        setSignUpEmailError(response);

      // Erreur relative aux conditions générales :
      if (response === "Merci de confirmer pour poursuivre.")
        setSignUpTermsAndConditionsError(response);
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
            emailErr={signUpEmailError}
            password={password}
            setPassword={(event) => {
              setPassword(event.target.value);
            }}
            passwordErr={signUpPasswordError}
            setNewsletter={() => {
              setNewsletter(!newsletter);
            }}
            setTermsAndConditions={() => {
              setTermsAndConditions(!termsAndConditions);
            }}
            termsAndConditionsErr={signUpTermsAndConditionsError}
            onClickSwitch={switchToLoginForm}
          />
        )}
      </div>
    </main>
  );
};

export default Modals;
