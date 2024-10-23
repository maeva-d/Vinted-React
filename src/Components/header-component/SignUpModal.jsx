const SignUpModal = ({
  onSubmit,
  username,
  setUsername,
  usernameErr,
  email,
  setEmail,
  //   emailErr,
  password,
  setPassword,
  // passwordErr
}) => {
  return (
    <menu>
      <h1>Inscris-toi avec ton email</h1>
      <form onSubmit={onSubmit}>
        <div className="sign-up-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={setUsername}
          />
          <small>
            {usernameErr
              ? usernameErr
              : `Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.`}
          </small>
        </div>
        <div className="sign-up-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={setEmail}
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
            onChange={setPassword}
          />
          <small>
            Il doit contenir 7 lettres minimum, dont au moins un chiffre.
          </small>
        </div>
        <button>Continuer</button>
      </form>
    </menu>
  );
};

export default SignUpModal;
