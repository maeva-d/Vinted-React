import "./login.scss";
// import "../../Components/header-component/main-modals.scss";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import cross from "../../assets/cross.svg";
// import LogInModal from "../../Components/header-component/LogInModal";
import Modals from "../../Components/header-component/Modals";

// Je récupère la fonction handleToken en props
const Login = ({ handleToken }) => {
  // const [showRedirection, setShowRedirection] = useState(true);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://lereacteur-vinted-api.herokuapp.com/user/login",
  //       {
  //         email: email,
  //         password: password,
  //       }
  //     );
  //     console.log(response.data);
  //     // Si ça a fonctionné, la réponse me renvoie le token:
  //     handleToken(response.data.token);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  return (
    <main>
      <Modals handleToken={handleToken} />
    </main>
    // <main className="modals">
    // <h1>Rejoins le mouvement de la seconde main et vends sans frais!</h1>
    // <form onSubmit={handleSubmit} className="login-form">
    //   <input
    //     className="login-input"
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(event) => {
    //       setEmail(event.target.value);
    //     }}
    //   />
    //   <input
    //     className="login-input"
    //     type="password"
    //     placeholder="Mot de passe"
    //     value={password}
    //     onChange={(event) => {
    //       setPassword(event.target.value);
    //     }}
    //   />
    //   <button className="login-button">Se connecter</button>
    // </form>
    // <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link> */}
    // </main>
  );
};

export default Login;
