import "./home.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FindOffersContext } from "../../contexts/findOffersContext";
import InfosInput from "../../Components/Infos-Input/InfosInput";
// images et icônes :
import heroimage from "../../assets/hero-image.jpg";
import tear from "../../assets/tear.svg";
import placeholder from "../../assets/react.svg";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [showSortPriceList, setShowSortPriceList] = useState(false);
  const [showLimitList, setShowLimitList] = useState(false);
  const [showPriceRangeList, setShowPriceRangeList] = useState(false);

  const [limit, setLimit] = useState();
  const [sort, setSort] = useState();
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { page, setPage, title } = useContext(FindOffersContext);

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

  /////
  // Quand une liste déroulante s'ouvre, les autres doivent se fermer automatiquement
  const openLimitList = () => {
    setShowSortPriceList(false);
    setShowPriceRangeList(false);
    setShowLimitList(!showLimitList);
  };

  const openSortList = () => {
    setShowLimitList(false);
    setShowPriceRangeList(false);
    setShowSortPriceList(!showSortPriceList);
  };

  const openPriceRangeList = () => {
    setShowSortPriceList(false);
    setShowLimitList(false);
    setShowPriceRangeList(!showPriceRangeList);
  };
  /////

  const handleLimit = (limit) => {
    setLimit(limit);
    setSearchParams({ limit: limit, page: 1 });
  };

  const handleSort = (toSort) => {
    setSort(toSort);
    setSearchParams({ sort: toSort, page: 1 });
    console.log(sort);
  };

  const handleKeyPress = (event) => {
    let params = {};
    if (event.key === "Enter") {
      if (priceMin !== "") params.priceMin = priceMin;
      if (priceMax !== "") params.priceMax = priceMax;
    }
    if (params) {
      params.page = 1;
      setSearchParams(params);
    }
  };

  const resetFilters = () => {
    setSearchParams((params) => {
      const queriesToDelete = [
        "title",
        "page",
        "limit",
        "sort",
        "priceMin",
        "priceMax",
      ];
      queriesToDelete.forEach((query) => params.delete(query));

      return params;
    });
  };

  const handlePage = (page) => {
    setPage(page);
    setSearchParams({ page: page });
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
        <menu>
          <div>
            <button onClick={openLimitList}>
              Résultats par page
              {showLimitList ? (
                <>
                  <GoChevronDown className="chevron" />
                  <div className="list for-limit">
                    <ul>
                      <button onClick={() => handleLimit(20)}>20</button>
                      <button onClick={() => handleLimit(50)}>50</button>
                    </ul>
                  </div>
                </>
              ) : (
                <GoChevronUp className="chevron" />
              )}
            </button>

            <button onClick={openSortList}>
              Trier par{" "}
              {showSortPriceList ? (
                <>
                  <GoChevronDown className="chevron" />
                  <div className="list for-sort">
                    <ul>
                      <button onClick={() => handleSort("price-asc")}>
                        Prix croissant
                      </button>
                      <button onClick={() => handleSort("price-desc")}>
                        Prix décroissant
                      </button>
                    </ul>
                  </div>
                </>
              ) : (
                <GoChevronUp className="chevron" />
              )}
            </button>

            <button>
              Prix
              {showPriceRangeList ? (
                <>
                  <GoChevronDown
                    className="chevron"
                    onClick={openPriceRangeList}
                  />
                  <div className="list for-range">
                    <ul>
                      <label htmlFor="from">De</label>
                      <InfosInput
                        id="from"
                        type="text"
                        placeholder="0,50 €"
                        value={priceMin}
                        onChange={(event) => setPriceMin(event.target.value)}
                        onKeyDown={(event) => handleKeyPress(event)}
                      />
                    </ul>
                    <ul>
                      <label htmlFor="to">À</label>
                      <InfosInput
                        id="to"
                        type="text"
                        placeholder="10 000 €"
                        value={priceMax}
                        onChange={(event) => setPriceMax(event.target.value)}
                        onKeyDown={(event) => handleKeyPress(event)}
                      />
                    </ul>
                  </div>
                </>
              ) : (
                <GoChevronUp className="chevron" onClick={openPriceRangeList} />
              )}
            </button>
            <button onClick={resetFilters}>Effacer les filtres</button>
          </div>
          <p>
            {title !== "" ? data.offers.length : data.count} résultat
            {data.offers.length > 1 && `s`}.
          </p>
        </menu>
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
            <GoChevronLeft
              className="chevron"
              onClick={page > 1 ? () => handlePage(page - 1) : null}
            />
          </div>
          {page > 1 && <button> {page - 1} </button>}
          <button className="current-page"> {page} </button>
          {(data.count > data.limit) & (data.offers.length === data.limit) ? (
            <button> {page + 1} </button>
          ) : null}
          <div
            className={data.offers.length < data.limit ? `disabled` : undefined}
          >
            <GoChevronRight
              className="chevron"
              onClick={
                data.count > data.offers.length
                  ? () => handlePage(page + 1)
                  : null
              }
            />
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Home;
