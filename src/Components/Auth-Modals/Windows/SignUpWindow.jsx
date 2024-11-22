import "./all-windows.scss";
import InfosInput from "../../Infos-Input/InfosInput";

const SignUpWindow = ({
  onSubmit,
  username,
  setUsername,
  usernameErr,
  email,
  setEmail,
  emailErr,
  password,
  setPassword,
  passwordErr,
  setNewsletter,
  setTermsAndConditions,
  termsAndConditionsErr,
  onClickSwitch,
}) => {
  return (
    <menu className="all-windows">
      <h1>Inscris-toi avec ton email</h1>
      <form onSubmit={onSubmit}>
        <div className="sign-up-form">
          <InfosInput
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={setUsername}
          />
          <small className={usernameErr && `error-message`}>
            {usernameErr
              ? usernameErr
              : `Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.`}
          </small>
        </div>
        <div className="sign-up-form">
          <InfosInput
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={setEmail}
          />
          <small className={usernameErr && `error-message`}>
            {emailErr
              ? emailErr
              : `Saisis l'adresse e-mail que tu souhaites utiliser sur Vinted`}
          </small>
        </div>
        <div className="sign-up-form">
          <InfosInput
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
          />
          <small className={usernameErr && `error-message`}>
            {passwordErr
              ? passwordErr
              : `Il doit contenir 7 lettres minimum, dont au moins un chiffre.`}
          </small>
        </div>
        <div className="checkboxes">
          <input
            // Pour des input de type checkbox, on utilise onChange au lieu de onClick (même si les deux fonctionnent très bien)
            type="checkbox"
            onChange={setNewsletter}
          />
          <span>
            Je souhaite recevoir par e-mail des offres personnalisées et les
            dernières mises à jour de Vinted.
          </span>
        </div>
        <div className="checkboxes">
          <input
            // Pour des input de type checkbox, on utilise onChange au lieu de onClick (même si les deux fonctionnent très bien)
            type="checkbox"
            onChange={setTermsAndConditions}
          />
          <span>
            En t'inscrivant, tu confirmes que tu acceptes les{" "}
            <a>Termes & Conditions de Vinted</a>, avoir lu la{" "}
            <a>Politique de confidentialité</a> et avoir au moins 18 ans.
          </span>
        </div>
        {termsAndConditionsErr && (
          <small className="error-message">
            Merci de confirmer pour poursuivre.
          </small>
        )}
        <button>Continuer</button>
        <p>
          Tu as déjà un compte?
          <button onClick={onClickSwitch}>Connecte-toi !</button>
        </p>
      </form>
    </menu>
  );
};

export default SignUpWindow;
