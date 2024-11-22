import "./all-windows.scss";

const RedirectionWindow = ({ onClickSignUp, onClickLogIn }) => {
  return (
    <menu className="all-windows">
      <h1>Bienvenue !</h1>
      <p>
        Inscris-toi avec
        <button onClick={onClickSignUp}>Email</button>
      </p>
      <p>
        Tu as déja un compte?
        <button onClick={onClickLogIn}>Se connecter</button>
      </p>
    </menu>
  );
};

export default RedirectionWindow;
