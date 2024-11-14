import "./publish.scss";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
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
      console.log(error.response.data.message);
    }
  };

  const handleFilesSelected = (event) => {
    let copy = [...pictures];
    for (let i = 0; i < event.target.files.length; i++) {
      copy.push(event.target.files[i]);
      setPictures(copy);
    }
  };

  return !token ? (
    <Navigate to={"/login"} />
  ) : data ? ( // Si data existe (donc si l'annonce a bien été crée) alors je redirige l'utilisateur :
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
            <small>Erreur placeholder</small>
          </menu>
          <menu>
            <section>
              <label htmlFor="title">Titre</label>
              <div>
                <input
                  id="title"
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <small>erreur placeholder</small>
              </div>
            </section>
            <section>
              <label htmlFor="description">Décris ton article</label>
              <div>
                <textarea
                  id="description"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
                <small>erreur placeholder</small>
              </div>
            </section>
          </menu>
          <menu>
            <section>
              <label htmlFor="brand">Marque</label>
              <div>
                <input
                  id="brand"
                  type="text"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
                <small>erreur placeholder</small>
              </div>
            </section>
            <section>
              <label htmlFor="size">Taille</label>
              <div>
                <input
                  id="size"
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
                <small>erreur placeholder</small>
              </div>
            </section>
            <section>
              <label htmlFor="color">Couleur</label>
              <div>
                <input
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
                <input
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
                <input
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
                <input
                  id="price"
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <small>erreur placeholder</small>
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
