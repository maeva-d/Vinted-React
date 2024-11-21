import "./publish.scss";
import axios from "axios";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import InfosInput from "../../Components/Infos-Input/InfosInput";

const Publish = () => {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [pictures, setPictures] = useState([]);

  const [photoErr, setPhotoErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  const { token } = useContext(AuthContext);
  const descCharLimit = 500;
  const offerCharLimit = 50;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", location);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      for (let pic of pictures) {
        formData.append("pictures", pic);
      }

      const response = await axios.post(
        "https://site--backend-vinted--rfd99txfpp4t.code.run/offers/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      const errorsArray = error.response.data.error;

      errorsArray.map((elem) => {
        if (elem.property === "product_name") {
          setTitleErr(elem.error);
        } else if (elem.property === "product_images") {
          setPhotoErr(elem.error);
        } else if (elem.property === "product_description") {
          setDescErr(elem.error);
        } else if (elem.property === "product_price") {
          setPriceErr(elem.error);
        }
      });
    }
  };

  const handleFilesSelected = (event) => {
    let copy = [...pictures];
    for (let i = 0; i < event.target.files.length; i++) {
      copy.push(event.target.files[i]);
      setPictures(copy);
    }
  };

  // Si l'utilisteur a crée une annonce avec succès (et donc si je reçois bien un objet data), je veux qu'il soit redirigé sur la page home

  return !token ? (
    <Navigate to={"/authentification"} />
  ) : data ? (
    <Navigate to={`/offers/${data._id}`} />
  ) : (
    <main className="publish-component">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <menu className="pictures-section">
            <p>Ajoute jusqu'à deux photos.</p>
            <div>
              <input
                className="custom-file-input"
                // Ici on veut POSTER UNE OU DES PHOTO(S) : c'est un input de type file
                type="file"
                multiple
                onChange={handleFilesSelected}
              />
            </div>
            {photoErr && <small className="error-message">{photoErr}</small>}
          </menu>
          <menu>
            <section>
              <label htmlFor="title">Titre</label>
              <div>
                <InfosInput
                  id="title"
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <div>
                  {titleErr && (
                    <small className="error-message">{titleErr}</small>
                  )}
                  <p>Limite de caractère : {offerCharLimit}</p>
                </div>
              </div>
            </section>
            <section>
              <label htmlFor="description">Décris ton article</label>
              <div>
                <InfosInput
                  id="description"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
                <div>
                  {descErr && (
                    <small className="error-message">{descErr}</small>
                  )}
                  <p>Limite de caractère : {descCharLimit}</p>
                </div>
              </div>
            </section>
          </menu>
          <menu>
            <section>
              <label htmlFor="brand">Marque</label>
              <div>
                <InfosInput
                  id="brand"
                  type="text"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
            </section>
            <section>
              <label htmlFor="size">Taille</label>
              <div>
                <InfosInput
                  id="size"
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
            </section>
            <section>
              <label htmlFor="color">Couleur</label>
              <div>
                <InfosInput
                  id="color"
                  type="text"
                  placeholder="ex: Jaune"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
            </section>
            <section>
              <label htmlFor="condition">Etat</label>
              <div>
                <InfosInput
                  id="condition"
                  type="text"
                  placeholder="Neuf avec étiquette"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
            </section>
            <section>
              <label htmlFor="location">Lieu</label>
              <div>
                <InfosInput
                  id="location"
                  type="text"
                  placeholder="ex: Paris"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              </div>
            </section>
          </menu>
          <menu>
            <section>
              <label htmlFor="price">Prix</label>
              <div>
                <InfosInput
                  id="price"
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div>
                  {priceErr && (
                    <small className="error-message">{priceErr}</small>
                  )}
                </div>
              </div>
            </section>
          </menu>
          <small>
            Un vendeur professionnel se faisant passer pour un consommateur ou
            un non-professionnel sur Vinted encourt les sanctions prévues à l'
            <a
              href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049532070"
              target="_blank"
            >
              Article L. 132-2
            </a>{" "}
            du Code de la Consommation.
          </small>
          <button>Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
