const LogInModal = ({ email, setEmail, password, setPassword, onSubmit }) => {
  return (
    <menu>
      <h1>Se connecter</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="E-mail ou nom d'utilisateur"
          value={email}
          //   onChange={(event) => {
          //     setEmail(event.target.value);
          //   }}
          onChange={setEmail}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          //   onChange={(event) => {
          //     setPassword(event.target.value);
          //   }}
          onChange={setPassword}
        />
      </form>
    </menu>
  );
};

export default LogInModal;
