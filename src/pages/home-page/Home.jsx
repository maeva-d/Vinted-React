import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
// images :
import heroimage from "../../assets/hero-image.jpg";
import tear from "../../assets/tear.svg";
import placeholder from "../../assets/react.svg";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--rfd99txfpp4t.code.run/offers/`,
          {
            params: { page: page },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main>
      <div className="hero-section">
        <img alt="hero-image" src={heroimage} />
        <img alt="torn-effect" src={tear} />
        <div>
          <div className="container">
            <div>
              <h2>Prêts à faire du tri dans vos placards ?</h2>
              <Link to={"/publish"}>
                <button>Vends maintenant</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="home-all-offers container">
        <h3>Fil d'actu</h3>
        {data.offers.map((offer) => {
          return (
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
                  src={offer.product_images[0].secure_url}
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
        <nav>
          <div className={page === 1 && `disabled`}>
            <GoChevronLeft onClick={page > 1 && setPage(page - 1)} />
          </div>
          <button> 1 </button>
          <button> 2 </button>
          <button> 3 </button>
          <div>
            <GoChevronRight />
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Home;
