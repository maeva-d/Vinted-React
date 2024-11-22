import "./profile.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--rfd99txfpp4t.code.run/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
        console.log("response data =>", response.data);
      } catch (error) {
        setErrorMessage(error.response);
      }
    };
    fetchData();
  }, [id]);

  return !token ? (
    <Navigate to={"/authentification"} />
  ) : isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="profile-container">
      <form>
        <h1>Testtttttt</h1>
        <h2>Inscris-toi avec ton email</h2>

        <span>Je souhaite m'inscrire à la newsletter</span>
        <button className="signup-button">S'inscrire</button>
      </form>
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </main>
  );
};

export default Profile;
