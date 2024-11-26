import "./home.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FindOffersContext } from "../../contexts/findOffersContext";
// images et icônes :
import heroimage from "../../assets/hero-image.jpg";
import tear from "../../assets/tear.svg";
import placeholder from "../../assets/react.svg";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    // searchParams,
    // setSearchParams,
    page,
    setPage,
  } = useContext(FindOffersContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--rfd99txfpp4t.code.run/offers/`,
          { params: searchParams }
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchParams]);

  const goUp = async () => {
    await setPage(page + 1);
    setSearchParams({ page: page + 1 });
  };

  const goDown = async () => {
    await setPage(page - 1);
    setSearchParams({ page: page - 1 });
  };

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main>
      <div className="hero-section">
        <img alt="hero-image" src={heroimage} />
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
        <img alt="torn-effect" src={tear} />
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
          <div className={page === 1 ? `disabled` : undefined}>
            <GoChevronLeft onClick={page > 1 ? goDown : null} />
          </div>
          {page > 1 && <button> {page - 1} </button>}
          <button className="current-page"> {page} </button>
          {data.count - data.offers.length <= 1 && (
            // ||
            //   (data.offers.length > data.limit
            <button> {page + 1} </button>
          )}
          <div
            className={data.offers.length < data.limit ? `disabled` : undefined}
          >
            <GoChevronRight
              onClick={data.count > data.offers.length ? goUp : null}
            />
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Home;
