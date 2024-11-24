import "./offer.scss";
import axios from "axios";
import placeholder from "../../assets/react.svg";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { connectedUser } = useContext(AuthContext);
  // Je déstructure la clé id de useParams()
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--rfd99txfpp4t.code.run/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // Je rajouter id dans le tableau pour éviter des messages d'erreur (ça ne change rien à notre code)
  }, [id]);

  return isLoading ? (
    <p>Chargement de la page...</p>
  ) : (
    <main className="offer-page">
      <section className="offer-container">
        <div className={data.product_images.length === 1 && `one-pic`}>
          {data.product_images.map((picture) => {
            return (
              <img
                key={picture.secure_url}
                src={picture.secure_url}
                alt="offer-picture"
              />
            );
          })}
        </div>
        <aside>
          <div className="product-info">
            <h1>{data.product_price} €</h1>
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              // console.log("keys (Object.keys(details)) ==>", keys);
              const key = keys[0];
              // console.log("key (keys[0]) =>", key);

              return (
                <ul key={index}>
                  {key && <li>{key}</li>}
                  {detail[key] && <li>{detail[key]}</li>}
                </ul>
              );
            })}
          </div>
          <menu>
            <h2>{data.product_name}</h2>
            <h3>{data.product_description}</h3>
          </menu>
          <Link
            to={connectedUser !== data.owner.account.username && `/payment`}
            state={{
              title: data.product_name,
              amount: data.product_price,
            }}
            className={`fixed-button-sm-screen
              ${
                connectedUser === data.owner.account.username && `not-allowed`
              }`}
          >
            <button>Acheter</button>
          </Link>

          <div className="user-info">
            <img
              src={data.owner.account.avatar?.secure_url ?? placeholder}
              alt="user-avatar"
            />
            <span>{data.owner.account.username}</span>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Offer;
