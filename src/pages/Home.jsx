import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main className="container">
      <div className="hero-image">
        <img src="\src\assets\hero-image.jpg" alt="hero-image" />
      </div>
      <section>
        {data.offers.map((offer) => {
          return (
            <article key={offer._id}>
              <div>
                <img src={offer.owner.account.avatar} alt="user avatar" />
                <span>{offer.owner.account.username}</span>
              </div>
              <img src={offer.product_image.secure_url} alt="clothes preview" />
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
          );
        })}
      </section>
    </main>
  );
};

export default Home;
