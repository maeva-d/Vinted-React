import "../info-input.scss";

const LogInModal = ({
  onSubmit,
  errorMessage,
  email,
  setEmail,
  password,
  setPassword,
  onClickSwitch,
}) => {
  return (
    <menu>
      <h1>Se connecter</h1>
      <form onSubmit={onSubmit}>
        {errorMessage !== "" && <h2>Identifiant ou mot de passe incorrect</h2>}
        <div className="log-in-form">
          <input
            className="info-input"
            type="email"
            placeholder="E-mail ou nom d'utilisateur"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="log-in-form">
          <input
            className="info-input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
          />
        </div>
        <button>Continuer</button>
        <p>
          Pas encore de compte ?
          <button onClick={onClickSwitch}>Inscris-toi !</button>
        </p>
      </form>
    </menu>
  );
};

export default LogInModal;
