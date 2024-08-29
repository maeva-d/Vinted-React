import axios from "axios";
import { useState, useEffect } from "react";

// Penser aussi à importer Link
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main>
      <div>
        <img src="\src\assets\hero-image.jpg" alt="hero-image" />
        <div>
          <h2>Prêts à faire du tri dans vos placards?</h2>
          <button>Vends maintenant</button>
        </div>
      </div>
      <section className="container">
        {data.offers.map((offer) => {
          return (
            //backticks pour faire une interpolation, et des accolades autours des backticks car je code dans du HTML et HTML ne connait pas les backticks (mais JS oui)
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article key={offer._id}>
                <div>
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="user avatar"
                  />
                  <span>{offer.owner.account.username}</span>
                </div>
                <img
                  src={offer.product_image.secure_url}
                  alt="clothes preview"
                />
                <p>{offer.product_price}</p>
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
