import "./home.scss";
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
        setData(response.data);
        // console.log(response.data);
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
      <img
        className="hero-image"
        src="\src\assets\hero-image.jpg"
        alt="hero-image"
      />
      <div className="hero-box-large">
        <div className="hero-box-small">
          <h2 className="home-h2">Prêts à faire du tri dans vos placards?</h2>
          <Link to={token ? "/publish" : "/login"}>
            <button className="home-sell-button">Vends maintenant</button>
          </Link>
        </div>
      </div>
      <section className="home-all-offers">
        {data.offers.map((offer) => {
          return (
            //backticks pour faire une interpolation, et des accolades autours des backticks car je code dans du HTML et HTML ne connait pas les backticks (mais JS oui)
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article key={offer._id}>
                <div className="home-user-info">
                  {offer.owner.account.avatar ? (
                    <img
                      className="home-avatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt="user-avatar"
                    />
                  ) : (
                    <img
                      className="home-avatar"
                      src="src/assets/react.svg"
                      alt="user-avatar-unknown"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                {offer.product_image.secure_url && (
                  <img
                    src={offer.product_image.secure_url}
                    className="  home-article-img"
                    alt="clothes-preview"
                  />
                )}
                <p className="home-price">{offer.product_price}</p>
                {offer.product_details.map((info, index) => {
                  return (
                    <div key={index}>
                      {info.TAILLE && <p>{info.TAILLE}</p>}
                      {info.MARQUE && <p>{info.MARQUE}</p>}
                    </div>
                  );
                })}
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
