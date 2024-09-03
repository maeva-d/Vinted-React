import "./offer.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Pour pouvoir utiliser des params
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Je déstructure la clé id de useParams()
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //Pas de guillemets avec les backticks!
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
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
    <main className="grey">
      <section className="offer-container">
        <img
          className="offer-img"
          src={data.product_image.secure_url}
          alt={data.product_name}
        />
        <aside className="offer-aside">
          <ul className="ul">
            <p>{data.product_price} €</p>
            {/* data.product.details[allIndexes] = { MARQUE : QQc,TAILE : QQc} etc x4 */}
            {data.product_details.map((detail, index) => {
              // console.log(data);
              const keys = Object.keys(detail);
              // console.log("keys ==>", keys);
              const key = keys[0];
              // console.log("key =>", key);

              return (
                <li className="offer-li" key={index}>
                  <span>{key} </span>
                  <span className="offer-text-align">{detail[key]}</span>
                </li>
              );
            })}
            <div className="offer-desc">
              <p>{data.product_name}</p>
              <p>{data.product_description}</p>
              {data.owner.account.avatar && (
                <img src={data.owner.account.avatar.secure_url} />
              )}
              <span>{data.owner.account.username}</span>
            </div>
            <Link
              to="/payment"
              state={{ title: data.product_name, amount: data.product_price }}
            >
              <button className="buy">Acheter</button>
            </Link>
            {/* {console.log(
              "les clé de data =>",
              data.product_name,
              data.product_price
            )} */}
            {/* // => The dress 50 OK !*/}
            {console.log("les clés =>", title, amount)}
          </ul>
        </aside>
      </section>
    </main>
  );
};

export default Offer;
