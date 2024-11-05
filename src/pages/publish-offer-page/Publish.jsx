import "./publish.scss";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);

  // const [cloudinaryPic, setCloudinaryPic] = useState(null);

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
      formData.append("picture", picture);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // Est-ce que j'ai bien un response.data.secure_url ?
    } catch (error) {
      console.log(error);
    }
  };

  return !token ? (
    <Navigate to={"/login"} />
  ) : (
    <main className="publish-component">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <menu>
            <input
              className="custom-file-input"
              // Ici on veut POSTER UNE PHOTO : c'est un input de type file
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </menu>
          <menu>
            <section>
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </section>
            <section>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                id="description"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </section>
          </menu>
          <menu>
            <section>
              <label htmlFor="brand">Marque</label>
              <input
                id="brand"
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </section>
            <section>
              <label htmlFor="size">Taille</label>
              <input
                id="size"
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />{" "}
            </section>
            <section>
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                type="text"
                placeholder="ex: Jaune"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </section>
            <section>
              <label htmlFor="condition">Etat</label>
              <input
                id="condition"
                type="text"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </section>
            <section>
              <label htmlFor="location">Lieu</label>
              <input
                id="location"
                type="text"
                placeholder="ex: Paris"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </section>
          </menu>
          <menu>
            <section>
              <label htmlFor="price">Prix</label>
              <input
                id="price"
                type="text"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </section>
          </menu>
          <button>Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
