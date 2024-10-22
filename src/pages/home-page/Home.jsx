import "./home.scss";
import heroimage from "../../assets/hero-image.jpg";
import tear from "../../assets/tear.svg";
import placeholder from "../../assets/react.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ token, search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
          //, {
          //   params: { title: search },
          // }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main>
      {/* <div> */}
      <div className="hero-section">
        <img alt="hero-image" src={heroimage} />
        <img alt="torn-effect" src={tear} />
        <div>
          <div>
            <h2>Prêts à faire du tri dans vos placards?</h2>
            <Link to={token ? "/publish" : "/login"}>
              <button>Vends maintenant</button>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
      <section className="home-all-offers">
        {data.offers.map((offer) => {
          return (
            //backticks pour faire une interpolation, et des accolades autours des backticks car je code dans du HTML et HTML ne connait pas les backticks (mais JS oui)
            <article key={offer._id}>
              <div>
                <img
                  alt="user-avatar"
                  src={offer.owner.account.avatar?.secure_url ?? placeholder}
                />
                <span>{offer.owner.account.username}</span>
              </div>
              <Link to={`/offers/${offer._id}`} key={offer._id}>
                <img
                  alt="clothes-preview"
                  src={offer.product_image.secure_url}
                />
              </Link>
              <p>{offer.product_price} €</p>
              {offer.product_details.map((info, index) => {
                return (
                  <div key={index}>
                    {info.MARQUE && <p>{info.MARQUE}</p>}
                    {info.TAILLE && <p>{info.TAILLE}</p>}
                  </div>
                );
              })}
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
