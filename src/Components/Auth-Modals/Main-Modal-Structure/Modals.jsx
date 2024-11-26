import axios from "axios";
import cross from "../../../assets/cross.svg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
// Components :
import "./modals.scss";
import RedirectionWindow from "../Windows/RedirectionWindow";
import LogInWindow from "../Windows/LogInWindow";
import SignUpWindow from "../Windows/SignUpWindow";

const Modals = ({ darkBG, onClose }) => {
  const [showRedirectionWindow, setShowRedirectionWindow] = useState(true);
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [showSignUpWindow, setShowSignUpWindow] = useState(false);
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

  const { handleToken, fetchUserId, fetchUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const resetFormStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setTermsAndConditions(false);
  };

  const resetErrorsStates = () => {
    setLoginErrorMessage("");
    setSignUpUsernameError("");
    setSignUpEmailError("");
    setSignUpPasswordError("");
    setSignUpTermsAndConditionsError(false);
  };

  const switchToLoginForm = () => {
    resetFormStates();
    resetErrorsStates();
    setShowRedirectionWindow(false);
    setShowSignUpWindow(false);
    setShowLoginWindow(true);
  };

  const switchToSignUpForm = () => {
    resetFormStates();
    resetErrorsStates();
    setShowRedirectionWindow(false);
    setShowLoginWindow(false);
    setShowSignUpWindow(true);
  };

  // LOGIN REQUEST :
  const loginSubmit = async (event) => {
    event.preventDefault();
    resetErrorsStates();

    try {
      const response = await axios.post(
        "https://site--backend-vinted--rfd99txfpp4t.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      await handleToken(response.data.token);
      await fetchUserId(response.data._id);
      await fetchUsername(response.data.account.username);
      navigate("/");
      alert("Connexion réussie !");
    } catch (error) {
      setLoginErrorMessage(error.response.data.message);
    }
  };

  // SIGN UP REQUEST :
  const createAccount = async (event) => {
    event.preventDefault();
    resetErrorsStates();

    try {
      const response = await axios.post(
        "https://site--backend-vinted--rfd99txfpp4t.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
          termsAndConditions: termsAndConditions,
        }
      );
      await handleToken(response.data.token);
      await fetchUserId(response.data._id);
      await fetchUsername(response.data.account.username);
      alert("Ton compte a bien été crée !");
      navigate("/");
    } catch (error) {
      const { error: errorsArray, message } = error.response.data;

      if (message) setSignUpPasswordError(message);

      if (errorsArray) {
        errorsArray.map((elem) => {
          if (elem.property === "account.username") {
            setSignUpUsernameError(elem.error);
          } else if (elem.property === "email") {
            setSignUpEmailError(elem.error);
          } else if (elem.property === "termsAndConditions") {
            setSignUpTermsAndConditionsError(elem.error);
          }
        });
      }
    }
  };

  return (
    <main className={`all-modals ${darkBG ? `dark-background` : `not-fixed`}`}>
      <div>
        <img alt="close-pop-up" src={cross} onClick={onClose} />
        {/* -- Main modal -- */}
        {showRedirectionWindow && (
          <RedirectionWindow
            onClickSignUp={switchToSignUpForm}
            onClickLogIn={switchToLoginForm}
          />
        )}
        {/* -- Login window -- */}
        {showLoginWindow && (
          <LogInWindow
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
        {/* -- Signup window -- */}
        {showSignUpWindow && (
          <SignUpWindow
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
