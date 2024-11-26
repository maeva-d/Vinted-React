import "./profile.scss";
import axios from "axios";
import placeholder from "../../assets/react.svg";
import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  const { id } = useParams();
  // const navigate = useNavigate();
  const { token, handleToken, fetchUserId, fetchUsername } =
    useContext(AuthContext);

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
        console.log(error.response.data.error);
      }
    };
    fetchData();
  }, [id]);

  const deleteAccount = async () => {
    const response = await axios.delete(
      `https://site--backend-vinted--rfd99txfpp4t.code.run/user/account`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.message) {
      window.open("/", response.data.message);
      handleToken(null);
      fetchUserId(null);
      fetchUsername(null);
    } else {
      window.open(`user/${id}`, "Une erreur est survenue");
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Cette action est définitive. Veux-tu vraiment supprimer ton compte?"
      )
    )
      deleteAccount();
  };

  return !token ? (
    <Navigate to={"/authentification"} />
  ) : isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="profile-container">
      <section className="profile-component">
        <h1>Mon profil</h1>
        <menu>
          <aside>
            <img src={data.account.avatar ?? placeholder} />
          </aside>
          <div>
            <div>
              <aside>
                <h2>{data.account.username}</h2>
                <h3>Pas encore d'évaluation</h3>
              </aside>
              <button onClick={handleDeleteAccount}>
                Supprimer mon compte
              </button>
            </div>
          </div>
        </menu>
      </section>
    </main>
  );
};

export default Profile;
