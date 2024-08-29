import axios from "axios";
import { useState } from "react";
// Pour gérer les redirections
import { useNavigate } from "react-router-dom";
// Pour manipuler des cookies
import Cookies from "js-cookie";

const Signup = () => {
  // const [loading, isLoading] = useState(true); // Dois-je faire ça?
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // On utilise useNavigate comme ceci
  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // Si les informations entrées sont valides, le serveur retournera, entre autres, le token (dans response?)
      //Ce token devra être sauvegardé dans les cookies pour une utilisation ultérieure.
      console.log(response.data);
      const token = response.data.token;
      //Maintenant que j'ai le token, je crée le cookie
      Cookies.set("Authentification token", token, { expires: 31 });
      // Je veux retourner sur ma route home
      // if (token) {
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Je fractionne mes fonctions, car si je déclare directement une fonction anonyme dans le OnClick, event dasn event.target.value est deprecated
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={createAccount}>
      <h1>Rejoins le mouvement de la seconde main et vends sans frais!</h1>
      <h2>Inscris-toi avec ton email</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        onChange={handleUsernameChange}
        value={username}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={handlePasswordChange}
        value={password}
      />
      <input
        type="checkbox"
        onClick={() => {
          newsletter ? setNewsletter(false) : setNewsletter(true);
        }}
      />
      <button>S'inscrire</button>
    </form>
  );
};

export default Signup;
