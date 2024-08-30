import axios from "axios";
import { useState } from "react";
// Pour gérer les redirections
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  // const [loading, isLoading] = useState(true); // Dois-je faire ça?
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  // Un seul state pour gérer la plupart des messages d'erreurs
  const [errorMessage, setErrorMessage] = useState("");

  // On utilise useNavigate comme ceci
  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();
    // On le reset quand l'utilisateur refait un submit si jamais il y a eu une erreur auparavant
    setErrorMessage("");
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
      // const token = response.data.token;
      // Maintenant que j'ai le token, je crée le cookie
      // Cookies.set("Authentification token", token, { expires: 31 });
      // MAIS Je peux aussi fractionner mon code avec une fonction réutilisable sur chaque page où j'ai besoin d'un token
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      // C'est ici qu'on va gérer plusieurs cas d'erreurs!
      if (error.response.status === 409) {
        setErrorMessage("Cet email existe déjà");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
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
    <main>
      <form onSubmit={createAccount}>
        <h1>Rejoins le mouvement de la seconde main et vends sans frais!</h1>
        <h2>Inscris-toi avec ton email</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUsernameChange}
          // value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          // value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
          // value={password}
        />
        <input
          type="checkbox"
          // Pour des input de type checkbox, on utilise onChange au lieu de onClick (même si les deux fonctionnent très bien)
          onChange={() => {
            setNewsletter(!newsletter);
          }}
        />
        <button>S'inscrire</button>
      </form>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <Link to="/login">Tu as déjà un compte? Connecte-toi !</Link>
    </main>
  );
};

export default Signup;
